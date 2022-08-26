import { Container, Grid } from "@mui/material";
// import { Loading } from "components/index";


import React, { lazy, memo, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/allResponseMessages/Loading";
import { ScrollHook } from "../hooks/ScrollHook";
import { getPosts } from "../redux/actions/actionPost";
import { authState } from "../redux/store";
// dynamic imports
const SuggestionUser = lazy(() =>
  import("../components/suggestionUser/SuggestionUser")
);
const Posts = lazy(() => import("../components/home/Posts"));
const PostBox = lazy(() => import("../components/home/post/PostBox"));

function Home() {
  const { showScroll } = ScrollHook();
  // show scroll bar when find posts
  useEffect(() => {
    showScroll();
  }, [showScroll]);

  const dispatch = useDispatch();
  const auth = useSelector(authState);
  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token));
    }
  }, [dispatch, auth.token]);

  return (
    <Container maxWidth="lg">
      <Suspense fallback={<Loading />}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={7} lg={8}>
            <PostBox />
            <Posts />
          </Grid>
          <Grid
            item
            md={5}
            lg={4}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <SuggestionUser />
            <Grid />
          </Grid>
        </Grid>
      </Suspense>
    </Container>
  );
}

export default memo(Home);
