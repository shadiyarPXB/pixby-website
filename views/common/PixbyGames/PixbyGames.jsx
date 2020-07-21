import React from "react";
import { Box, Heading, Button, Text } from "rimble-ui";
import styled from "styled-components";
import Link from "next/link";
import Container from "../../../components/Container/Container";
import Row from "../../../components/Row/Row";
import Column from "../../../components/Column/Column";

// Bank Box style
const BankBox = styled(Box)`
  box-shadow: 26px 26px 49px #ebeaee, -26px -26px 49px #ffffff;
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
            <Heading as="h2" color="#0d0d0d" fontWeight="700">
             <strong>#PIXBYStakingGame</strong>
            </Heading>
            <BankBox
              mt="30px"
              mb="30px"
              height={["200px", "250px", "300px", "400px", "500px"]}
              borderRadius="35px"
            />
            <Text>Coming soon.</Text>
            <Link href="/dashboard">
              <Button.Base
                as="a"
                color="#F7CBC7"
                bg="#fff"
                boxShadow="8px 8px 16px #e1e1e1, 
                -8px -8px 16px #ffffff"
                mt="30px"
                borderRadius="10px"
                border="none"
                borderRadius="15px"
                fontSize="15px"
                style={{ textTransform: "uppercase" }}
              >
                Dashboard
              </Button.Base>
            </Link>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};

PixbyBankArea.propTypes = {};

export default PixbyBankArea;
