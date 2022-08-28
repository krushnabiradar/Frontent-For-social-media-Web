import { Container, Grid } from "@mui/material";
import { Loading } from "components/index";
import { ScrollHook } from "hooks/ScrollHook";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/actions/actionPost";
import { authState } from "../redux/store";
// dynamic imports
import SuggestionUser from "../components/suggestionUser/SuggestionUser";
import Posts from "../components/home/Posts";
import PostBox from "../components/home/post/PostBox";

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
      <div fallback={<Loading />}>
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
      </div>
    </Container>
  );
}

export default Home;
