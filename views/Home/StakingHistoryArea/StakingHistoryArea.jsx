import { useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import styled from "styled-components";
import { Box, Heading, Text } from "rimble-ui";
import Web3 from "web3";

import Container from "../../../components/Container/Container";
import Row from "../../../components/Row/Row";
import Column from "../../../components/Column/Column";
import Loader from "../../../components/Loader/Loader";
import fixedNumber from "../../../utils/fixedNumber";
import stringShortener from "../../../utils/stringShortener";

// Report Box container style
const ReportBoxContainer = styled(Container)`
  margin-bottom: 50px;
  @media only screen and (min-width: ${(props) => props.theme.breakpoints[2]}) {
    margin-bottom: 0;
    transform: translateY(-50%);
    margin-top: 100px;
  }
`;

// Report box style
const ReportBox = styled(Box)`
  box-shadow: 0 -5px 15px rgba(50, 50, 93, 0.2);
  height: 100%;
`;

// History table style
const HistoryTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  overflow-x: hidden;
  th,
  td {
    text-align: center;
    padding: 20px 8px;
    font-size: 12px;
    @media screen and (min-width: ${(props) => props.theme.breakpoints[2]}) {
      font-size: 16px;
    }
  }

  tr:nth-child(even) {
    background-color: #2a2a2a;
  }

  th {
    color: #b7514f;
  }
  td,
  td a {
    color: #737375;
  }
  a {
    text-decoration: none;
  }
`;

const StakingHistoryArea = () => {
  const fetchHistory = useStoreActions(
    (actions) => actions.history.fetchHistory
  );

  const { history, loading, error } = useStoreState((state) => state.history);

  useEffect(() => {
    fetchHistory("staking");
  }, []);

  return (
    <Box
      as="section"
      backgroundColor="#000"
      pt={["50px", "50px", "50px", 0]}
      pb={["50px"]}
      // mt={["250px", "250px", "150px", 0]}
    >
      <ReportBoxContainer>
        <Row my="-10px">
          <Column width={[1, 1, 1 / 2, 1 / 4]} my="10px">
            <ReportBox
              backgroundColor="white"
              p="10px 20px"
              pb="20px"
              borderRadius="20px"
            >
              <Heading as="h3" fontWeight="200" mb="5px">
                --
              </Heading>
              <Text
                fontWeight="300"
                fontFamily="roboto"
                fontSize={["20px", "20px", "25px"]}
              >
                -
              </Text>
            </ReportBox>
          </Column>
          <Column width={[1, 1, 1 / 2, 1 / 4]} my="10px">
            <ReportBox
              backgroundColor="white"
              p="10px 20px"
              pb="20px"
              borderRadius="20px"
            >
              <Heading as="h3" fontWeight="200" mb="5px">
                --
              </Heading>
              <Text
                fontWeight="300"
                fontFamily="roboto"
                fontSize={["20px", "20px", "25px"]}
              >
                --
              </Text>
            </ReportBox>
          </Column>
          <Column width={[1, 1, 1 / 2, 1 / 4]} my="10px">
            <ReportBox
              backgroundColor="white"
              p="10px 20px"
              pb="20px"
              borderRadius="20px"
            >
              <Heading as="h3" fontWeight="200" mb="5px">
                --
              </Heading>
              <Text
                fontWeight="300"
                fontFamily="roboto"
                fontSize={["20px", "20px", "25px"]}
              >
                --
              </Text>
            </ReportBox>
          </Column>
          <Column width={[1, 1, 1 / 2, 1 / 4]} my="10px">
            <ReportBox
              backgroundColor="white"
              p="10px 20px"
              pb="20px"
              borderRadius="20px"
            >
              <Heading as="h3" fontWeight="200" mb="5px">
                --
              </Heading>
              <Text
                fontWeight="300"
                fontFamily="roboto"
                fontSize={["20px", "20px", "25px"]}
              >
                --
              </Text>
            </ReportBox>
          </Column>
        </Row>
      </ReportBoxContainer>
      <Container>
        <Row
          justifyContent="center"
          // mt={["-150px", "-150px", 0]}
        >
          <Column width={[1, 1, 3 / 4]} textAlign="center">
            <Heading color="#f5f5f5" mt="10px" mb="60px">
              Cold Staking History
            </Heading>
          </Column>
        </Row>
        <Row justifyContent="center">
          <Column width={[1, 1, 3 / 4]}>
            {error && <p>Some thing went wrong. Please try again</p>}
            <Loader loading={loading} />
            {!error && !loading && (
              <div style={{ overflowX: "auto" }}>
                <HistoryTable>
                  <thead>
                    <tr>
                      <th>Block Number</th>
                      <th>Transaction Txn</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...history]
                      .reverse()
                      .map(
                        (
                          { blockNumber, transactionHash, returnValues },
                          index
                        ) =>
                          10 > index ? (
                            <tr key={transactionHash}>
                              <td>{blockNumber}</td>
                              <td>
                                <a
                                  target="blank"
                                  href={`https://etherscan.io/tx/${transactionHash}`}
                                >
                                  {stringShortener(transactionHash)}
                                </a>
                              </td>
                              <td>
                                {fixedNumber(
                                  Web3.utils.fromWei(returnValues[1], "ether")
                                )}{" "}
                                PIXBY
                              </td>
                            </tr>
                          ) : null
                      )}
                  </tbody>
                </HistoryTable>
              </div>
            )}
          </Column>
        </Row>
      </Container>
    </Box>
  );
};

export default StakingHistoryArea;
