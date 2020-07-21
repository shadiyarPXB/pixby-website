import React from "react";
import PropTypes from "prop-types";
import { Box } from "rimble-ui";
import styled from "styled-components";

const CardWrapper = styled(Box)`
  :not(:last-child) {
    margin-bottom: 15px;
    @media screen and (min-width: ${(props) => props.theme.breakpoints[1]}) {
      margin-bottom: 30px;
    }
  }
`;

const DashboardCard = ({ children, ...props }) => {
  return (
    <CardWrapper
      borderRadius="10px"
      p={["20px", "20px", "30px"]}
      {...props}
      boxShadow="5px 5px 10px #0a0a0a, 
      -5px -5px 10px #101010;"
      bg="#0d0d0d"
    >
      {children}
    </CardWrapper>
  );
};

DashboardCard.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default DashboardCard;
