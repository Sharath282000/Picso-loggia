import { useEffect } from "react";
import { useState } from "react";
import requests from "../request";
import Button from "@mui/material/Button";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import CircularProgress from '@mui/material/CircularProgress';

const StyledTextField = styled(TextField)({
  "& .MuiInputLabel-root": {
    color: "white",
    fontWeight: "410",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "lightgray",
    },
    "&.Mui-focused fieldset": {
      borderColor: "lightblue",
    },
  },
  "& .MuiInputBase-input": {
    color: "white",
  },
});

const Header = ({ setissearch, setsearchimg }) => {
  const [banner, setbanner] = useState([]);
  const [query, setquery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    fetchRandom();
  }, []);

  const searchform = (e) => {
    setquery(e.target.value);
  };

  async function searchPhoto() {
    if (!query.trim()) return;
    setSearchLoading(true);
    setissearch(true);

    try {
      const data = await requests.searchPhoto.search({ query, per_page: 125 });
      setsearchimg(data.photos);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setSearchLoading(false);
    }
  }

  const fetchRandom = () => {
    requests.fetchRandom.then((photos) =>
      setbanner(
        photos.photos[Math.floor(Math.random() * photos.photos.length - 1)].src
          .original
      )
    );
  };
  const renderSearchButton = () => {
    if (searchLoading) {
      return (
        <>
          {" "}
          <CircularProgress size={20} color="inherit" sx={{ marginRight: 1 }} />
         Searching... {" "}
        </>
      );
    }
    return (
      <>
        <SearchOutlinedIcon sx={{ marginRight: 0.5 }} />
        Search {" "}
      </>
    );
  };
  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url(${banner})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="banner-content">
        <div className="header-content">
          <div className="logo">
            <img src="camera.ico" />
            <h2>Picso Loggia</h2>
          </div>
          <p>Picso Loggia - A gallery of world's best photographs</p>
          <div className="search-form">
            <StyledTextField
              label="Search Images"
              autoComplete="off"
              variant="outlined"
              sx={{ width: "100%" }}
              value={query}
              onChange={searchform}
            />
            <Button
              variant="contained"
              color="success"
              sx={{ marginTop: 1.5, width: "100%" }}
              onClick={searchPhoto}
            >
              {renderSearchButton()}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
