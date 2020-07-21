import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Web3 from "web3";

import { useStoreState } from "easy-peasy";

import {
  Modal,
  Loader,
  Tooltip,
  Card,
  Box,
  Flex,
  Icon,
  Text,
  Link,
  Heading,
  Button,
} from "rimble-ui";

import stringShortener from "../../utils/stringShortener";

const progressTime = 100; // in seconds
const intervalDelay = 200; //in  milliseconds
const initiateProgress = 5; // out of 100
const TransactionStarted = ({
  isOpen,
  onClose,
  dailyIncome,
  passiveIncome,
  done,
  hash,
}) => {
  const { accountId } = useStoreState((state) => state.account);
  const [progress, setProgress] = useState(initiateProgress);

  useEffect(() => {
    let intervalId;
    const totalSteps = (progressTime * 1000) / intervalDelay;
    const incrementPerSteps = (100 - (initiateProgress + 10)) / totalSteps;

    if (dailyIncome && passiveIncome) {
      intervalId = setInterval(() => {
        setProgress((progress) => {
          if (progress >= 90) {
            clearInterval(intervalId);
            return progress;
          }
          return progress + incrementPerSteps;
        });
      }, intervalDelay);
    } else {
      setProgress(initiateProgress);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [dailyIncome, passiveIncome]);

  useEffect(() => {
    if (done) {
      setProgress(100);
    }
  }, [done]);
  return (
    <Modal isOpen={isOpen}>
      <Card
        borderRadius={25}
        p={0}
        style={{ overflowY: "auto" }}
        width={"550px"}
        maxWidth="100%"
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          borderBottom={1}
          borderColor="near-white"
          p={[3, 4]}
          pb={3}
        >
          <Loader aria-label="Processing" color="#F7CBC7" size="24px" />
          <Heading textAlign="center" as="h1" fontSize={[2, 3]} px={[3, 0]}>
            Pending confirmation...
          </Heading>
          <Link onClick={onClose}>
            <Icon
              name="Close"
              color="moon-gray"
              aria-label="Close and cancel connection"
            />
          </Link>
        </Flex>
        <Box p={[3, 4]}>
          <Flex justifyContent={"space-between"} flexDirection={"column"}>
            <Text textAlign="center">
              Nice one! Passive income reward should be in your wallet shortly.
            </Text>
            <Flex
              alignItems={"stretch"}
              flexDirection={"column"}
              borderRadius={2}
              borderColor={"moon-gray"}
              borderWidth={1}
              borderStyle={"solid"}
              overflow={"hidden"}
              my={[3, 4]}
            >
              <Box
                bg="#22FF71"
                width={Math.floor(progress) + "%"}
                px={3}
                py={2}
                style={{ transition: intervalDelay + "ms" }}
              />
              <Flex
                bg="#0d0d0d"
                p={3}
                borderBottom={"1px solid gray"}
                borderColor={"moon-gray"}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDirection={["column", "row"]}
              >
                <Box height={"2em"} width={"2em"} mr={[0, 3]} mb={3}>
                  <Flex
                    bg={"white"}
                    borderRadius={"50%"}
                    height={"3em"}
                    width={"3em"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Text>{Math.floor(progress)}%</Text>
                  </Flex>
                </Box>

                <Box>
                  <Text
                    textAlign={["center", "left"]}
                    color="white"
                    ml={[0, 3]}
                    my={[1, 0]}
                    fontSize={3}
                    lineHeight={"1.25em"}
                  >
                    Sending...
                  </Text>
                </Box>

                <Box>
                  <Flex flexDirection="row" alignItems="center">
                    <Link
                      color="white"
                      ml={[0, 3]}
                      fontSize={1}
                      lineHeight={"1.25em"}
                      href={"https://etherscan.io/tx/" + hash}
                    >
                      Etherscan
                      <Icon
                        ml={1}
                        color="white"
                        name="Launch"
                        size="14px"
                      />
                    </Link>
                  </Flex>
                </Box>
              </Flex>

              <Flex
                justifyContent={"space-between"}
                bg="white"
                p={[2, 3]}
                borderBottom={"1px solid gray"}
                borderColor={"moon-gray"}
                flexDirection={["column", "row"]}
              >
                <Text
                  textAlign={["center", "left"]}
                  color="near-black"
                  fontWeight="bold"
                >
                  Your account
                </Text>
                <Link
                  href={"https://etherscan.io/address/" + accountId}
                  target={"_blank"}
                >
                  <Tooltip message={accountId}>
                    <Flex
                      justifyContent={["center", "auto"]}
                      alignItems={"center"}
                      flexDirection="row-reverse"
                    >
                      <Text fontWeight="bold">
                        {" "}
                        {stringShortener(accountId)}
                      </Text>
                      <Flex
                        mr={2}
                        p={1}
                        borderRadius={"50%"}
                        bg={"white"}
                        height={"2em"}
                        width={"2em"}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Icon
                          color={"black"}
                          name="Launch"
                          size={"1em"}
                        />
                      </Flex>
                    </Flex>
                  </Tooltip>
                </Link>
              </Flex>

              <Flex
                justifyContent={"space-between"}
                bg="white"
                py={[2, 3]}
                px={3}
                alignItems={"center"}
                borderBottom={"1px solid gray"}
                borderColor={"moon-gray"}
                flexDirection={["column", "row"]}
              >
                <Text
                  textAlign={["center", "left"]}
                  color="near-black"
                  fontWeight="bold"
                >
                  Estimated passive income
                </Text>
                <Flex
                  alignItems={["baseline", "flex-end"]}
                  flexDirection={["row", "column"]}
                >
                  <Text color="mid-gray" fontSize={1}>
                    {dailyIncome && dailyIncome} PIXBY
                  </Text>
                </Flex>
              </Flex>

              <Flex
                justifyContent={"space-between"}
                bg="white"
                py={[2, 3]}
                px={3}
                alignItems={"center"}
                borderBottom={"1px solid gray"}
                borderColor={"moon-gray"}
                flexDirection={["column", "row"]}
              >
                <Flex alignItems={"center"}>
                  <Text
                    textAlign={["center", "left"]}
                    color="near-black"
                    fontWeight="bold"
                  >
                    Gas fee
                  </Text>
                  <Tooltip
                    message="Pays the Ethereum network to process your transaction. Spent even if the transaction fails."
                    position="top"
                  >
                    <Icon
                      ml={1}
                      name={"InfoOutline"}
                      size={"14px"}
                      color={"primary"}
                    />
                  </Tooltip>
                </Flex>

                <Flex
                  alignItems={["baseline", "flex-end"]}
                  flexDirection={["row", "column"]}
                >
                  <Text color="mid-gray" fontSize={1}>
                  {passiveIncome &&
                      Web3.utils.fromWei(passiveIncome.toString(), "Gwei")}{" "} ETH
                  </Text>
                </Flex>
              </Flex>

              <Flex
                justifyContent={"space-between"}
                bg={"white"}
                p={[2, 3]}
                alignItems={"center"}
                flexDirection={["column", "row"]}
              >
                <Text color="near-black" fontWeight="bold">
                  Estimated time
                </Text>
                <Text color={"mid-gray"}>Less than 2 minutes remaining</Text>
              </Flex>
            </Flex>

            <Button.Base bg="#fff"
              color="#F7CBC7"
              boxShadow="6px 6px 12px #d0d0d0, 
              -6px -6px 12px #ffffff"
              borderRadius="15px"
              onClick={onClose}>Close</Button.Base>
          </Flex>
        </Box>
      </Card>
    </Modal>
  );
};

TransactionStarted.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  dailyIncome: PropTypes.number,
  passiveIncome: PropTypes.number,
  done: PropTypes.bool,
};

export default TransactionStarted;
