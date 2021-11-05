import Axios from 'axios';
import {AxiosContextInterface} from 'src/common/axios/types';
import {createContext, useContext} from 'react';

const initialContext = {
  axios: Axios.create(),
};

export const AxiosContext =
  createContext<AxiosContextInterface>(initialContext);

export function useAxios(): AxiosContextInterface {
  return useContext(AxiosContext);
}
