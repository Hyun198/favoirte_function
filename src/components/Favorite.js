import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Favorite = () => {
    const [quotes, setQuotes] = useState([])

    const favorites_id = JSON.parse(localStorage.getItem('favorites')) || []

    const Fetch_data = async () => {
        try {
            const response = await fetch("http://localhost:9999/quotes");
            const data = await response.json();

            const filtered_favorites = data.filter(quote => favorites_id.includes(quote.id));
            setQuotes(filtered_favorites);
        } catch (error) {
            console.error(error);
        }
    }

    const handleSave = (quoteId) => {
        const existing_favorites_id = JSON.parse(localStorage.getItem("favorites")) || [];

        if (!existing_favorites_id.includes(quoteId)) {
            //id 추가
            const updatedFavorites = [...existing_favorites_id, quoteId];
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            console.log("Updated favorites:", updatedFavorites);
        } else {
            const updatedFavorites = existing_favorites_id.filter((id) => id !== quoteId)
            console.log("This quote is already in favorites.");

            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            console.log("Updated favorites:", updatedFavorites);
        }
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
                    {quotes.map((quote) => (
                        <div className="quote">
                            <li key={quote.id}>{quote.quote}</li>
                            <button onClick={() => handleSave(quote.id)}>추가</button>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Favorite