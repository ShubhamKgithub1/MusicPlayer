import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserInfo,
  setFavorites,
  setRecentlyPlayed,
  setUserLoaded,
} from "../reduxStore/userSlice";
import {
  getFavorites,
  getPlaylists,
  getRecentlyPlayed,
} from "../services/userService";

const useInitUser = () => {
  const dispatch = useDispatch();
  const { userLoaded } = useSelector((state) => state.user);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      if (!userLoaded) {
        dispatch(
          setUserInfo({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          })
        );

        const recents = await getRecentlyPlayed(user.uid);
        dispatch(setRecentlyPlayed(recents));
        dispatch(setUserLoaded(true));
      }
      const favorites = await getFavorites(user.uid);
      dispatch(setFavorites(favorites));

      getPlaylists(user.uid, dispatch);
    });

    return () => unsubscribe();
  }, [dispatch, userLoaded]);
};

export default useInitUser;
