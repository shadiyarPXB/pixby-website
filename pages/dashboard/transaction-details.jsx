import styled from "styled-components";
import { Box, Heading, Text } from "rimble-ui";
import Link from "next/link";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import Container from "../../components/Container/Container";
import Row from "../../components/Row/Row";
import Column from "../../components/Column/Column";

const TransactionDetailsBox = styled(Box)`
  box-shadow: 0 0 20px rgba(50, 50, 93, 0.2);
  word-break: break-all;
  strong {
    display: block;
    @media only screen and (min-width: ${(props) =>
        props.theme.breakpoints[3]}) {
      margin-left: 15px;
      display: inline-block;
    }
  }
`;

const TransactionDetails = () => {
  return (
    <DashboardLayout>
      <Box as="section" py={["30px", "30px", "10px", "150px"]}>
        <Container>
          <Row>
            <Column width={1}>
              <Heading as="h3" mb="30px" fontSize={["30px", "30px", "40px"]}>
                Transaction Details
              </Heading>
              <TransactionDetailsBox p="30px" borderRadius="10px">
                <Text lineHeight="2" fontSize="20px">
                  Txn hash:{" "}
                  <strong>
                    0x247a57e557ea6f10d718a7bf68de6a99683548e1076a220d71355e48636a2959
                  </strong>
                </Text>
                <Text lineHeight="2" fontSize="20px">
                  Account:
                  <strong>0x3332769d8Bd3d6291C1d7A08C353B3f459ab7D8a</strong>
                </Text>
                <Text lineHeight="2" fontSize="20px">
                  Investment date:
                  <strong>March 28, 2019 08:55:17 AM UTC</strong>
                </Text>
                <Text lineHeight="2" fontSize="20px">
                  Total invested:
                  <strong>1,000,000 PIXBY (342.054$)</strong>
                </Text>
                <Text lineHeight="2" fontSize="20px">
                  Interest earned:
                  <strong>202.000032 PXIBY</strong>
                </Text>
                <Text lineHeight="2" fontSize="20px">
                  Daily Passive Income:
                  <strong>101.00232 PIXBY</strong>
                </Text>
                <Text lineHeight="2" fontSize="20px">
                  Days Staked:
                  <strong>2</strong>
                </Text>
                <Text lineHeight="2" fontSize="20px">
                  Event Status:
                  <Text
                    display="inline-block"
                    ml="15px"
                    textTransform="uppercase"
                    backgroundColor="green"
                    p="5px 10px"
                    borderRadius="10px"
                    color="white"
                    fontWeight="700"
                  >
                    TRUE
                  </Text>
                </Text>
                <Box textAlign="center" color="black" mt="20px">
                  <Link href="/">
                    <a style={{ color: "#000" }}>VIEW MORE ON ETHERSCAN</a>
                  </Link>
                </Box>
              </TransactionDetailsBox>
            </Column>
          </Row>
        </Container>
      </Box>
    </DashboardLayout>
  );
};

TransactionDetails.propTypes = {};

export default TransactionDetails;
