import React from "react";
import PropTypes from "prop-types";
import { Box } from "rimble-ui";
import styled from "styled-components";

const HistoryWrapper = styled(Box)`
  :not(:last-child) {
    margin-bottom: 15px;
    @media screen and (min-width: ${(props) => props.theme.breakpoints[1]}) {
      margin-bottom: 30px;
    }
  }
`;

const HistoryBox = ({ children, ...props }) => {
  return (
    <HistoryWrapper
      borderRadius="10px"
      p={["20px", "20px", "30px"]}
      {...props}
      backgroundColor="#f5f5f5"
      boxShadow="6px 6px 12px #0c0c0c, 
      -6px -6px 12px #0e0e0e"
    >
      {children}
    </HistoryWrapper>
  );
};

HistoryBox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default HistoryBox;
