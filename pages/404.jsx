import PropTypes from "prop-types";
import MainLayout from "../layouts/MainLayout/MainLayout";
import { Box } from "rimble-ui";
const NotFound = () => {
  return (
    <MainLayout>
      <Box height="10px" p="50px 0" textAlign="center">
        404 This page could not be found.
      </Box>
    </MainLayout>
  );
};

NotFound.propTypes = {};

export default NotFound;
