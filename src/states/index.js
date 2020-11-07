/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';

const plasticState = atom({
  key: 'plasticState',
  default: 0,
});

export { plasticState };
