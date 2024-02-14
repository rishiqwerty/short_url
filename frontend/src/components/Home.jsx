import axios from 'axios';
import { useParams } from 'react-router';
import { useEffect } from 'react';
function Home() {
    const { shortUrl } = useParams()
    useEffect(() => {
        console.log("FDFDFID----")
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/generate_url/redirect/${shortUrl}`);
    
                // Perform actions based on the API response (e.g., redirect the user)
                // if (response.status >= 300 && response.status < 400) {
                    if (response.status === 200){
                    // Handle the redirect here
                    window.location.href = response.data.url;
            }
            } catch (error) {
            console.error(error);
            // Handle errors if needed
            }
        };
    
        fetchData();
        }, [shortUrl]); // Include shortUrl as a dependency to trigger the effect when it changes
  
    return <div>Redirecting...</div>;
}

export default Home;
