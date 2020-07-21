import React from "react";
import { Box, Heading, Button, Text } from "rimble-ui";
import styled from "styled-components";
import Link from "next/link";
import Container from "../../../components/Container/Container";
import Row from "../../../components/Row/Row";
import Column from "../../../components/Column/Column";

const ExchangeList = [
  {
    href: "https://bamboorelay.com/trade/PIXBY-WETH",
    title: "Bamboo Relay",
    imgSrc: "/ExchnageIcons/bamboo-relay.svg",
  },
  {
    href: "https://app.uniswap.org/#/swap?inputCurrency=0xb53e08b97724126bda6d237b94f766c0b81c90fe&outputCurrency=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    title: "UniSwap",
    imgSrc: "/ExchnageIcons/uniswap.svg",
  },
  {
    href: "https://www.catex.io/trading/PIXBY/CATT",
    title: "Cat.ex",
    imgSrc: "/ExchnageIcons/catex.svg",
  },
];

const ExchangeLink = styled.a`
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
    border-radius: 10%;
    color: #F7F6FA;
    box-shadow: 7px 7px 44px #f0f0f0, 
    -7px -7px 44px #ffffff;
    width: 50%;
    margin-bottom: 15px;
    overflow: hidden;
    img {
      display: block;
      max-width: 100%;
    }
  }
  p {
    color: #0d0d0d;
    font-size: 10px;
    font-weight: 600;
    @media (min-width: ${(props) => props.theme.breakpoints[2]}) {
      font-size: 20px;
    }
  }
`;

const ExchangeIcons = () => {
  return (
    <Box bg="#fff" as="section">
      <Container>
        <Row py="50px" justifyContent="center">
          <Column width="100%" textAlign="center">
            <Heading
              as="h2"
              textAlign="center"
              color="#0d0d0d"
              mb={["10px", "10px", "8px", "15px"]}
            >
              Exchanges
            </Heading>
          </Column>
        </Row>
        <Row py="50px">
          {ExchangeList.map(({ href, title, imgSrc }) => (
            <Column width={[1 / 3, 1 / 4, 1 / 5]}>
              <ExchangeLink href={href}>
                <div>
                  <img src={imgSrc} alt={title} />
                </div>
                <p>{title}</p>
              </ExchangeLink>
            </Column>
          ))}
        </Row>
      </Container>
    </Box>
  );
};

ExchangeIcons.propTypes = {};

export default ExchangeIcons;
