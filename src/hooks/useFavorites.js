import { useState } from "react";

export function useFavorites() {
    const [favorites, setFavorites] = useState(
        JSON.parse(localStorage.getItem("favorites")) || []
    );
    const handleSave = (quoteId) => {
        let updated_favorites = favorites.includes(quoteId)

        if (updated_favorites) {
            updated_favorites = favorites.filter((id) => id !== quoteId);
        } else {
            updated_favorites = [...favorites, quoteId];
        }
        setFavorites(updated_favorites);
        localStorage.setItem('favorites', JSON.stringify(updated_favorites));
    }

    return { favorites, handleSave }
}