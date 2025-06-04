import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUserInfo, setFavorites, setRecentlyPlayed } from "../reduxStore/userSlice";
import { getFavorites, getPlaylists, getRecentlyPlayed } from "../services/userService";

const useInitUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(
          setUserInfo({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL, // keep consistent with Firebase
          })
        );
        const favorites = await getFavorites(user.uid);
        const recents = await getRecentlyPlayed(user.uid);
        dispatch(setFavorites(favorites));
        dispatch(setRecentlyPlayed(recents));
        getPlaylists(user.uid, dispatch);
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
};

export default useInitUser;
