import React from "react";
import { useSelector } from "react-redux";
import { resMessagesState } from "../../redux/store";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";
function IndexResponse() {
  const resMessages = useSelector(resMessagesState);
  return (
    <>
      {resMessages.loading && <Loading />}
      {resMessages.error && <ErrorMessage />}
    </>
  );
}

export default IndexResponse;
