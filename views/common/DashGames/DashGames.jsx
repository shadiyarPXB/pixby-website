import React from "react";
import { Box, Heading, Button, Text } from "rimble-ui";
import styled from "styled-components";
import Link from "next/link";
import Container from "../../../components/Container/Container";
import Row from "../../../components/Row/Row";
import Column from "../../../components/Column/Column";

// Bank Box style
const BankBox = styled(Box)`
  box-shadow: 6px 6px 12px #0c0c0c, 
  -6px -6px 12px #0e0e0e;
  word-break: break-all;
  background-image: url(${require("./dashboard.png")});
  background-size: cover;
  background-position: center;
`;

const PixbyBankArea = () => {
  return (
    <Box as="section">
      <Container>
        <Row py="50px">
          <Column width="100%" textAlign="center">
            <Heading as="h2" color="#f5f5f5" fontWeight="700">
            <strong>#PIXBYStakingGame</strong>
            </Heading>
            <BankBox
              mt="30px"
              mb="30px"
              height={["200px", "250px", "300px", "400px", "500px"]}
              borderRadius="35px"
            />
            <Text color="#f5f5f5">Coming soon.</Text>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};

PixbyBankArea.propTypes = {};

export default PixbyBankArea;
