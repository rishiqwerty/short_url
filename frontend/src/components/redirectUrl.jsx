import axios from 'axios';
import { useParams, useNavigate } from 'react-router';
import { useEffect } from 'react';

function RedirectUrl() {
    const { shortUrl } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/generate_url/redirect/${shortUrl}`);
    
                    // Redirecting user if we get 200 response code
                    if (response.status === 200){
                    window.location.href = response.data.url;
            }
            } catch (error) {
                navigate('/');
            }
        };
    
        fetchData();
        }, [shortUrl]); // Include shortUrl as a dependency to trigger the effect when it changes
  
    return <div className='alert alert-info'>Redirecting...</div>;
}

export default RedirectUrl;
