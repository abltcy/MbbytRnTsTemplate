import { initStripe } from '@stripe/stripe-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View, StyleSheet, Text } from 'react-native';
import { colors } from '../colors';
import { fetchPublishableKey } from '../helpers';

interface Props {
  style?: any;
  paymentMethod?: string;
  onInit?(): void;
}

const PaymentScreen: React.FC<Props> = (
  {
  style,
  paymentMethod,
  children,
  onInit,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initialize() {
      const publishableKey = 'pk_test_51JQT13GJjxQF6OnSIE4KhFtsmwOp3PUQkDfG1kt1R7s1DVfjxKpJAezjaoTKxgLuzzvvHaB2Depr6vEVaDxwJiy800orTDtVqG';//await fetchPublishableKey(paymentMethod);
      if (publishableKey) {
        await initStripe({
          publishableKey,
          merchantIdentifier: 'merchant.com.apposing.huktup.staging',
          urlScheme: 'stripe-example',
          setUrlSchemeOnAndroid: true,
        });
        setLoading(false);
        onInit?.();
      }
    }
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <ActivityIndicator size="large" style={StyleSheet.absoluteFill} />
  ) : (
    <View
      {...style}
      accessibilityLabel="payment-screen"
    >
      {children}
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <Text style={{ opacity: 0 }}>appium fix</Text>
    </View>
  );
};


export default PaymentScreen;
