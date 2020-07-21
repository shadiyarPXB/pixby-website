import React from "react";
import { Box, Button, Heading, Text, Form, Input, Checkbox, Link } from "rimble-ui";
import Container from "../../../components/Container/Container";
import Row from "../../../components/Row/Row";
import Column from "../../../components/Column/Column";

const Call2ActionArea = () => {
  return (
    <Box backgroundColor="#000" py={["75px"]} as="section">
      <Container>
        <Box
          backgroundColor="#F7F6FA"
          boxShadow="20px 20px 60px #040404, 
          -20px -20px 60px #060606"
          borderRadius="30px"
          p={["60px"]}
        >
          <Row>
            <Column width={[1, 1, 1, 2 / 3]} pr={[0, 0, "30px"]}>
              <Heading as="h3" color="#0d0d0d" fontSize={["30px"]} mb="10px">
                Become a part of our fast growing community!
              </Heading>
              <Text lineHeight="30px">
                Never missout a single update! Join
                our community now!
              </Text>
            </Column>
            <Column width={[1, 1, 1, 1 / 3]} display="flex" alignItems="center">
              <Button.Base
                as="a"
                href="https://discord.gg/GWpyFB9"
                target="_blank"
                bg="#7433ff"
                color="#F7F6FA"
                boxShadow="20px 20px 60px #d9d9d9, 
                -20px -20px 60px #ffffff"
                mt={["10px", 0]}
                width="100%"
                borderRadius="23px"
              >
                Go to Discord
              </Button.Base>
            </Column>
          </Row>
        </Box>
      </Container>
    </Box>
  );
};

export default Call2ActionArea;
