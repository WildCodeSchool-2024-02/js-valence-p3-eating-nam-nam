import { useState } from "react";
import Rating from "@mui/material/Rating";
import "./carteRecette.css";
import StarIcon from "@mui/icons-material/Star";

function Etoile() {
  const [value, setValue] = useState(0);

  return (
    <Rating
      className="rating"
      name="simple-controlled"
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      icon={<StarIcon fontSize="inherit" />}
      emptyIcon={<StarIcon fontSize="inherit" />}
      classes={{
        iconEmpty: "MuiRating-iconEmpty",
        iconFilled: "MuiRating-iconFilled",
        iconHover: "MuiRating-iconHover",
        iconFocus: "MuiRating-iconFocus",
      }}
    />
  );
}

export default Etoile;
