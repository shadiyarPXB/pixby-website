import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Box, Heading } from "rimble-ui";
import NavLink from "../../components/NavLink/NavLink";

const NavBarWrapper = styled(Box)`
  overflow-y: hidden;
  transition: 0.3s;
  transform: ${(props) => (props.open ? "translateX(0)" : " translateX(101%)")};
  box-shadow: -2px 0 8px ${(props) => props.theme.shadows[1]};
  font-size: 18px;
  font-weight: 600;
`;

const Nav = styled.nav`
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  li {
    margin-bottom: 15px;
  }

  @media (min-width: 62em) {
  }
  a {
    display: inline-block;
    text-decoration: none;
    position: relative;
    color: ${(props) => props.theme.colors["near-black"]};
    transition: 0.3s;
  }
  a:hover {
    opacity: 0.5;
  }
  a.active {
    color: #696969;
  }
  a.active::before {
    position: absolute;
    top: 50%;
    left: -20px;
    height: 10px;
    width: 10px;
    content: "";
    background-color: ${(props) => props.theme.colors["blue"]};
    border-radius: 50%;
    transform: translateY(-50%);
  }
`;

const NavBarBottom = styled.div`
  margin-top: auto;

  .social-links {
    margin-bottom: 6px;
  }
  .social-links a {
    display: inline-block;
    color: ${(props) => props.theme.colors["near-black"]};
    transition: 0.3s;
  }
  .social-links a:hover {
    opacity: 0.4;
  }
  .social-links a:not(:last-child) {
    margin-right: 24px;
  }
  p {
    font-size: 16px;
  }
`;

const NavBarClose = styled.span`
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 25px;
  color: ${(props) => props.theme.colors["near-black"]};
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

const socialLinks = [
  { href: "https://www.twitter.com/pixbytoken", icon: "fa-twitter" },
  { href: "https://www.medium.com/@pixbytoken", icon: "fa-medium" },
  { href: "https://t.me/pixbytoken", icon: "fa-telegram" },
];
const navLinks = [
  { href: "/", title: "Home" },
  { href: "/dashboard", title: "Dashboard" },
  { href: "https://www.coingecko.com/en/coins/pixby", title: "Coingecko" },
];

const MainNavBar = ({ open, setOpen }) => {
  return (
    <NavBarWrapper
      backgroundColor="#fff"
      height="100%"
      width={["100%", "250px"]}
      p={["30px 40px", "12px 15px", "20px 30px"]}
      position="fixed"
      top="0"
      right="0"
      zIndex="99999999"
      display="flex"
      flexDirection="column"
      open={open}
    >
      <NavBarClose onClick={() => setOpen(false)}>
        <i className="fa fa-close"></i>
      </NavBarClose>
      <Heading as={"h3"} mb="20px">
        Menu
      </Heading>
      <Nav>
        <ul>
          {navLinks.map(({ href, title }) => (
            <li key={title}>
              <NavLink href={href}>
                <a>{title}</a>
              </NavLink>
            </li>
          ))}
        </ul>
      </Nav>
      <NavBarBottom>
        <div className="social-links">
          {socialLinks.map(({ href, icon }) => (
            <a href={href} key={icon}>
              <i className={`fa ${icon}`}></i>
            </a>
          ))}
        </div>
        <p>Copyrights 2020 @PIXBY</p>
      </NavBarBottom>
    </NavBarWrapper>
  );
};

MainNavBar.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default MainNavBar;
