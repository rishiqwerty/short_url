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

            const response = await axios.post("/generate_url/short-url/", {
                'url': longUrl
            });

            console.log(response);
            setShortUrl(window.location.href + response.data.short_url_pattern);
        } catch (error) {
            console.log(error);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setUrl(value)
    }
    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(shortUrl);
            // Optionally, you can provide feedback to the user that the text has been copied
            alert('Text copied to clipboard!');
        } catch (err) {
            console.error('Unable to copy text to clipboard', err);
        }
    };

    return (
        <div className="container">
            <div className="input-group mb-3 p-4">
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                />
                <button
                    type="button"
                    className="btn btn-dark"
                    disabled={loading}
                    onClick={generateShortUrl}
                >
                    Shorten URL
                </button>
                {loading ? <p>Loading...</p> : <></>}
            </div>

            <div className='container'>
                <p className="text-center">
                    {shortUrl ? <b>Shortened URL: </b> : ''} <a className='text-danger' href={shortUrl ? shortUrl : ''}>{shortUrl}</a>
                </p>
                <div className='d-flex justify-content-center align-items-center'>

                    {shortUrl ?
                        <button
                            type="button"
                            className="btn btn-danger"
                            disabled={shortUrl.length === 0 ? true : false}
                            onClick={handleCopyClick}
                        >
                            Copy
                        </button> : <></>
                    }
                </div>

            </div>
        </div>
    );
}

export default ShortUrl;
