import { useEffect } from "react";
import PropTypes from "prop-types";
import { useStoreActions, useStoreState } from "easy-peasy";
import styled from "styled-components";
import { Box, Button, Heading, Text, Image } from "rimble-ui";
import Container from "../../../components/Container/Container";
import Row from "../../../components/Row/Row";
import Column from "../../../components/Column/Column";

// Single work box style
const WorkBox = styled(Box)`
  position: relative;

  ${(props) =>
    props.step
      ? `
  ::after {
    content: "";

    width: 50%;
    height: 35px;
    position: absolute;
    right: -35%;
    top: 20px;
    background-repeat: no-repeat;
    background-position: center center;
    display:none;
    background-image: url(${require("./arrowLine.png")});
    transform:${props.step == "reverse" ? `rotate(180deg)` : `rotate(0)`};
    @media (min-width: ${props.theme.breakpoints[1]}) {
      display: block;
    }
  }
  
  `
      : ""}
`;

// Chart box style
const ChartBox = styled(Box)`
  box-shadow: 0 0px 20px rgba(50, 50, 93, 0.2);
  word-break: break-all;
  z-index: 9999;
  position: relative;
  /* transform: translateY(-50%); */
`;

const StakingGameTut = () => {
  return (
    <Box
      as="section"
      pb={["50px", "50px", "100px"]}
      pt={["300px", "300px", "100px", "150px"]}
      position="relative"
    >
    
      {/* Work process area  */}
      <Container>
        <Row justifyContent="center">
          {/* Area Heading  */}
          <Column
            fontSize="16px"
            textAlign="center"
            width="auto"
            maxWidth={["100%", "90%"]}
          >
          </Column>
        </Row>
        <Row mx={["-15px", "-15px", "-20px", "-40px", "-50px"]}>
          {/* Single work item */}
          <Column
            width={[1, 1, 1 / 3]}
            px={["15px", "15px", "20px", "40px", "50px"]}
          >
            <WorkBox textAlign="center" step="non-reverse">
              <Image src={require("./vault.svg")} width="45%" mb="35px" />
              <Heading
                as="h4"
                mb={["15px", "15px", "25px"]}
                fontSize={["18px", "18px", "20px"]}
              >
                Lock your tokens 
              </Heading>
              <Text fontSize={["14px", "14px", "16px"]}>
              Authorize your wallet and head over to 'Passive Investment' in the dashboard. Set the amount and locking period; click submit and confirm transaction in your wallet. 
              </Text>
            </WorkBox>
          </Column>
          {/* Single work item */}
          <Column
            width={[1, 1, 1 / 3]}
            px={["15px", "15px", "20px", "40px", "50px"]}
            mt={["20px", "20px", "0"]}
          >
            <WorkBox textAlign="center" step="reverse">
              <Image src={require("./release.svg")} width="45%" mb="35px" />
              <Heading
                as="h4"
                mb={["15px", "15px", "25px"]}
                fontSize={["18px", "18px", "20px"]}
              >
                Release rewards
              </Heading>
              <Text fontSize={["14px", "14px", "16px"]}>
              It takes 48 hours for tokens to mature. After that, you can head over to transaction history in the dashboard and start releasing your rewards daily or upon the end of the locking period.
              </Text>
            </WorkBox>
          </Column>
          {/* Single work item */}
          <Column
            width={[1, 1, 1 / 3]}
            px={["15px", "15px", "20px", "40px", "50px"]}
            mt={["20px", "20px", "0"]}
          >
            <WorkBox textAlign="center">
              <Image src={require("./unlock.svg")} width="45%" mb="35px" />
              <Heading
                as="h4"
                mb={["15px", "15px", "25px"]}
                fontSize={["18px", "18px", "20px"]}
              >
                Unlock your initial investment
              </Heading>
              <Text fontSize={["14px", "14px", "16px"]}>
              After the locking period has ended, head over to 'Transaction history' click 'Claim' and confirm the transaction in your wallet. After transaction confirmation, you will receive both your initial investment and staking rewards in case if anything is left unclaimed.
              </Text>
            </WorkBox>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};

StakingGameTut.propTypes = {};

export default StakingGameTut;
