/* eslint-disable import/prefer-default-export */
import { selector } from 'recoil';
import { plasticState } from '../states';
import { PLASTIC_MAX } from '../constants';

const plasticPercentState = selector({
  key: 'plasticPercentState',
  get: ({ get }) => {
    const numPlastic = get(plasticState);

    return ((numPlastic / PLASTIC_MAX) * 100).toFixed(0);
  },
});

export { plasticPercentState };
