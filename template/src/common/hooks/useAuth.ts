import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import {useAxios} from 'src/common/axios';
import {useCurrentUser} from './useCurrentUser';
import {getApiEndpoints} from '../../api/constants/endpoints';

export const useAuth = () => {
  const currentUser = useCurrentUser();
  const {axios} = useAxios();

  const requestNotificationPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Notification Authorization status:', authStatus);
    }
  };

  const setAuthHeader = ({JWT}: {JWT: string}) => {
    axios.defaults.headers.common.Authorization = `Bearer ${JWT}`;
  };

  // @ts-ignore
  const getAndSetJWT = async ({user}) => {
    const JWT = await user.getIdToken(true);
    setAuthHeader({JWT});
  };

  const signInAnonymously = async () => {
    try {
      const userCredentials = await auth().signInAnonymously();

      const JWT = await userCredentials.user.getIdToken();
      console.log('JWT:', JWT);
      setAuthHeader({JWT});
    } catch (error) {
      Alert.alert('Something went wrong', 'Please try again later');
      console.log(error);
    }
  };

  const setAuth = async () => {
    return currentUser === null
      ? await signInAnonymously()
      : await getAndSetJWT({user: currentUser});
  };

  return {setAuth, requestNotificationPermission};
};
