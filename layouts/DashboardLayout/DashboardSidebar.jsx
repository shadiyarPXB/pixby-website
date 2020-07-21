import { useEffect, useRef } from "react";
import { Flex, Box, Button } from "rimble-ui";
import NavLink from "../../components/NavLink/NavLink";
import styled from "styled-components";

const dashboardLinks = [
  {
    href: "/dashboard",
    title: " Dashboard",
    icon: "rocket",
  },
  {
    href: "/dashboard/staking",
    title: " Passive investment",
    icon: "line-chart",
  },
  {
    href: "/dashboard/transaction-history",
    title: " Transaction History",
    icon: "list-ul",
  },
  {
    href: "https://app.uniswap.org/#/swap?inputCurrency=0xb53e08b97724126bda6d237b94f766c0b81c90fe&outputCurrency=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    target: "_blank",
    title: " Trade on Uniswap",
    icon: "exchange",
  },
];

const NavA = styled.a`
  display: block;
  color: #fff;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  padding: 15px 30px;
  padding-right: 0;
  display: flex;
  width: 100%;
  transition: all 0.2s;
  cursor: pointer;
  position: relative;
  text-decoration: none;
  transition: 0.3s;
  i {
    margin-right: 5px;
  }
  :hover,
  &.active {
    color: #3e3eff;
  }
  &.active::before {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    content: "";
    width: 5px;
    background-color: #3e3eff;
  }
`;
const DashboardSidebar = () => {
  const sidebarRef = useRef();
  const onMenuClose = () => {
    const sidebar = document.getElementById("sidebar");

    if (sidebar) {
      return sidebar.classList.remove("active");
    }
  };

  const outSideClickHandler = (e) => {
    const menu = document.getElementById("menu");

    if (!sidebarRef?.current?.contains(e.target) && !menu.contains(e.target)) {
      onMenuClose();
    }
  };

  useEffect(() => {
    document.addEventListener("click", outSideClickHandler);

    return () => document.removeEventListener("click", outSideClickHandler);
  }, []);
  return (
    <Box
      ref={sidebarRef}
      height="100%"
      bg="#121212"
      p={["50px 20px 50px 10px", "15px 10px 15px 0"]}
    >
      <Flex mb="20px" display={["flex", "none"]}>
        <Button.Text
          ml="auto"
          fontWeight="300"
          onClick={onMenuClose}
          fontSize="26px"
        >
          <i className="fa fa-close" style={{ marginRight: "3px" }}></i>
        </Button.Text>
      </Flex>
      <nav>
        {dashboardLinks.map(({ href, title, icon }, index) => (
          <NavLink key={index} href={href}>
            <NavA href={href}>
              {icon && <i className={`fa fa-${icon}`}></i>} {title}
            </NavA>
          </NavLink>
        ))}
      </nav>
    </Box>
  );
};

export default DashboardSidebar;
