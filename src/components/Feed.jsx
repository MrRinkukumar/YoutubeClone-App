import React, { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Sidebar, Videos } from "./";
import { fetchFromApi } from "../utils/fetchFromApi";
const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("NEW");
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetchFromApi(`search?part=snippet&q=${selectedCategory}`).then((data) => {
      setVideos(data.items);
    });
  }, [selectedCategory]);

  return (
    <>
      <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
        <Box
          sx={{
            height: { sx: "auto", Md: "92vh" },
            borderRight: "1px solid #3d3d3d",
            px: { sx: 0, md: 2 },
          }}
        >
          <Sidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <a
            href="https://huntingbrother.com/"
            rel="noreferrer noopener"
            target={"_blank"}
          >
            <Typography
              className="copyright"
              variant="body2"
              sx={{ mt: "2.5rem", color: "#fff" }}
            >
              Copyright 2023 @Huntingbrother.com
            </Typography>
          </a>
        </Box>
        <Box p={2} sx={{ overflow: "auto", height: "90vh", flex: 2 }}>
          <Typography
            variant="h4"
            fontWeight={"bold"}
            mb={2}
            sx={{ color: "white" }}
          >
            {selectedCategory} <span style={{ color: "#F31503" }}>Videos</span>
          </Typography>
          <Videos videos={videos} />
        </Box>
      </Stack>
    </>
  );
};

export default Feed;
