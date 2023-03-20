import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Box, Stack, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Videos } from "./";
import { fetchFromApi } from "../utils/fetchFromApi";
const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const { Id } = useParams();
  useEffect(() => {
    // fetch the clicked video
    fetchFromApi(`videos?part=snippet,statistics&id=${Id}`).then((data) =>
      setVideoDetail(data.items[0])
    );
    // fetch the related video
    fetchFromApi(`search?part=snippet&relatedToVideoId=${Id}&type=video`).then(
      (data) => setVideos(data.items)
    );
  }, [Id]);
  if (!videoDetail?.snippet) return "Loading...";
  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;
  return (
    <Box minHeight={"95vh"}>
      {" "}
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top:'86px' }}>
            <ReactPlayer
              url={`https:www.youtube.com/watch?v=${Id}`}
              className="react-player"
              controls
            />
            <Typography color="#fff" variant="h5" fontWeight={"bold"} p={2}>
              {title}
            </Typography>
            <Stack
              direction={"row"}
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  color="#fff"
                  variant={{ sm: "subtitle1", md: "h6" }}
                >
                  {channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction={"row"} gap="20px" alignItems={"center"}>
                {viewCount && (
                  <Typography variant="body1" sx={{ opacity: 0.7 }}>
                    {parseInt(viewCount).toLocaleString()} views
                  </Typography>
                )}
                {likeCount && (
                  <Typography variant="body1" sx={{ opacity: 0.7 }}>
                    {parseInt(likeCount).toLocaleString()} likes
                  </Typography>
                )}
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems={"center"}
        >
          <Videos videos={videos} direction={"column"} />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
