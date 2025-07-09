import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import toast from "react-hot-toast";
import {addPlaylist, setFavorites, setPlaylists} from "../reduxStore/userSlice";
import { setRecentlyPlayed } from "../reduxStore/userSlice";

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
export const addRecentlyPlayed = async (userId, song, dispatch, existingList = []) => {
  if (!song?.id) {
    console.warn("Invalid song data:", song);
    return;
  }

  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    const newEntry = {
      ...song,
      playedAt: Date.now(),
    };

    let recentlyPlayed = [];

    if (userDocSnap.exists()) {
      const data = userDocSnap.data();
      recentlyPlayed = data.recentlyPlayed || [];
    } else {
      recentlyPlayed = existingList;
    }

    // Remove duplicate
    recentlyPlayed = recentlyPlayed.filter((s) => s.id !== song.id);

    // Add new song to top
    recentlyPlayed.unshift(newEntry);

    // Limit to latest 20
    if (recentlyPlayed.length > 50) {
      recentlyPlayed = recentlyPlayed.slice(0, 50);
    }

    await setDoc(userDocRef, { recentlyPlayed }, { merge: true });

    // ✅ Update Redux too
    if (dispatch) {
      dispatch(setRecentlyPlayed(recentlyPlayed));
    }
  } catch (error) {
    console.error("Error updating recently played:", error);
  }
};


export const addToFavorites = async (userId, song, dispatch)=>{
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

      if (isAlreadyFav) {
        toast.success(song?.title_short + " is already in favorites");
        return;}

      favorites.unshift(song);
      await setDoc(userDocRef, {favorites}, {merge: true});
      toast.success(song?.title_short + " added to favorite..");
        dispatch(setFavorites(favorites));

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

export const removeFromFavorites = async (userId, songId, dispatch) => {
  if (!userId || !songId) return;

  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const data = userDocSnap.data();
      const currentFavorites = data.favorites || [];

      const updatedFavorites = currentFavorites.filter((song) => song.id !== songId);

      await setDoc(userDocRef, { favorites: updatedFavorites }, { merge: true });
      toast.success("Removed from favorites.");

      // ✅ Update Redux store
      dispatch(setFavorites(updatedFavorites));
    } else {
      toast.error("User data not found.");
    }
  } catch (error) {
    console.error("Error removing from favorites:", error);
    toast.error("Failed to remove from favorites.");
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

export const createPlaylist = async (userId, name, dispatch = null) => {
  try {
    const newPlaylist = {
      id: Date.now().toString(),
      name,
      songs: [],
      createdAt: new Date().toISOString(),
    };

    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    let current = [];
    if (docSnap.exists()) {
      current = docSnap.data().playlists || [];
    }

    const updated = [newPlaylist, ...current];
    await setDoc(docRef, { playlists: updated }, { merge: true });

    if (dispatch) {
      dispatch(addPlaylist(newPlaylist));
    }

    return newPlaylist;
  } catch (err) {
    console.error("Error creating playlist:", err);
    return null;
  }
};


export const addSongToPlaylist = async (userId, playlistId, song, dispatch) => {
  if (!userId || !playlistId || !song?.id) return;

  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      toast.error("User not found.");
      return;
    }

    const userData = userDocSnap.data();
    const playlists = userData.playlists || [];

    const playlistIndex = playlists.findIndex(pl => pl.id === playlistId);
    if (playlistIndex === -1) {
      toast.error("Playlist not found.");
      return;
    }

    const playlist = playlists[playlistIndex];
    const alreadyExists = playlist.songs?.some(s => s.id === song.id);
    if (alreadyExists) {
      toast.success("Song already in playlist.");
      return;
    }

    playlist.songs = [song, ...(playlist.songs || [])];
    playlists[playlistIndex] = playlist;

    await setDoc(userDocRef, { playlists }, { merge: true });

    if (dispatch) {
      dispatch(setPlaylists(playlists));
    }

    toast.success("Song added to playlist.");
  } catch (error) {
    console.error("Error adding song to playlist:", error);
    toast.error("Failed to add song.");
  }
};

export const removeSongFromPlaylist = async (userId, playlistId, songId, dispatch) => {
  if (!userId || !playlistId || !songId) return;

  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      toast.error("User not found.");
      return;
    }

    const userData = userDocSnap.data();
    const playlists = userData.playlists || [];

    const playlistIndex = playlists.findIndex(pl => pl.id === playlistId);
    if (playlistIndex === -1) {
      toast.error("Playlist not found.");
      return;
    }

    const playlist = playlists[playlistIndex];
    playlist.songs = (playlist.songs || []).filter(song => song.id !== songId);
    playlists[playlistIndex] = playlist;

    await setDoc(userDocRef, { playlists }, { merge: true });

    if (dispatch) {
      dispatch(setPlaylists(playlists));
    }

    toast.success("Song removed from playlist.");
  } catch (error) {
    console.error("Error removing song:", error);
    toast.error("Failed to remove song.");
  }
};

export const deletePlaylist = async (userId, playlistId, dispatch) => {
  if (!userId || !playlistId) return;

  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      toast.error("User not found.");
      return;
    }

    const userData = userDocSnap.data();
    const playlists = userData.playlists || [];

    const updatedPlaylists = playlists.filter(pl => pl.id !== playlistId);
    await setDoc(userDocRef, { playlists: updatedPlaylists }, { merge: true });

    if (dispatch) {
      dispatch(setPlaylists(updatedPlaylists));
    }

    toast.success("Playlist deleted.");
  } catch (error) {
    console.error("Error deleting playlist:", error);
    toast.error("Failed to delete playlist.");
  }
};

export const renamePlaylist = async (userId, playlistId, newName, dispatch) => {
  if (!userId || !playlistId || !newName) return;

  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      toast.error("User not found.");
      return;
    }

    const userData = userDocSnap.data();
    const playlists = userData.playlists || [];

    const playlistIndex = playlists.findIndex(pl => pl.id === playlistId);
    if (playlistIndex === -1) {
      toast.error("Playlist not found.");
      return;
    }

    playlists[playlistIndex].name = newName;

    await setDoc(userDocRef, { playlists }, { merge: true });

    if (dispatch) {
      dispatch(setPlaylists(playlists));
    }

    toast.success("Playlist renamed.");
  } catch (error) {
    console.error("Error renaming playlist:", error);
    toast.error("Failed to rename playlist.");
  }
};


export const getPlaylists = async (userId, dispatch = null) => {
   if (!userId) return [];
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const playlists = docSnap.data().playlists || [];
      if (dispatch) {
        dispatch(setPlaylists(playlists));
      }
      return playlists;
    }
    return [];
  } catch (err) {
    console.error("Failed to fetch playlists:", err);
    return [];
  }
};
