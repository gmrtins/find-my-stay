import { initializeApp } from 'firebase/app';
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAhiNvxSok-43eP57xlsS4XIIz2q_RQBTE',
  authDomain: 'find-my-stay-94d43.firebaseapp.com',
  projectId: 'find-my-stay-94d43',
  storageBucket: 'find-my-stay-94d43.firebasestorage.app',
  messagingSenderId: '791441197601',
  appId: '1:791441197601:web:52c4d51f3b2c79f4c8b160',
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const logout = () => {
  signOut(auth)
    .then(() => {
      console.log('Sign-out successful.');
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.log(err.message);
  }
};

export const register = async (displayName, email, password) => {
  try {
    const newUser = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(newUser.user, {
      displayName,
    });

    const userRef = doc(db, 'users', newUser.user.uid);
    await setDoc(userRef, {
      displayName,
      email,
      favoriteHotels: [],
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const getFavorites = async () => {
  const user = auth.currentUser;

  // Check if the user is logged in
  if (!user) {
    return;
  }

  const userRef = doc(db, 'users', user.uid);

  try {
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      return userData.favoriteHotels;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error getting favorites:', error);
  }
};

export const addFavorite = async (hotelId) => {
  const user = auth.currentUser;

  if (!user) {
    return;
  }

  const userRef = doc(db, 'users', user.uid);

  try {
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      const favoriteHotels = userData.favoriteHotels || [];

      if (!favoriteHotels.includes(hotelId)) {
        const updatedFavorites = [...favoriteHotels, hotelId];

        await setDoc(userRef, {
          favoriteHotels: updatedFavorites,
        });
      } else {
        console.log('Hotel is already in favorites.');
      }
    } else {
      console.log('User document not found.');
    }
  } catch (error) {
    console.error('Error adding favorite:', error);
  }
};

export const removeFavorite = async (hotelId) => {
  const user = auth.currentUser;
  if (!user) {
    return;
  }

  const userRef = doc(db, 'users', user.uid);

  try {
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      const favoriteHotels = userData.favoriteHotels || [];

      if (favoriteHotels.includes(hotelId)) {
        const updatedFavorites = favoriteHotels.filter((id) => id !== hotelId);

        await setDoc(userRef, {
          favoriteHotels: updatedFavorites,
        });
      } else {
        console.log('Hotel is not in favorites.');
      }
    } else {
      console.log('User document not found.');
    }
  } catch (error) {
    console.error('Error removing favorite:', error);
  }
};

export const db = getFirestore(app);
