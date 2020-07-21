import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Box, Heading, Text, Button } from "rimble-ui";
import Container from "../../../components/Container/Container";
import Row from "../../../components/Row/Row";
import Column from "../../../components/Column/Column";
import YoutubeModal from "../../../components/YoutubeModal/YoutubeModal";

// Single video box style
const VideoBox = styled(Box)`
  background-image: url(${(props) => props.backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center bottom;
  position: relative;
  z-index: 1;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 7px 8px rgba(50, 50, 93, 0.33);

  ::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: ${(props) => props.theme.colors.blacks[4]};
    z-index: -1;
    transition: 0.3s;
  }

  :hover ::after {
    background-color: ${(props) => props.theme.colors.blacks[6]};
  }

  button {
    cursor: pointer;
    font-size: 30px;
    border-radius: 50%;
    height: 80px;
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    transition: 0.3s;
    outline: none;
    i {
      padding-left: 10px;
    }
  }
  :hover button {
    background-color: red;
    color: #fff;
  }
`;

const FeatureVideoContentArea = (props) => {
  return (
    <Box as="section" py="30px" backgroundColor="#fcfcfc">
      <Container>
        {/* Area Heading */}
        <Heading
          as="h2"
          color="black"
          fontSize={["20px", "20px", "36px"]}
          textAlign="center"
          mb={["10px", "10px", "20px", "30px"]}
        >
          PIXBY Tutorials
        </Heading>
        <Row mx={["-15px", "-15px", "-40px"]}>
          <Column width={[1, 1, 1 / 3]} px={["15px", "15px", "40px"]}>
            {/* Single video box */}
            <YoutubeModal videoId="pVE92TNDwUk">
              <VideoBox
                mt="30px"
                height={["250px", "250px", "150px", "180px", "250px"]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                backgroundColor="white"
                borderRadius="10px"
                backgroundImage={require("./step1.jpeg")}
                backgroundColor="whites.7"
              >
                <button>
                  <i className="fa fa-play"></i>
                </button>
              </VideoBox>
            </YoutubeModal>
            <Text textAlign="center" mt="15px" fontSize="20px">
              Getting Started
            </Text>
          </Column>
          <Column width={[1, 1, 1 / 3]} px={["15px", "15px", "40px"]}>
            {/* Single video box */}
            <YoutubeModal videoId="Ez6ODtGpL1w">
              <VideoBox
                mt="30px"
                height={["250px", "250px", "150px", "180px", "250px"]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                backgroundColor="white"
                borderRadius="10px"
                backgroundImage={require("./step2.jpeg")}
              >
                <button>
                  <i className="fa fa-play"></i>
                </button>
              </VideoBox>
            </YoutubeModal>
            <Text textAlign="center" mt="15px" fontSize="20px">
              Getting Started
            </Text>
          </Column>
          <Column width={[1, 1, 1 / 3]} px={["15px", "15px", "40px"]}>
            {/* Single video box */}
            <YoutubeModal videoId="Jdf6BzzfOqM">
              <VideoBox
                mt="30px"
                height={["250px", "250px", "150px", "180px", "250px"]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                backgroundColor="white"
                borderRadius="10px"
                backgroundImage={require("./step3.jpeg")}
              >
                <button>
                  <i className="fa fa-play"></i>
                </button>
              </VideoBox>
            </YoutubeModal>
            <Text textAlign="center" mt="15px" fontSize="20px">
              Getting Started
            </Text>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};

FeatureVideoContentArea.propTypes = {};

export default FeatureVideoContentArea;
