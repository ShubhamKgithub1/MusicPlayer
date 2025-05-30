import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const storeUserInfo = async (user) => {
  if (!user || !user.uid) {
    console.error("User is null or missing UID");
    return;
  }

  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    await setDoc(userRef, {
      name: user.displayName,
      email: user.email,
      uid: user.uid,
      photoUrl: user.photoURL, // ✅ corrected here
      createdAt: new Date(),
    });
  }
};
export const addRecentlyPlayed = async (userId, song) => {
  if (!song?.id) {
  console.warn("Invalid song data:", song);
  return;
}
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDocSnap = await getDoc(userDocRef);

    const newEntry = {
      ...song,
      playedAt: Date.now(),
    };

    let recentlyPlayed = [];

    if (userDocSnap.exists()) {
      const data = userDocSnap.data();
      recentlyPlayed = data.recentlyPlayed || [];
    }

    // Remove the same song if it already exists
    if (!song?.id) return;
    recentlyPlayed = recentlyPlayed.filter((s) => s.id !== song.id);

    // Add new song to the top
    recentlyPlayed.unshift(newEntry);

    // Keep only the latest 20
    if (recentlyPlayed.length > 20) {
      recentlyPlayed = recentlyPlayed.slice(0, 20);
    }

    await setDoc(userDocRef, { recentlyPlayed }, { merge: true });
  } catch (error) {
    console.error('Error updating recently played:', error);
  }
};

export const addToFavorites = async (userId, song)=>{
    if(!song?.id || !userId) return;
    try {
      const userDocRef = doc(db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);

      let favorites = [];

      if(userDocSnap.exists()){
        const data = userDocSnap.data();
        favorites = data.favorites || [];
      }

      const isAlreadyFav = favorites.some((fav)=> fav.id === song.id);

      if (isAlreadyFav) return;

      favorites.unshift(song);
      await setDoc(userDocRef, {favorites}, {merge: true});

    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
};


export const getFavorites = async (userId)=>{
  try{
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);
    if(userDocSnap.exists()){
      const data = userDocSnap.data();
      return data.favorites || [];
    }else{
      return [];
    }
  }catch(error){
    console.error("Error fetching favorites:", error);
    return [];
  }
};

export const removeFromFavorites = async (userId, songId)=>{
  if (!songId || !userId) {
    return;
  }

  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = getDoc(userDocRef);

    if(userDocSnap.exists()){
      const data = await userDocSnap.data();
      const currentFavorites = data.favorites || [];

      const updatedFavorites = currentFavorites.filter((song)=> song.id !==songId);

      await setDoc(userDocRef, {favorites: updatedFavorites},{merge: true});
    }
  } catch (error) {
    console.error("Error removing from favorites:", error);
  }
};

export const getRecentlyPlayed = async (userId) =>{
    try {
        const userDocRef = doc(db, "users", userId);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            return data.recentlyPlayed || [];
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching recently played:", error);
        return [];
    }
};