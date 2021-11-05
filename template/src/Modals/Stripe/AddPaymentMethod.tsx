import {
  ApplePay,
  ApplePayButton,
  CardField,
  PaymentMethodCreateParams,
  SetupIntent,
  useApplePay,
  useConfirmSetupIntent,
} from '@stripe/stripe-react-native';
import {useAxios} from 'src/common/axios';
import {useCurrentUser} from 'src/common/hooks/';
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {getApiEndpoints} from 'src/api/constants/endpoints';
import PaymentScreen from './components/PaymentScreen';
import {
  StyledButtonText,
  StyledLabel,
  StyledMainView,
  StyledNameInput,
  StyledNameInputPrefixWrapper,
  StyledPayCardText,
  StyledSaveButton,
  StyledSecondView,
  StyledTopView,
} from './styles';
import {
  DefaultNavigationProp,
  DefaultRouteProp,
} from '../../common/types/NavigationAndRouteParams.types';
export type AddPaymentMethodType = {
  navigation: DefaultNavigationProp;
  route: DefaultRouteProp;
};

export const AddPaymentMethod = ({navigation}: AddPaymentMethodType) => {
  const [name, setName] = useState('');

  const [postcode, setPostcode] = useState('');

  const [setupIntent, setSetupIntent] = useState<SetupIntent | null>(null);

  const user = useCurrentUser();

  const [cart, setCart] = useState<ApplePay.CartSummaryItem[]>([
    {label: 'Subtotal', amount: '12.75', type: 'final'},
    {label: 'Shipping', amount: '0.00', type: 'pending'},
    {label: 'Total', amount: '12.75', type: 'pending'}, // Last item in array needs to reflect the total.
  ]);

  const shippingMethods: ApplePay.ShippingMethod[] = [
    {
      identifier: 'free',
      detail: 'Arrives by July 2',
      label: 'Free Shipping',
      amount: '0.0',
    },
    {
      identifier: 'standard',
      detail: 'Arrives by June 29',
      label: 'Standard Shipping',
      amount: '3.21',
    },
    {
      identifier: 'express',
      detail: 'Ships within 24 hours',
      label: 'Express Shipping',
      amount: '24.63',
    },
  ];

  const {axios} = useAxios();

  // It is also possible to use `useStripe` and then `stripe.confirmSetupIntent`
  // The only difference is that this approach will not have `loading` status support
  const {confirmSetupIntent} = useConfirmSetupIntent();

  const createSetupIntentOnBackend = async () => {
    try {
      const {data} = await axios.post(getApiEndpoints().ADD_SETUP_INTENT());
      return data.setupIntent;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const getPaymentTypes = async () => {
    const {data} = await axios.get(getApiEndpoints().GET_PAYMENT_METHODS());
    console.log(data);
  };

  const addPaymentMethod = async ({setupIntentId}: {setupIntentId: string}) => {
    const {data} = await axios.post(getApiEndpoints().ADD_PAYMENT_METHOD(), {
      setup_intent_id: setupIntentId,
    });
    console.log(data);
    navigation.goBack();
  };

  const {presentApplePay, confirmApplePayPayment, isApplePaySupported} =
    useApplePay({
      onShippingMethodSelected: (shippingMethod, handler) => {
        console.log('shippingMethod', shippingMethod);
        // Update cart summary based on selected shipping method.
        const updatedCart = [
          cart[0],
          {label: shippingMethod.label, amount: shippingMethod.amount},
          {
            label: 'Total',
            amount: (
              parseFloat(cart[0].amount) + parseFloat(shippingMethod.amount)
            ).toFixed(2),
          },
        ];
        setCart(updatedCart);
        handler(updatedCart);
      },
      onShippingContactSelected: (shippingContact, handler) => {
        console.log('shippingContact', shippingContact);
        // Make modifications to cart here e.g. adding tax.
        handler(cart);
      },
    });

  const pay = async () => {
    const {error, paymentMethod} = await presentApplePay({
      cartItems: cart,
      country: 'US',
      currency: 'USD',
      shippingMethods,
      requiredShippingAddressFields: [
        'emailAddress',
        'phoneNumber',
        'postalAddress',
        'name',
      ],
      requiredBillingContactFields: ['phoneNumber', 'name'],
      jcbEnabled: true,
    });

    if (error) {
      Alert.alert(error.code, error.message);
    } else {
      console.log(JSON.stringify(paymentMethod, null, 2));
      const clientSecret = ''; //await fetchPaymentIntentClientSecret();

      const {error: confirmApplePayError} = await confirmApplePayPayment(
        clientSecret,
      );

      if (confirmApplePayError) {
        Alert.alert(confirmApplePayError.code, confirmApplePayError.message);
      } else {
        Alert.alert('Success', 'The payment was confirmed successfully!');
      }
    }
  };

  useEffect(() => {
    getPaymentTypes();
  }, []);

  const handlePayPress = async () => {
    // 1. Create setup intent on backend
    const clientSecret = await createSetupIntentOnBackend();

    // 2. Gather customer billing information (ex. email)
    const billingDetails: PaymentMethodCreateParams.BillingDetails = {
      //email: email,
      name: name,
      phone: user?.phoneNumber || '',
      addressCity: '',
      addressCountry: 'GB',
      addressLine1: '',
      addressLine2: '',
      addressPostalCode: postcode,
    };

    // 3. Confirm setup intent
    const {error, setupIntent: setupIntentResult} = await confirmSetupIntent(
      clientSecret,
      {
        type: 'Card',
        billingDetails,
      },
    );

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
      console.log('Setup intent confirmation error', error.message);
    } else if (setupIntentResult) {
      console.log(setupIntentResult);
      Alert.alert(
        'Success',
        `Setup intent created. Intent status: ${setupIntentResult.status}`,
      );

      setSetupIntent(setupIntentResult);
      console.log(setupIntent);
      await addPaymentMethod({setupIntentId: setupIntentResult.id});
    }
  };

  return (
    <PaymentScreen style={styles.container}>
      {isApplePaySupported && (
        <StyledTopView>
          <ApplePayButton
            onPress={pay}
            type="plain"
            buttonStyle="black"
            borderRadius={4}
            style={styles.payButton}
          />
          <StyledPayCardText>Or pay with card</StyledPayCardText>
        </StyledTopView>
      )}
      <StyledMainView>
        <StyledLabel>Card details</StyledLabel>
        <CardField
          postalCodeEnabled={false}
          onCardChange={cardDetails => {
            console.log('card details', cardDetails);
          }}
          style={styles.cardField}
        />
        <StyledLabel>Name on card</StyledLabel>
        <StyledNameInputPrefixWrapper>
          <StyledNameInput
            value={name}
            onChangeText={text => {
              setName(text);
            }}
            keyboardType="default"
            placeholder={'Name on card'}
            autoFocus={false}
          />
        </StyledNameInputPrefixWrapper>
        <StyledLabel>Postcode</StyledLabel>
        <StyledNameInputPrefixWrapper>
          <StyledNameInput
            value={postcode}
            onChangeText={text => {
              setPostcode(text);
            }}
            maxLength={10}
            keyboardType="default"
            placeholder={'Postcode'}
            autoFocus={false}
          />
        </StyledNameInputPrefixWrapper>
      </StyledMainView>
      <StyledSecondView>
        <StyledSaveButton onPress={handlePayPress}>
          <StyledButtonText>Save payment details</StyledButtonText>
        </StyledSaveButton>
      </StyledSecondView>
    </PaymentScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  cardField: {
    width: '100%',
    height: 50,
    marginVertical: 10,
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: 5,
  },
  payButton: {
    width: '100%',
    height: 50,
    marginTop: 60,
    alignSelf: 'center',
  },
});
