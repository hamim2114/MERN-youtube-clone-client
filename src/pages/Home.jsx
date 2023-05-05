import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from 'axios';
import { useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchStart, fetchSuccess } from "../redux/videoSlice";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({type}) => {
  const [videos, setVideos] = useState([]);
  const {loading} = useSelector(state => state.video);
  const dispatch = useDispatch()
console.log(loading)
  useEffect(() => {
    dispatch(fetchStart())
    const fetchVideos = async () => {
      const res = await axios.get(`/api/videos/${type}`)
      setVideos(res.data)
      dispatch(fetchSuccess(res.data))
    }
    fetchVideos()
  }, [type])

  if(loading){
    return(
      <Loader/>
      )
  } 
  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Home;
