import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { Videos, ChannelCard } from "./";
import { fetchFromApi } from "../utils/fetchFromApi";

const ChannelDetail = () => {
  // it contains channel details
  const [channelDetail, setChannelDetail] = useState(null);
  // it contains the related video to that channel
  const [videos, setVideos] = useState([]);
  // it is use to fetch id from url
  const { Id } = useParams();
  console.log(channelDetail);
  useEffect(() => {
    // for cannel details
    fetchFromApi(`channels?part=snippet&id=${Id}`).then((data) =>
      setChannelDetail(data?.items[0])
    );
    // for get channel videos
    fetchFromApi(`search?channelId=${Id}&part=snippet&order=date`).then(
      (data) => setVideos(data?.items)
    );
  }, [Id]);

  return (
    <Box minHeight={"95vh"}>
      <Box>
        <div
          style={{
            backgroundColor:
              "white",
            zIndex: 100,
            height: "300px",
          }}
        />
        <ChannelCard marginTop={"-110px"} />
      </Box>
      <Box display={"flex"} p="2">
        <Box sx={{ mr: { sm: "100px" } }}/>
          <Videos videos={videos}/>
       
      </Box>
    </Box>
  );
};

export default ChannelDetail;
