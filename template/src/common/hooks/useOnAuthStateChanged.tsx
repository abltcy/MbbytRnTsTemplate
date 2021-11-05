import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';

export const useOnAuthStateChanged = (): {
  state: 'initializing' | 'ready';
  user: FirebaseAuthTypes.User | null;
} => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(
    () =>
      auth().onAuthStateChanged(authUser => {
        setUser(authUser);
        if (initializing) {
          setInitializing(false);
        }
      }),
    /**
     * @remark intentionally run ONCE
     * */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  if (initializing) {
    return {state: 'initializing', user: null};
  }

  return {state: 'ready', user};
};
