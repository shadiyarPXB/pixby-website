import React, { useRef, useEffect, useState } from "react";

import PropTypes from "prop-types";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import styled from "styled-components";

const BodyWrapper = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

const MainLayout = ({ children }) => {
  const footerRef = useRef();

  const [padding, setPadding] = useState({
    paddingTop: "84px",
    paddingBottom: "165px",
  });

  const adjustPadding = () =>
    setPadding({
      ...padding,
      paddingBottom: footerRef?.current?.clientHeight,
    });

  useEffect(() => {
    adjustPadding();
    window.addEventListener("resize", adjustPadding);
    return () => window.removeEventListener("resize", adjustPadding);
  }, []);

  return (
    <BodyWrapper style={padding}>
      <MainHeader />
      <main>{children}</main>
      <MainFooter ref={footerRef} />
    </BodyWrapper>
  );
};

MainLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default MainLayout;
