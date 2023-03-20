import React from "react";
import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { logo } from "../utils/constant";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <Stack
      direction={"row"}
      alignItems="center"
      p={2}
      sx={{
        position: "sticky",
        backgroundColor: "#000",
        top: 0,
        justifyContent: "space-between",
        zIndex:999
      }}
      
    >
      <Link to={"/"} style={{ display: "flex", alignItems: "center",textAlign:'center',gap:2 }}>
        <img src={logo} alt="logo" height={45} /> <Typography
            variant="h4"
            fontWeight={"bold"}
            mb={2}
            sx={{ color: "white" }}
          >
           <span>Coders</span>  <span style={{ color: "#F31503" }}>Tube</span>
          </Typography>
      </Link>
      <SearchBar/>
      
    </Stack>
  );
};

export default Navbar;
