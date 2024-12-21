import React, { createContext, useState, useContext, useEffect } from "react";
import { addFavorite, auth, getFavorites, removeFavorite } from "../configs/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

interface FavoritesContextType {
    favorites: number[];
    add: (f: number) => void;
    remove: (f: number) => void;
}

export const FavoritesContext = createContext<FavoritesContextType>({
    favorites: [],
    add: () => { },
    remove: () => { },
});

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<number[]>([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                getFavorites().then((favoritesList) => {
                    setFavorites(favoritesList);
                });
            } else {
                setFavorites([]);
            }
        });

        return () => unsubscribe();
    }, []);

    const add = (f: number) => {
        addFavorite(f).then(() => {
            setFavorites([...favorites, f]);
        })
    }

    const remove = (f: number) => {
        removeFavorite(f).then(() => {
            const newFavorites = favorites.filter((fav) => fav !== f);
            setFavorites(newFavorites);
        });
    };

    return (
        <FavoritesContext.Provider value={{ favorites, add, remove }}>
            {children}
        </FavoritesContext.Provider>
    );
};
