import React from "react";
import PropTypes from "prop-types";
import { Flex } from "rimble-ui";

const Row = ({ children, ...rest }) => {
  return (
    <Flex mx="-15px" flexWrap="wrap" {...rest}>
      {children}
    </Flex>
  );
};

Row.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Row;
