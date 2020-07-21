import PropTypes from "prop-types";
import { Box } from "rimble-ui";

const Container = ({ children, ...props }) => {
  return (
    <Box
      maxWidth={["100%", "540px", "720px", "960px", "1300px"]}
      mx="auto"
      px="15px"
      {...props}
    >
      {children}
    </Box>
  );
};

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Container;
