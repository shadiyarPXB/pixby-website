import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ToastMessage as RimbleToastMessage } from "rimble-ui";
import styled from "styled-components";
import { useStoreActions } from "easy-peasy";

const MessageWrapper = styled.div`
  position: relative;
  transition: 0.3s;

  right: ${(props) => (props.active ? "0" : "calc(-100% - 20px)")};
  :not(:last-child) {
    margin-bottom: 15px;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  right: 22px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #000;
  transition: 0.3s;
  opacity: 0.7;
`;

const MessageSuccess = styled(RimbleToastMessage.Success)`
  padding-right: 50px !important;
  div {
    word-break: break-all !important;
    text-overflow: initial !important;
    white-space: initial !important;
  }
`;
const MessageError = styled(RimbleToastMessage.Failure)`
  padding-right: 50px !important;
  div {
    word-break: break-all !important;
    text-overflow: initial !important;
    white-space: initial !important;
  }
`;

const ToastMessage = ({ message }) => {
  const { body, id, time, type } = message;
  const [active, setActive] = useState(false);
  const timeOut = useRef();
  const removeMassage = useStoreActions(
    (actions) => actions.message.removeMessage
  );

  const messageRemoveHandler = () => {
    clearTimeout(timeOut.current);
    setActive(false);
    setTimeout(() => {
      removeMassage(id);
    }, 300);
  };

  useEffect(() => {
    setActive(true);
    if (time) {
      timeOut.current = setTimeout(() => {
        messageRemoveHandler();
      }, time);
    }
  }, []);

  return (
    <MessageWrapper active={active}>
      <CloseButton onClick={messageRemoveHandler}>
        <i className="fa fa-close"></i>
      </CloseButton>
      {type === "success" ? (
        <MessageSuccess message={body} />
      ) : (
        <MessageError message={body} />
      )}
    </MessageWrapper>
  );
};

ToastMessage.propTypes = {};

export default ToastMessage;
