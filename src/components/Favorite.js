import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Favorite = () => {
    const [quotes, setQuotes] = useState([])
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || [])

    const Fetch_data = async () => {
        try {
            const response = await fetch("http://localhost:9999/quotes");
            const data = await response.json();
            const filtered_favorites = data.filter(quote => favorites.includes(quote.id));
            setQuotes(filtered_favorites);
        } catch (error) {
            console.error(error);
        }
    }

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


    useEffect(() => {
        Fetch_data();
    }, [])

    return (
        <div className="App">
            <h2>즐겨찾기 페이지</h2>
            <Link to="/">홈으로</Link>
            <div className='quotes_container'>
                <ul>
                    {quotes.map((quote) => {
                        const isFavorite = favorites.includes(quote.id);
                        return (
                            <div
                                key={quote.id}
                                className={`quote ${isFavorite ? "favorite" : ""}`}
                                onClick={() => handleSave(quote.id)}
                            >
                                {quote.quote}
                            </div>
                        );
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Favorite