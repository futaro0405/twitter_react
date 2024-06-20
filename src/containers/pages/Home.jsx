import { useRecoilValue } from "recoil";
import { currentUserState, isSigninState } from "../../lib/state/state";

export const Home = () => {
  const isSignIn = useRecoilValue(isSigninState)
  const currentUser = useRecoilValue(currentUserState)

  return (
    <>
      {
        isSignIn && currentUser ? (
          <>
            <h1>Signed in successfully!</h1>
            <h2>Email: {currentUser?.email}</h2>
            <h2>Name: {currentUser?.name}</h2>
          </>
        ) : (
          <h1>Not signed in</h1>
        )
      }
    </>
  );
};
