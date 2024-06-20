import { atom } from "recoil";
import { getCurrentUser } from "../api/auth";

export const loadingState = atom({
  key: 'loadingState',
  default: false,
});

export const currentUserState = atom({
  key: 'currentUserState',
  default: await getCurrentUser(),
});

export const isSigninState = atom({
  key: 'isSigninState',
  default: false,
});
