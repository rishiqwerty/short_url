import axios from 'axios';
import React, { useState } from 'react';

function ShortUrl() {
    const [longUrl, setUrl] = useState('')
    const [shortUrl, setShortUrl] = useState('')
    const [loading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const generateShortUrl = async () => {
        try {
            setIsLoading(true);
            setError(null);
    
            const response = await axios.post("http://localhost:8001/generate_url/short-url/", {
                'url': longUrl
            });
    
            console.log(response);
            setShortUrl(response.data.short_url_pattern);
        } catch (error) {
            console.log(error);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = async (e) => {
        const {name,value} = e.target;
        setUrl(value)
    }
    return (
        <div className="container">
            <input onChange={handleChange} />
            <button disabled={loading} onClick={generateShortUrl}>Shorten URL</button>
            {shortUrl}
        </div>
    );
}

export default ShortUrl;
