import { createContext, useContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const login = async () =>{
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
            navigate("/welcome");
        } catch (error) {
            console.log("Login error:", error);
        }
    };


const logout = async () =>{
    try {
        await signOut(auth);
        setUser(null);
         toast.success("You’ve been logged out!");
    } catch (error) {
        console.log("Logout error:", error);
    }
};

useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
        setUser(currentUser);
    });
    return ()=> unsubscribe();
},[]);

return (
    <AuthContext.Provider value={{user, login, logout}}>{children}</AuthContext.Provider>
);

};

export const useAuth = ()=> useContext(AuthContext);