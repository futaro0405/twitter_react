import { atom } from "recoil";
// import { getCurrentUser } from "../api/auth";

export const loadingState = atom({
  key: 'loading',
  default: false,
});
// export const currentUserState = atom({
//   key: 'currentUser',
//   default: await getCurrentUser(),
// });
export const isSigninState = atom({
  key: 'isSignin',
  default: false,
});
export const flashState = atom({
  key: "flash",
  default: {
    isOpen: false,
    severity: "info",
    message: "",
  },
})