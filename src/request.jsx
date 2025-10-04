import {createClient} from 'pexels';

const key= import.meta.env.VITE_API_KEY;

const api_key = createClient(key);

const requests ={
    fetchRandom : api_key.photos.curated({ per_page: 125 }),
    searchPhoto:api_key.photos,
    getPhoto:api_key.photos,
}

export default requests;