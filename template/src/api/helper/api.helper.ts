import {getApiEndpoints} from 'src/api/constants/endpoints';
import MockAdapter from 'axios-mock-adapter/types';

export const mockEndpoints = (mock: MockAdapter): void => {
  mock.onGet(getApiEndpoints().LOGIN()).reply(200, {
    user: {
      name: 'Jane',
      mail: 'ifo@demo.com',
    },
    error: false,
    message: '',
  });

  mock.onPost(getApiEndpoints().REGISTER()).reply(200, {
    user: {
      name: 'Jane',
      mail: 'ifo@demo.com',
    },
    error: false,
    message: '',
  });
};
