import axios from 'axios';
import React, { useState } from 'react';

function ShortUrl() {
    const [longUrl, setUrl] = useState('')
    const [customPattern, setCustom] = useState('')
    const [shortUrl, setShortUrl] = useState('')
    const [loading, setIsLoading] = useState(false)
    const [openCustomInput, setIsCustomInput] = useState(false)

    const [error, setError] = useState('')

    const generateShortUrl = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await axios.post("/generate_url/short-url/", {
                'url': longUrl,
                'short_url_pattern': customPattern
            });

            setCustom('')
            setShortUrl(window.location.href + (response.data.short_url_pattern ? response.data.short_url_pattern : response.data.custom_pattern));

            if (response.data.message) {
                setError(response.data.message)
            }
        } catch (error) {
            console.log(error);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = async (e) => {
        const { name, value } = e.target;
        if (name === 'custom') {
            setCustom(value)
        }
        else {
            setUrl(value)
        }
    }
    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(shortUrl);
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
                    name='url'
                    placeholder='youtube.com/something-something'
                    onChange={handleChange}
                />
                <input
                    type="text"
                    className="form-control ms-2"
                    name='custom'
                    onChange={handleChange}
                    hidden={!openCustomInput}
                    placeholder='Enter pattern'
                />
                <button
                    type="button"
                    className="btn btn-danger ms-2 me-2 "
                    hidden={openCustomInput}
                    onClick={() => setIsCustomInput(true)}
                >
                    Custom Pattern
                </button>
                <button
                    type="button"
                    className="btn btn-dark"
                    disabled={loading || !longUrl}
                    onClick={generateShortUrl}
                >
                    Shorten URL
                </button>
                {loading ? <p>Loading...</p> : <></>}
            </div>


            <div className='container'>
                <p className="text-center">
                    {error}
                </p>
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
