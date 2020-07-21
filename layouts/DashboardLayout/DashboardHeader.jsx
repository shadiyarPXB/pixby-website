import { useEffect } from "react";
import dynamic from "next/dynamic";
import { Flex, Box, Button } from "rimble-ui";
import { useRouter } from "next/router";
import styled from "styled-components";

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
    float: left;
    background-color: ${(props) => props.theme.colors.white};
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

const Logo = styled.a`
  display: inline-block;
  height: 50px;
  img {
    height: 100%;
  }
`;

const DashboardHeader = () => {
  const router = useRouter();
  const onMenuTrigger = () => {
    const sidebar = document.getElementById("sidebar");

    if (sidebar) {
      if (sidebar.classList.contains("active")) {
        return sidebar.classList.remove("active");
      }
      return sidebar.classList.add("active");
    }
  };

  const logOutClickHandler = () => {
    const { onDisconnect } = require("../../api/web3Modal");
    if (onDisconnect) {
      onDisconnect(router);
    }
  };
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      backgroundColor="linear-gradient(145deg, #e2e3e2, #ffffff)"
      height="80px"
      px="22px"
      mb="3px"
      position="relative"
      zIndex="1"
    >
      <Box display={["block", "none"]}>
        <MenuTrigger onClick={onMenuTrigger} id="menu">
          <span></span>
          <span></span>
          <span></span>
        </MenuTrigger>
      </Box>
      <Box>
        <Logo href="/" height="200px">
          <img height="100%" src="/logo.svg" alt="Pixby" />
        </Logo>
      </Box>
      <Box>
        <Button.Base
          size="small"
          bg="#5fb48e"
          color="#f5f5f5"
          borderRadius="7px"
          onClick={logOutClickHandler}
        >
          Logout
        </Button.Base>
      </Box>
    </Flex>
  );
};

export default DashboardHeader;
