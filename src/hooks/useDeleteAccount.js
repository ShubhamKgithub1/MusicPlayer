import {
  getAuth,
  deleteUser,
  GoogleAuthProvider,
  reauthenticateWithPopup,
} from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useDispatch } from "react-redux";
import { resetUser } from "../reduxStore/userSlice";
import { resetPlayer } from "../reduxStore/playerSlice";
import { useNavigate } from "react-router-dom";

const useDeleteAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteAccount = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("No user is currently logged in.");
      return;
    }

    const uid = user.uid;

    const performDeletion = async () => {
      try {
        await deleteDoc(doc(db, "users", uid));
        console.log("Firestore user data deleted.");

        await deleteUser(user);
        console.log("Firebase account deleted.");
        dispatch(resetPlayer());
        dispatch(resetUser());

        alert("Account deleted successfully.");
        navigate("/");
      } catch (err) {
        throw err;
      }
    };

    try {
      await performDeletion();
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        // 🔄 Reauthentication needed
        try {
          const provider = new GoogleAuthProvider();
          await reauthenticateWithPopup(user, provider);
          await performDeletion();
        } catch (reauthError) {
          console.error("Reauthentication failed:", reauthError);
          alert("Failed to re-authenticate. Account not deleted.");
        }
      } else {
        console.error("Deletion failed:", error);
        alert("An error occurred while deleting your account.");
      }
    }
  };

  return deleteAccount;
};

export default useDeleteAccount;
