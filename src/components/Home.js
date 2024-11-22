import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const Home = () => {

    const [quotes, setQuotes] = useState([]);
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || [])
    const Fetch_data = async () => {
        try {
            const response = await fetch("http://localhost:9999/quotes")
            const data = await response.json();
            setQuotes(data);
        }
        catch (error) {
            console.error(error);
            alert("API call failed. Please try again later.");
        }
    }

    useEffect(() => {
        Fetch_data();
    }, [])


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

    return (
        <div className="App">
            <h2>즐겨찾기 예제</h2>
            <Link to="/favorite">My favorite</Link>
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

export default Home