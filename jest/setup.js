import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('react-native-safe-area-context', () =>
  require('react-native-safe-area-context/jest/mock').default
);

jest.mock('react-native/Libraries/Components/RefreshControl/RefreshControl', () => 'RefreshControl');

jest.mock('@react-native-firebase/messaging', () => ({
  getMessaging: jest.fn(),
  requestPermission: jest.fn(() => Promise.resolve(1)),
  AuthorizationStatus: {
    AUTHORIZED: 1,
    PROVISIONAL: 2,
  },
  getToken: jest.fn(() => Promise.resolve('test-fcm-token')),
  onTokenRefresh: jest.fn(() => jest.fn()),
}))
