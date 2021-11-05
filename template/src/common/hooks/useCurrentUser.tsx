import auth from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';
import { useOnAuthStateChanged } from './useOnAuthStateChanged';

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(auth().currentUser);
  const { state, user } = useOnAuthStateChanged();

  useEffect(() => {
    if (state === 'ready' && user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  }, [state, user]);

  return currentUser;
};
