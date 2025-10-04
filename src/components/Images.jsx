import { useState } from "react";
import { useEffect } from "react";
import requests from "../request";
import Openmodal from "./Openmodal";
import { Alert } from "@mui/material";
import Imagecard from "./Imagecard";

const Images = ({ issearch, searchimg }) => {
  const [images, setimages] = useState([]);
  const [openmodal, setopenmodel] = useState(false);
  const [id, setid] = useState(0);
  const [loading, setLoading] = useState(true);

  const MIN_LOADING_TIME_MS = 2000; // Define minimum display time (e.g., 500ms)
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
        fetchImages()
  }, [searchimg]);

  const fetchImages = async () => {
    setLoading(true);
   try {
      const fetchDataPromise = requests.fetchRandom; 
      
      const minDelayPromise = delay(MIN_LOADING_TIME_MS);
      const [data] = await Promise.all([
        fetchDataPromise, 
        minDelayPromise
      ]);
      setimages(data.photos);
    } catch (error) {
      <Alert variant="error">"Failed to load images:", {error}</Alert>
    } finally {

      setLoading(false); 
    }
  };

  const imagehandle = (e) => {
    setid(e.target.id);
    setopenmodel(true);
  };

  const displayImages = issearch && searchimg.length > 0 ? searchimg : images;

  return (
    <div>
      <Imagecard
        displayImages={displayImages}
        imagehandle={imagehandle}
        isLoading={loading}
        isSearchMode={issearch} 
      />
      {openmodal && (
        <Openmodal id={id} openmodal={openmodal} setopenmodal={setopenmodel} />
      )}
    </div>
  );
};

export default Images;
