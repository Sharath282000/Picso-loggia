import { useEffect } from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import requests from "../request";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import DownloadingIcon from "@mui/icons-material/Downloading";
import Alert from "@mui/material/Alert";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Openmodal = ({ setopenmodal, id }) => {
  const handleClose = () => setopenmodal(false);
  const [image, setimage] = useState(null);
  const [urlpic, seturlpic] = useState(null);
  const [message, setmessage] = useState("");
  const [severity, setsevirity] = useState("");
  const [loading, setloading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [imageLoadedInBrowser, setImageLoadedInBrowser] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: '400px',
    bgcolor: "background.paper",
    borderRadius: 3,
    boxShadow: 32,
    p: 4,
    transition: "all 0.5s ease-in-out",
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const MIN_DOWNLOAD_DELAY_MS = 2000;

  const handledownload = async (e, link) => {
    e.preventDefault();
    try {
      setloading(true);

      const [imageResponse] = await Promise.all([
        fetch(link),
        delay(MIN_DOWNLOAD_DELAY_MS),
      ]);

      if (!imageResponse.ok) {
        setmessage("Cannot able to download");
        setloading(false);
        setsevirity("error");
        return;
      }
      const blog = await imageResponse.blob();

      const downloadlink = document.createElement("a");
      downloadlink.href = URL.createObjectURL(blog);
      downloadlink.download = "Pics-loggia";

      document.body.appendChild(downloadlink);
      downloadlink.click();
      document.body.removeChild(downloadlink);

      URL.revokeObjectURL(downloadlink.href);
    } catch (err) {
      setsevirity("error");
      setmessage("Download failed");
    } finally {
      setsevirity("success");
      setmessage("Download was successful");
      setloading(false);
    }
  };

  useEffect(() => {
    setDataLoading(true);
    setimage(null);
    seturlpic(null);
    setmessage("");
    setImageLoadedInBrowser(false);

    requests.getPhoto
      .show({ id: id })
      .then((data) => {
        setimage(data);
        seturlpic(data.src);
        const img = new Image();
        img.src = data.src.original;
        img.onload = () => {
          setImageLoadedInBrowser(true);
        };
      })
      .catch((error) => {
        setmessage("Error fetching photo");
        setsevirity("error");
        console.error("Error fetching photo data:", error);
      })
      .finally(() => {
        setDataLoading(false);
        setmessage("");
        setsevirity("");
        setDataLoading(false);
      });
  }, [id]);

  const modalContent =
    dataLoading || !image || !urlpic || !imageLoadedInBrowser ? (
      <>
        <Typography id="modal-modal-description" sx={{ mb: 2 }}>
          <h4>
            <Skeleton width="100%" count={2} />
          </h4>
        </Typography>
        <div className="content">
          <div className="img-block">
            <Skeleton height={300} style={{ borderRadius: "3px" }} />
            <div className="title" style={{ marginTop: "8px" }}>
              <Typography id="modal-modal-title" variant="p">
                <Skeleton width="40%" />
              </Typography>
            </div>
          </div>
        </div>
        <div className="btn-block" style={{ marginTop: "16px" }}>
          <Skeleton height={30} />
        </div>
      </>
    ) : (
      <>
        <Typography id="modal-modal-description" sx={{ mb: 2 }}>
          <h4>{image.alt ? image.alt : ""}</h4>
        </Typography>
        <div className="content">
          <div className="img-block">
            <img
              src={urlpic.original}
              id={urlpic.id}
              width="100%"
              height="100%"
            />
            <div className="title">
              <Typography id="modal-modal-title" variant="p">
                Captured by {image.photographer}
              </Typography>
            </div>
          </div>
        </div>
        <div className="btn-block">
          {loading ? (
            <Button disabled variant="contained" sx={{ width: "100%" }}>
              <DownloadingIcon sx={{ marginRight: 0.6 }} />
              Downloading
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              sx={{ width: "100%" }}
              onClick={(e) => handledownload(e, urlpic.original)}
            >
              <ArrowCircleDownIcon sx={{ marginRight: 0.6 }} />
              Download
            </Button>
          )}
        </div>
      </>
    );

  return (
    <Modal
      open={Boolean(id)}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {modalContent}
        {message && severity && (
          <Alert severity={severity} sx={{ mt: 2 }}>
            {message}
          </Alert>
        )}
      </Box>
    </Modal>
  );
};

export default Openmodal;
