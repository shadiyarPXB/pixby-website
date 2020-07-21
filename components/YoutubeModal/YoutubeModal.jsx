import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Box } from "rimble-ui";

const VideoWrapper = styled(Box)`
  transition: 0.3s;
  opacity: ${({ open }) => (open ? 1 : 0)};
  visibility: ${({ open }) => (open ? "visible" : "hidden")};

  span {
    color: #fff;
    position: absolute;
    right: 30px;
    top: 30px;
    font-size: 30px;
    cursor: pointer;
    transition: 0.3s;
    :hover {
      opacity: 0.6;
    }
  }
`;

const VideoIframe = styled.iframe`
  width: 280px;
  height: 160px;
  border: none;
  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    width: 480px;
    height: 260px;
  }
  @media (min-width: ${(props) => props.theme.breakpoints[1]}) {
    width: 580px;
    height: 300px;
  }
  @media (min-width: ${(props) => props.theme.breakpoints[2]}) {
    width: 680px;
    height: 400px;
  }
  @media (min-width: ${(props) => props.theme.breakpoints[3]}) {
    width: 880px;
    height: 500px;
  }
`;

const YoutubeModal = ({ videoId, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <VideoWrapper
        position="fixed"
        left="0"
        top="0"
        right="0"
        bottom="0"
        backgroundColor="blacks.8"
        display="flex"
        justifyContent="center"
        alignItems="center"
        onClick={() => setOpen(false)}
        open={open}
        zIndex="99999999999999999"
      >
        <span>
          <i className="fa fa-close"></i>
        </span>
        <VideoIframe
          src={`https://www.youtube.com/embed/${videoId}`}
          frameborder="0"
          onClick={(e) => e.stopPropagation()}
        />
      </VideoWrapper>
      <children.type
        {...children.props}
        onClick={() => setOpen(true)}
      ></children.type>
    </>
  );
};

YoutubeModal.propTypes = {
  videoId: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default YoutubeModal;
