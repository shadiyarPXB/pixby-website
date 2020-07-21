import React, { useRef, useEffect } from "react";
import { useStoreState } from "easy-peasy";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Flex, Box } from "rimble-ui";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import Loader from "../../components/Loader/Loader";

const BodyWrapper = styled.div`
  min-height: 100vh;
  position: relative;
  background-color: #0d0d0d;
  overflow: hidden;
`;

const SidebarWrapper = styled(Box)`
  transition: 0.3s;
  transform: translateX(-101%);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.15);
  @media screen and (min-width: ${(props) => props.theme.breakpoints[0]}) {
    transform: translateX(0);
    box-shadow: none;
  }
  &.active {
    transform: translateY(0);
  }
`;

const DashboardLayout = ({ children }) => {
  const router = useRouter();

  const isAuthenticated = useStoreState(
    (state) => state.account.isAuthenticated
  );

  const bodyWrapperRef = useRef();

  useEffect(() => {
    const { onConnect } = require("../../api/web3Modal");
    if (!isAuthenticated && onConnect) {
      onConnect(router);
    }
  }, []);

  return (
    <BodyWrapper ref={bodyWrapperRef}>
      <canvas id="bgCanvas"></canvas>
      {!isAuthenticated ? (
        <Loader loading={true} />
      ) : (
        <>
          <DashboardHeader />
          <Flex minHeight="calc(100vh - 83px)" position="relative" zIndex="1">
            <SidebarWrapper
              width={["70%", "250px"]}
              position={["fixed", "static"]}
              top="0"
              left="0"
              height={["100vh", "auto"]}
              minHeight="100%"
              style={{ overflowY: "auto" }}
              backgroundColor="white"
              zIndex="1"
              id="sidebar"
            >
              <DashboardSidebar />
            </SidebarWrapper>
            <Box
              as="main"
              flex="1"
              p={["15px", "30px", "50px"]}
              maxWidth="100vw"
            >
              {children}
            </Box>
          </Flex>
        </>
      )}
    </BodyWrapper>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default DashboardLayout;
