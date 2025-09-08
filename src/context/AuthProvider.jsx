import React, { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import { AuthContext } from './AuthContext';

const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
  const [user,setUser] = useState(null);
  const [loading,setLoading] = useState(true);
  const createUser = (email,password)=>{
    setLoading(true);
    return createUserWithEmailAndPassword(auth,email,password)
  }

  const signIn = (email, password)=>{
     setLoading(true)
     return signInWithEmailAndPassword(auth,email,password);
  }

   useEffect(()=>{
      const unSubcribe = onAuthStateChanged(auth,(currentUser=>{
        setUser(currentUser);
        setLoading(false);
      }))
      return ()=>{
         unSubcribe();
      }
    },[])
    const logOut = ()=>{
      setLoading(true)
     return signOut(auth);
    }

    const googleWithSignIn =()=>{
      setLoading(true)
      return signInWithPopup(auth,googleProvider);
    }
  const authInfo ={
     createUser,
     signIn,
     logOut,
     user,
     loading,
     googleWithSignIn
  }
  return (
    <AuthContext value={authInfo}>
      {children}
    </AuthContext>
  )
}

export default AuthProvider;
