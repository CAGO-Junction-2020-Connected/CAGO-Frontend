/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';

const plasticState = atom({
  key: 'plasticState',
  default: 0,
});

const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: false,
});

const userState = atom({
  key: 'userState',
  default: '',
});

export { plasticState, isLoggedInState, userState };
