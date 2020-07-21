import React from "react";
import { useStoreState } from "easy-peasy";

import { Box } from "rimble-ui";
import ToastMessage from "./ToastMessage";

const MessageContainer = () => {
  const messages = useStoreState((state) => state.message.messages);
  return (
    <Box
      width="520px"
      maxWidth="90%"
      position="fixed"
      right="20px"
      bottom="20px"
      zIndex="999999"
    >
      {messages.map((message) => (
        <ToastMessage message={message} key={message.id} />
      ))}
    </Box>
  );
};

export default MessageContainer;
