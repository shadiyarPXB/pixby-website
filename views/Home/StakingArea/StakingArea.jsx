import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Container from "../../../components/Container/Container";
import Row from "../../../components/Row/Row";
import Column from "../../../components/Column/Column";
import leftSideImage from "./left-side.svg";
import rightSideImage from "./right-side.svg";

import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Link as RimbleLink,
} from "rimble-ui";

// Single box style
const StakingBox = styled(Box)`
  background-repeat: no-repeat;
  background-position: ${({ left }) => (left ? "center right" : "center left")};
  background-size: auto 50%;
  cursor: pointer;
  overflow: hidden;

  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    background-image: ${({ left }) =>
      left ? `url(${leftSideImage})` : `url(${rightSideImage})`};
  }
`;

// Single box content style
const StakingBoxContent = styled(Box)`
  transition: 0.3s;
  transform: translateY(${({ isActive }) => (isActive ? "0" : "50%")});
  .content {
    opacity: ${({ isActive }) => (isActive ? "1" : "0")};
    visibility: ${({ isActive }) => (isActive ? "visible" : "hidden")};
  }
`;

const StakingArea = () => {
  const [activeBox, setActiveBox] = useState("left");

  return (
    <Box as="section" pt={["50px", "50px"]} pb={["70px"]}>
      <Container>
        <Flex flexWrap="wrap">
          {/* Left side box */}
          <StakingBox
            width={[1, `calc(50% - 5px)`]}
            bg="#0d0d0d"
            borderRadius="20px"
            left
            mr={[0, "5px"]}
            mb={["10px", 0]}
            py={["100px", "100px", "110px", "180px"]}
            pl={["65px", "65px", "75px", "85px"]}
            p={["20px"]}
            onMouseEnter={() => setActiveBox("left")}
          >
            {/* Left side content */}
            <StakingBoxContent isActive={activeBox === "left"}>
              <Heading
                fontSize={["22px", "26px", "26px", "30px"]}
                fontWeight={600}
                color="white"
                mb={["25px"]}
              >
                Cold Staking
              </Heading>
              <Box className="content">
                <Text
                  fontSize={["14px", "14px", "16px"]}
                  fontWeight={400}
                  color="whites.11"
                >
                   Earn 23% of annual passive income and get<br /> daily rewards for locking your pixby tokens.<br /> Take control of duration and income by<br /> choosing how much and how long to stake. {""}
                </Text>
              </Box>
            </StakingBoxContent>
          </StakingBox>
          {/* Right side box */}
          <StakingBox
            width={[1, `calc(50% - 5px)`]}
            bg="#0d0d0d"
            borderRadius="20px"
            mr={[0, "5px"]}
            py={["100px", "100px", "110px", "180px"]}
            pr={["65px", "65px", "75px", "85px"]}
            p={["20px"]}
            onMouseEnter={() => setActiveBox("right")}
            isActive={activeBox === "right"}
          >
            {/* Right side content */}
            <StakingBoxContent
              textAlign={["left", "right"]}
              isActive={activeBox === "right"}
            >
              <Heading
                fontSize={["22px", "26px", "26px", "30px"]}
                fontWeight={600}
                color="white"
                mb={["25px"]}
              >
                Request Payment
              </Heading>
              <Box className="content">
                <Text
                  fontSize={["14px", "14px", "16px"]}
                  fontWeight={400}
                  color="whites.11"
                >
                  Pay for goods and services worry free!<br /> We're developing an advanced Escrow protocol<br /> which allows smooth transactions for both<br /> buyers and sellers. 
                </Text>

                <RimbleLink
                  color="whites.11"
                  hoverColor="whites.11"
                  mt="20px"
                  display="inline-block"
                >
                  *Coming Soon
                </RimbleLink>
              </Box>
            </StakingBoxContent>
          </StakingBox>
        </Flex>
      </Container>
    </Box>
  );
};

export default StakingArea;
