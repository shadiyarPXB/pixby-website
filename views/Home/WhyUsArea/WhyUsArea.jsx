import React from "react";
import { Box, Heading, Text, Image } from "rimble-ui";
import styled from "styled-components";
import Container from "../../../components/Container/Container";
import Row from "../../../components/Row/Row";
import Column from "../../../components/Column/Column";

const FeatureBox = styled(Box)`
  position: relative;
  text-align: center;
  ::after {
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%) translateX(50%);
    width: 1px;
    height: 80%;
    background-color: #2a2a2a;
    display: none;
  }
  @media only screen and (min-width: ${(props) => props.theme.breakpoints[1]}) {
    ::after {
      display: block;
    }

    :nth-child(2n + 0)::after {
      display: none;
    }
  }
  @media only screen and (min-width: ${(props) => props.theme.breakpoints[2]}) {
    :nth-child(2n + 0)::after {
      display: block;
    }

    :nth-child(3n + 0)::after {
      display: none;
    }
  }

  i {
    font-size: 50px;
    color: #624cf0;
    transition: 0.3s;
  }
  :hover i,
  :hover h3 {
    color: #fff;
  }
  div {
    transition: 0.3s;
  }
  :hover div {
    color: #fff;
  }
`;

const WhyUsArea = () => {
  return (
    <Box
      as="section"
      backgroundColor="#0d0d0d"
      pt={["50px", "50px", "100px"]}
      pb={["270px", "270px", "177px"]}
    >
      <Container>
        <Row>
          <Column
            width={[1, 1, 1, 2 / 5]}
            display={["flex", "flex", "block"]}
            justifyContent="center"
          >
            {/* Logo Image */}
            <Box
              backgroundColor="#0d0d0d"
              boxShadow="6px 6px 12px #0c0c0c, 
              -6px -6px 12px #0e0e0e"
              borderRadius="40px"
              p={["10px", "10px", "40px"]}
              width={[1]}
              mb={["30px", "30px", "30px", 0]}
            >
              <Image src="./logo_trnsprnt.svg" />
            </Box>
          </Column>
          <Column width={[1, 1, 1, 3 / 5]}>
            {/* Right side contents */}
            <Box py="30px" pl={[0, 0, 0, "50px"]}>
              <Heading
                color="near-white"
                fontSize={["20px", "20px", "30px", "50px", "60px"]}
                as="h3"
                mb="15px"
              >
                Why PIXBY?
              </Heading>
              <Text color="gray" fontSize="18px">
              PIXBY is a token with unique abilities seen nowhere else before. Users can earn passive income by staking a minimal amount of 35,000 and a maximum of 2,500,000 PIXBY for each stake. Users have full control over their funds and staking period, not limited to the number of active stakes. Soon enough, stakeholders will also benefit from profit-sharing thanks to Escrow protocol. 
              </Text>
              <Heading
                color="near-white"
                fontSize={["20px", "20px", "30px", "50px", "60px"]}
                as="h3"
                mb="15px"
                mt="50px"
              >
                Mission
              </Heading>
              <Text color="gray" fontSize="18px">
                
              Besides being a community-driven incentivized project, one of our goals is to create easy-to-use open-source instruments that will power dozens of new freelance markets around the world.
              </Text>
            </Box>
          </Column>
        </Row>
        <Row
          pt={["10px", "10px", "80px"]}
          mx={["-15px", "-15px", "15px", "-85px", "-95px"]}
        >
          <FeatureBox
            width={[1, 1, 1 / 2, 1 / 3]}
            px={["30px", "30px", "30px", "70px", "80px"]}
            py={["15px", "30px", "30px", "40px", "60px"]}
          >
            <Image src={require("./chat.svg")} width="25%" mb="5px" />
            <Heading
              color="near-white"
              fontSize="18px"
              as="h3"
              mt="30px"
              mb="15px"
            >
              24/7 Community Support
            </Heading>
            <Text color="gray">
            Want help from the community or team? Join our Discord server to get prompt guidance!
            </Text>
          </FeatureBox>
          <FeatureBox
            width={[1, 1, 1 / 2, 1 / 3]}
            px={["30px", "30px", "30px", "70px", "80px"]}
            py={["15px", "30px", "30px", "40px", "60px"]}
          >
            <Image src={require("./rewards.svg")} width="25%" mb="5px" />
            <Heading
              color="near-white"
              fontSize="18px"
              as="h3"
              mt="30px"
              mb="15px"
            >
              Predicted daily rewards
            </Heading>
            <Text color="gray">
            Staking PIXBY is fun and easy! It only takes a minute to start, and you always know what your reward will be because a smart-contract backs it.
            </Text>
          </FeatureBox>
          <FeatureBox
            width={[1, 1, 1 / 2, 1 / 3]}
            px={["30px", "30px", "30px", "70px", "80px"]}
            py={["15px", "30px", "30px", "40px", "60px"]}
          >
            <Image src={require("./decentralized.svg")} width="25%" mb="5px" />
            <Heading
              color="near-white"
              fontSize="18px"
              as="h3"
              mt="30px"
              mb="15px"
            >
              Decentralized
            </Heading>
            <Text color="gray">
            PIXBY is a decentralized asset, and that means that no government or authority has control over it.
            </Text>
          </FeatureBox>
          <FeatureBox
            width={[1, 1, 1 / 2, 1 / 3]}
            px={["30px", "30px", "30px", "70px", "80px"]}
            py={["15px", "30px", "30px", "40px", "60px"]}
          >
            <Image src={require("./ethereum.svg")} width="25%" mb="5px" />
            <Heading
              color="near-white"
              fontSize="18px"
              as="h3"
              mt="30px"
              mb="15px"
            >
              Operates on Ethereum network
            </Heading>
            <Text color="gray">
            Written in solidity by the best developers. PIXBY operates on the Ethereum network and uses the ERC20 standard, giving token holders the flexibility to store, trade, and transfer tokens.
            </Text>
          </FeatureBox>
          <FeatureBox
            width={[1, 1, 1 / 2, 1 / 3]}
            px={["30px", "30px", "30px", "70px", "80px"]}
            py={["15px", "30px", "30px", "40px", "60px"]}
          >
            <Image src={require("./noncustodial.svg")} width="25%" mb="5px" />
            <Heading
              color="near-white"
              fontSize="18px"
              as="h3"
              mt="30px"
              mb="15px"
            >
             Non-custodial
            </Heading>
            <Text color="gray">
            All users staked collateral are locked in the smart contract without PIXBY developers having any direct or indirect access to those funds. No one can steal your collateral from you.
            </Text>
          </FeatureBox>
          <FeatureBox
            width={[1, 1, 1 / 2, 1 / 3]}
            px={["30px", "30px", "30px", "70px", "80px"]}
            py={["15px", "30px", "30px", "40px", "60px"]}
          >
            <Image src={require("./23.svg")} width="25%" mb="5px" />
            <Heading
              color="near-white"
              fontSize="18px"
              as="h3"
              mt="30px"
              mb="15px"
            >
              23% Annual Percentage Yield
            </Heading>
            <Text color="gray">
            Earn 23% of ROI at no effort! There's no need for any costly equipment, either running a node. Smart-contract does everything for you!
            </Text>
          </FeatureBox>
        </Row>
      </Container>
    </Box>
  );
};

export default WhyUsArea;
