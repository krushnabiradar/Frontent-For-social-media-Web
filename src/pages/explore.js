import { Container } from "@mui/material";
// import { Loading, LoadMoreButton, PostThumb } from "components/index";




import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/allResponseMessages/Loading";
import { ScrollHook } from "../hooks/ScrollHook";
import { getExplorePosts } from "../redux/actions/acttionExplore";
import { EXPLORE_TYPES } from "../redux/actions/constant";
import { authState, stateExplore } from "../redux/store";
import { GetAPIData } from "../utils/fetchData";
import PostThumb from '../components/profile/postProfile/PostThumb';
import LoadMoreButton from "../components/LoadMoreButton";



function Explore() {
  const { GET_MORE_POST } = EXPLORE_TYPES;
  const dispatch = useDispatch();
  const auth = useSelector(authState);
  const explore = useSelector(stateExplore);
  const [loading, setLoading] = useState(explore.loading);
  const { showScroll } = ScrollHook();
  // show scroll bar when find posts
  useEffect(() => {
    showScroll();
  }, [showScroll]);
  
  // Get Explore page data
  useEffect(() => {
    if (!explore.firstLoading) {
      dispatch(getExplorePosts(auth.token));
    }
  }, [auth.token, dispatch, explore.firstLoading]);

  // Handle Get More Posts
  const handleShowMorePost = async () => {
    setLoading(true);
    const { data } = await GetAPIData(
      `posts_explore?num=${explore.page * 9}`,
      auth.token
    );
    dispatch({ type: GET_MORE_POST, payload: data });
    setLoading(false);
  };
  return (
    <Container maxWidth="lg">
      {explore.loading ? (
        <Loading width="40px" margin="0px auto" />
      ) : (
        <PostThumb posts={explore.posts} />
      )}

      {loading ? (
        <Loading width="40px" margin="0px auto" />
      ) : (
        <LoadMoreButton
          postsCount={explore.postsCount}
          page={explore.page}
          loading={loading}
          handleShowMorePost={handleShowMorePost}
        />
      )}
    </Container>
  );
}

export default Explore;
