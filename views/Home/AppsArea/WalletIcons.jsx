import React from "react";
import { Box, Heading, Button, Text } from "rimble-ui";
import styled from "styled-components";
import Link from "next/link";
import Container from "../../../components/Container/Container";
import Row from "../../../components/Row/Row";
import Column from "../../../components/Column/Column";

const iconList = [
  {
    href: "/",
    title: "Metamask",
    imgSrc: "/applogos/metamask-fox.svg",
  },
  {
    href: "/",
    title: "WalletConnect",
    imgSrc: "/applogos/walletconnect.svg",
  },
  {
    href: "/",
    title: "MyEtherWallet",
    imgSrc: "/applogos/mew.svg",
  },
  {
    href: "/",
    title: "Trust Wallet",
    imgSrc: "/applogos/trust_platform.svg",
  },
  {
    href: "/",
    title: "Authereum",
    imgSrc: "/applogos/authereum_shield.svg",
  },
];

const IconLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  text-decoration: none;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: box-shadow 0.3s ease-in-out;
    background: #fff;
    border-radius: 50%;
    color: #f7f6fa;
    box-shadow: 7px 7px 44px #0c0c0c, -7px -7px 44px #0e0e0e;
    width: 50%;
    margin-bottom: 15px;
    overflow: hidden;
    img {
      display: block;
      max-width: 100%;
    }
  }
  p {
    color: #fff;
    font-size: 10px;
    font-weight: 600;
    @media (min-width: ${(props) => props.theme.breakpoints[2]}) {
      font-size: 20px;
    }
  }
`;

const WalletIcons = () => {
  return (
    <Box bg="#0d0d0d" as="section">
      <Container>
        <Row py="50px">
          <Column width="100%" textAlign="center">
            <Heading
              as="h2"
              textAlign="center"
              color="#F7CBC7"
              mb={["10px", "10px", "8px", "20px"]}
            >
             Supported for wallets for storing and staking PIXBY
            </Heading>
            <Text color="#CECECE">Store you PIXBY safely here</Text>
          </Column>
        </Row>
        <Row py="50px">
          {iconList.map(({ href, title, imgSrc }, index) => (
            <Column width={[1 / 3, 1 / 4, 1 / 5]} key={index + title}>
              <IconLink href={href}>
                <div>
                  <img src={imgSrc} alt={title} />
                </div>
                <p>{title}</p>
              </IconLink>
            </Column>
          ))}
        </Row>
      </Container>
    </Box>
  );
};

WalletIcons.propTypes = {};

export default WalletIcons;
