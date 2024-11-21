import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const Home = () => {

    const [quotes, setQuotes] = useState([]);

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
        const existing_favorites_id = JSON.parse(localStorage.getItem("favorites")) || [];

        if (!existing_favorites_id.includes(quoteId)) {
            const updatedFavorites = [...existing_favorites_id, quoteId];
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            console.log("Updated favorites:", updatedFavorites);
        } else {
            console.log("This quote is already in favorites.");
        }
    }

    return (
        <div className="App">
            <h2>배우들의 명언들</h2>
            <Link to="/favorite">My favorite</Link>
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

export default Home