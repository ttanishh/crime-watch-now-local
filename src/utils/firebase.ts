
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { getFirestore, collection, doc, setDoc, getDoc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-tL1N9w71u66LgK8KKVJqJ4wGzLU_sJM",
  authDomain: "kavach-58841.firebaseapp.com",
  projectId: "kavach-58841",
  storageBucket: "kavach-58841.firebasestorage.app",
  messagingSenderId: "1001180207294",
  appId: "1:1001180207294:web:0ecc444802f1ec35ce66ef",
  measurementId: "G-7X6G2ELH4P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// User roles
export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  SUPERADMIN = "superadmin"
}

// Create a new user with email and password
export const registerUser = async (email: string, password: string, name: string, role: UserRole) => {
  try {
    // Create the user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update the user profile with the name
    await updateProfile(user, { displayName: name });
    
    // Store additional user data in Firestore
    const userRef = doc(db, `${role}s`, user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      name,
      email,
      role,
      phoneNumber: '',
      phoneVerified: false,
      createdAt: new Date().toISOString()
    });
    
    return userCredential;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Login with email and password
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Get user role from Firestore
export const getUserRole = async (uid: string) => {
  // Try to find the user in each role collection
  const roles = [UserRole.USER, UserRole.ADMIN, UserRole.SUPERADMIN];
  
  for (const role of roles) {
    const userRef = doc(db, `${role}s`, uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return userDoc.data().role;
    }
  }
  
  return null;
};

// Logout user
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

// Send password reset email
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};

export default app;
