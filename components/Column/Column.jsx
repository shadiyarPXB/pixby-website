import PropTypes from "prop-types";
import { Box } from "rimble-ui";

const Column = ({ children, ...rest }) => {
  return (
    <Box px="15px" {...rest}>
      {children}
    </Box>
  );
};

Column.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Column;
