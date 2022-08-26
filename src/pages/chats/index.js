import { Container, Grid } from "@mui/material";
import React, { useEffect } from "react";
import ChatsMenue from "../../components/chats/ChatsMenue";
import { ScrollHook } from "../../hooks/ScrollHook";

import NoOpenChat from './../../components/chats/NoOpenChat';


function Chats() {
  const { hiddenScroll } = ScrollHook();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    hiddenScroll();
  }, [hiddenScroll]);
  return (
    <Container maxWidth="lg">
      <Grid
        sx={{
          border: "1px solid var(--lineColor)",
          marginTop: "20px!important",
          borderRadius: "6px",
          height: "calc(100vh - 100px)",
          overflow: "hidden",
        }}
        container
      >
        <Grid item xs={12} md={4}>
          <ChatsMenue />
        </Grid>
        <Grid item sx={{ display: { xs: "none", md: "block" } }} xs={0} md={8}>
          <NoOpenChat />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Chats;
