import {useQuery} from 'react-query';
import {useAxios} from '@src/common/axios';

export const useTestCall = () => {
  const {axios} = useAxios();
  return useQuery('posts', async () => {
    const {data} = await axios.get(
      'https://jsonplaceholder.typicode.com/posts',
    );
    return data;
  });
};
