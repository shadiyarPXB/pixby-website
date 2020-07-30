import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import styled from "styled-components";
import Container from "../../components/Container/Container";
import Row from "../../components/Row/Row";
import Column from "../../components/Column/Column";
import { Heading } from "rimble-ui";

const Footer = styled.footer`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;

  /* border-top: 1px solid ${(props) => props.theme.colors["light-gray"]}; */
  background-repeat: no-repeat;
  background-position: center 50px;
  background-color: #fcfcfc;
  text-align:center;
  @media only screen and (min-width: ${(props) => props.theme.breakpoints[2]}) {
 
    text-align: inherit;
  }
`;
const FooterTop = styled.div`
  padding: 30px 0;
`;

const FooterLogo = styled.div`
  margin-bottom: 0;

  a.logo {
    display: inline-flex;
    text-transform: uppercase;
    align-items: center;
    font-size: ${(props) => props.theme.fontSizes[5]}px;
    font-weight: 700;
    color: ${(props) => props.theme.colors.black};

    text-decoration: none;
    @media only screen and (min-width: ${(props) =>
        props.theme.breakpoints[2]}) {
    }
  }

  img {
    height: 50px;
    display: inline-block;
    margin-right: 10px;
  }
`;

const Links = styled.div`
  /* text-align: center; */
  margin: 0 -10px;
  margin-top: 15px;

  a {
    color: ${(props) => props.theme.colors.black};
    display: inline-block;
    font-size: 16px;
    transition: 0.3s;
    margin: 0 7px;
    @media only screen and (min-width: ${(props) =>
        props.theme.breakpoints[2]}) {
      font-size: 22px;
      margin: 0 10px;
    }
    :hover {
      color: ${(props) => props.theme.colors["mid-gray"]};
    }
  }
`;
const SocialLinks = styled.div`
  margin: 0 -10px;
  margin-top: 15px;
  @media only screen and (min-width: ${(props) => props.theme.breakpoints[2]}) {
    margin-top: 0;
    text-align: right;
  }

  a {
    color: ${(props) => props.theme.colors.black};
    display: inline-block;
    font-size: 16px;
    transition: 0.3s;
    margin: 0 7px;
    @media only screen and (min-width: ${(props) =>
        props.theme.breakpoints[2]}) {
      font-size: 22px;
      margin: 0 10px;
    }
    :hover {
      color: ${(props) => props.theme.colors["mid-gray"]};
    }
  }
`;

const FooterBottom = styled.div`
  /* text-align: center; */
  font-size: 12px;
  border-top: 1px solid ${(props) => props.theme.colors["light-gray"]};
  padding: 7px 0;
`;

const MainFooter = forwardRef((props, ref) => {
  return (
    <Footer ref={ref}>
      <FooterTop>
        <Container>
          <Row alignItems="center">
            {/* <Column width={[1, 1, 1 / 5]}>
              <FooterLogo>
                <a href="/" className="logo">
                  <img src="/logo.svg" alt="Pixby" />
                </a>
              </FooterLogo>
            </Column> */}
            <Column width={[1, 1, 1 / 2]}>
              <Links>
                <a href="https://www.coingecko.com/en/coins/pixby">Coingecko</a>
                <a href="https://github.com/PIXBY-Project/Assets/blob/master/Whitepaper/whitepaper.pdf"</a>
                <a href="https://t.me/pixbytoken">Telegram</a>
              </Links>
            </Column>
            <Column width={[1, 1, 1 / 2]}>
              <SocialLinks>
                <a href="https://twitter.com/pixbytoken">
                  <i className="fa fa-twitter"></i>
                </a>
                <a href="https://medium.com/@pixbytoken">
                  <i className="fa fa-medium"></i>
                </a>
                <a href="https://t.me/pixbytoken">
                  <i className="fa fa-telegram"></i>
                </a>
              </SocialLinks>
            </Column>
          </Row>
        </Container>
      </FooterTop>
      <FooterBottom>
        <Container>
          <p>&copy; {new Date().getFullYear()} PIXBY</p>
        </Container>
      </FooterBottom>
    </Footer>
  );
});

MainFooter.propTypes = {};

export default MainFooter;
