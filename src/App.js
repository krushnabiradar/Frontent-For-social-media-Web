import { Box } from "@mui/material";
import {
  HeaderComp,
  IndexResponse,
  LoadingPage,
  PostModal
} from "components/index";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import Home from "./pages/home";
import Login from "./pages/login";
import Notfound from "./pages/Notfound";
import PageRender from "./pages/PageRender";
import Register from "./pages/register";
import { refreshToken } from "./redux/actions/actionAuth";
import { GLOBALTYPES } from "./redux/actions/constant";
import {
  authState,
  openModelPost,
  resMessagesState,
  socketState
} from "./redux/store";
import SocketClient from "./SocketClient";

function App() {
  const dispatch = useDispatch();
  const { SOCKET } = GLOBALTYPES;
  const socket = useSelector(socketState);
  const postModel = useSelector(openModelPost);
  const auth = useSelector(authState);
  const responseMessage = useSelector(resMessagesState);
  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  //   socket io
  useEffect(() => {
    const socket = io("http://localhost:5000/");
    dispatch({ type: SOCKET, payload: socket });
    return () => socket.close();
  }, [SOCKET, dispatch]);

  if (responseMessage.loading) {
    return <LoadingPage />;
  }

  return (
    <BrowserRouter>
      <div fallback={<LoadingPage />}>
        {auth.token && socket && <SocketClient />}
        {auth.token && <HeaderComp />}
        {postModel && <PostModal />}

        <Box sx={{ minHeight: "91vh" }}>
          <IndexResponse />
          <Routes>
            <Route path="/" element={auth.user ? <Home /> : <Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/:page" element={<PageRender />} />
            <Route path="/:page/:id" element={<PageRender />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </Box>
      </div>
    </BrowserRouter>
  );
}

export default App;
