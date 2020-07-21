import { useEffect } from "react";
import PropTypes from "prop-types";
import { useStoreActions, useStoreState } from "easy-peasy";
import styled from "styled-components";
import { Box, Button, Heading, Text, Image } from "rimble-ui";
import Container from "../../../components/Container/Container";
import Row from "../../../components/Row/Row";
import Column from "../../../components/Column/Column";
import Loader from "../../../components/Loader/Loader";

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

const WorkProcessArea = (props) => {
  const fetchHistory = useStoreActions(
    (actions) => actions.marketData.fetchMarketData
  );

  const { data, loading, error } = useStoreState((state) => state.marketData);

  useEffect(() => {
    fetchHistory();
  }, []);
  return (
    <Box
      as="section"
      pb={["50px", "50px", "100px"]}
      pt={["300px", "300px", "100px", "150px"]}
      position="relative"
    >
      {/* Chart box  */}
      <Box
        position="absolute"
        left="0"
        right="0"
        top="0"
        style={{ transform: "translateY(-50%)" }}
      >
        <Container>
          <ChartBox
            py="20px"
            borderRadius="20px"
            backgroundColor="white"
            textAlign="center"
          >
            <Loader loading={loading} color="#06ff76" />
            {error && <p>Some thing went wrong. Please try again</p>}
            {!error && !loading && (
              <Row>
                <Column width={[1, 1, 1 / 3]} textAlign="center" color="black">
                  <Heading as="h4" fontWeight="400" color="black">
                    Price
                  </Heading>
                  <Text
                    color={
                      data.currentPrice.priceChange < 0 ? "red" : "#06ff76 "
                    }
                    fontSize={["15px", "20px", "15px", "15px", "35px"]}
                    fontWeight="200"
                    fontFamily="roboto"
                  >
                    <i
                      className={`fa ${
                        data.currentPrice.priceChange < 0
                          ? "fa-caret-down"
                          : "fa-caret-up"
                      }`}
                      style={{ fontSize: "60%" }}
                    ></i>
                    {data.currentPrice.usd}$
                  </Text>
                  {data.currentPrice.priceChange}$
                </Column>
                <Column
                  width={[1, 1, 1 / 3]}
                  textAlign="center"
                  color="gray"
                  mt={["30px", "30px", 0]}
                >
                  <Heading as="h4" fontWeight="400" color="black">
                    Volume
                  </Heading>
                  <Text
                    color="black"
                    fontSize={["15px", "20px", "15px", "15px", "35px"]}
                    fontWeight="200"
                    fontFamily="roboto"
                  >
                    {data.totalVolume.usd}$
                  </Text>
                  {data.totalVolume.btc}BTC
                </Column>
                <Column
                  width={[1, 1, 1 / 3]}
                  textAlign="center"
                  color="black"
                  mt={["30px", "30px", 0]}
                >
                  <Heading as="h4" fontWeight="400" color="black">
                    MarketCap
                  </Heading>
                  <Text
                    color="black"
                    fontSize={["15px", "20px", "15px", "15px", "35px"]}
                    fontWeight="200"
                    fontWeight="200"
                    fontFamily="roboto"
                  >
                    {data.marketCap.circulating} PIXBY
                  </Text>
                  {(data.marketCap.totalSupply / 1000000).toFixed(1)}MM PIXBY
                </Column>
              </Row>
            )}
          </ChartBox>
        </Container>
      </Box>
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
            <Heading as="h2" mb="10px">
              How does it work?
            </Heading>
            Our process is designed to give you the smoothest experience.
          </Column>
        </Row>
        <Row mt="100px" mx={["-15px", "-15px", "-20px", "-40px", "-50px"]}>
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

WorkProcessArea.propTypes = {};

export default WorkProcessArea;
