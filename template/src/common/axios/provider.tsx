import auth from '@react-native-firebase/auth';
import {getApiEndpoints} from 'src/api/constants/endpoints';
import {mockEndpoints} from 'src/api/helper/api.helper';
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React, {useEffect, useMemo} from 'react';
import {AsyncStorage} from 'react-native';
import Config from 'react-native-config';
import {AxiosContext} from './context';

export const AxiosProvider = ({
  children,
}: // eslint-disable-next-line no-undef
React.PropsWithChildren<unknown>): JSX.Element => {
  const axios = useMemo(() => {
    const axios = Axios.create({
      baseURL: 'http://www.demoapi.com',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    axios.interceptors.request.use(
      async config => {
        const token = await AsyncStorage.getItem('Token');
        if (token) {
          // @ts-ignore
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        Promise.reject(error);
      },
    );

    axios.interceptors.response.use(
      async res => {
        const token = await AsyncStorage.getItem('Token');
        if (token) {
          res.headers.Authorization = `Bearer ${token}`;
        }
        return res;
      },
      async error => {
        if (error.config.url !== '/login-or-register' && error.response) {
          if (error.response.status === 401 && !error.config._retry) {
            const JWT = '';//await auth().currentUser?.getIdToken(true);
            if (JWT) {
              axios.defaults.headers.common.Authorization = `Bearer ${JWT}`;
            }
            await axios.post(getApiEndpoints().LOGIN());
          }
        }
      },
    );

    return axios;
  }, []);

  const setMockInUse = async (setMock: boolean) => {
    const mock = await new MockAdapter(axios, {onNoMatch: 'passthrough'});
    if (setMock) {
      mockEndpoints(mock);
    }
  };

  useEffect(() => {
    setMockInUse(false);
  }, []);

  return (
    <AxiosContext.Provider value={{axios}}>{children}</AxiosContext.Provider>
  );
};
