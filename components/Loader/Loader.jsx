import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const LoaderWrapper = styled.div`
  min-height: ${(props) => props.minHeight}px;
  display: flex;
  overflow: hidden;
`;
const LoaderDiv = styled.div`
  margin: ${(props) => (props.center ? "auto" : "0")};
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  background-color: transparent;
  border: 4px solid #222;
  border-top-color: ${(props) => props.color};
  -webkit-animation: 1s spin linear infinite;
  animation: 1s spin linear infinite;

  @keyframes spin {
    from {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

const Loader = ({ loading, size, color, minHeight, center }) => {
  // If loading is false
  if (!loading) return null;

  return (
    <LoaderWrapper minHeight={minHeight}>
      <LoaderDiv size={size} color={color} center={center} />
    </LoaderWrapper>
  );
};

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  minHeight: PropTypes.number,
  center: PropTypes.bool,
};
Loader.defaultProps = {
  size: 50,
  color: "#ab423b",
  minHeight: 200,
  center: true,
};

export default Loader;
