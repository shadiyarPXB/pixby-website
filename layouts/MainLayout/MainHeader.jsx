import React, { useState, useEffect, useRef } from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";
import { Box } from "rimble-ui";
import Container from "../../components/Container/Container";
import Row from "../../components/Row/Row";
import Column from "../../components/Column/Column";
import MainNavBar from "./MainNavBar";

const HeaderWrapper = styled(Box)`
  padding-top: 15px;
  padding-bottom: 15px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999999;
  transition: all 0.3s ease;
  &.sticky-nav-active {
    position: fixed;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    background-color: #fff;
  }
`;

const Logo = styled.a`
  display: inline-block;
  height: 50px;
  img {
    height: 100%;
  }
`;
const MenuTrigger = styled.button`
  border: 0;
  background: transparent;
  width: 44px;
  height: 30px;
  cursor: pointer;

  :focus {
    outline: none;
  }

  span {
    display: block;
    width: 100%;
    height: 2px;
    margin: 4px 0;
    float: right;
    background-color: ${(props) => props.theme.colors.black};
    transition: all 0.3s ease;
  }
  span:last-child {
    width: calc(100% - 10px);
    margin-bottom: 0;
  }
  :hover > span:last-child {
    width: 100%;
  }
`;

const Overlay = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  transition: 0.3s;
  background-color: ${(props) => props.theme.colors.black};
  z-index: 999;
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
  opacity: ${(props) => (props.open ? "0.4" : "0")};
`;

const MainHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerWrapperRef = useRef();
  const addStickyNav = () => {
    if (window.scrollY > 1) {
      headerWrapperRef.current.classList.add("sticky-nav-active");

      return false;
    }
    headerWrapperRef.current.classList.remove("sticky-nav-active");
  };

  useEffect(() => {
    window.addEventListener("scroll", addStickyNav);
    return () => window.removeEventListener("scroll", addStickyNav);
  });
  return (
    <HeaderWrapper ref={headerWrapperRef}>
      <Container>
        <Row>
          <Column width={1 / 2} color="black">
            <Logo href="/" height="200px">
              <img height="100%" src="/logo.svg" alt="Pixby" />
            </Logo>
          </Column>
          <Column
            width={1 / 2}
            color="black"
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
          >
            <MenuTrigger onClick={() => setMenuOpen(!menuOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </MenuTrigger>
          </Column>
        </Row>
      </Container>
      <Overlay open={menuOpen} onClick={() => setMenuOpen(false)} />
      <MainNavBar open={menuOpen} setOpen={setMenuOpen} />
    </HeaderWrapper>
  );
};

MainHeader.propTypes = {};

export default MainHeader;
