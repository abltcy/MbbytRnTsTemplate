export const getApiEndpoints = () =>
  ({
    // AUTH
    REGISTER: () => '/register',
    LOGIN: () => '/login',
    // Payment
    ADD_SETUP_INTENT: () => '/ADD_SETUP_INTENT',
    GET_PAYMENT_METHODS: () => '/GET_PAYMENT_METHODS',
    ADD_PAYMENT_METHOD: () => '/ADD_PAYMENT_METHOD',
  } as const);
