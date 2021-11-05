export const getApiEndpoints = () =>
  ({
    // AUTH
    REGISTER: () => '/register',
    LOGIN: () => '/login',
  } as const);
