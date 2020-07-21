import { useStoreState } from "easy-peasy";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import Web3 from "web3";
import {
  Tooltip,
  Modal,
  Card,
  Box,
  Flex,
  Loader,
  Icon,
  Image,
  Link,
  Heading,
  Button,
} from "rimble-ui";
import stringShortener from "../../utils/stringShortener";

const Text = dynamic(
  () => import("rimble-ui").then((components) => components.Text),
  {
    ssr: false,
  }
);

const TransactionSummary = ({
  isOpen,
  onClose,
  amount,
  days,
  passiveIncome,
  makePassiveIncomeInvestmentHandler,
}) => {
  const { accountId } = useStoreState((state) => state.account);

  const metamaskPopupClickHandler = () => {
    makePassiveIncomeInvestmentHandler(
      Web3.utils.toWei(amount, "ether"),
      days * 60
    );
  };

  return (
    <Modal isOpen={isOpen}>
      <Card
        borderRadius={25}
        p={0}
        background="#F7F6FA"
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
          <Image
            src="/logo.svg"
            aria-label="MetaMask extension icon"
            size="24px"
          />
          <Heading textAlign="center" as="h1" fontSize={[2, 3]} px={[3, 0]}>
            Confirm your action in Wallet
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
            <Text fontWeight="600" textAlign="center">
              Double check the details here – this action cannot be reverted.
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
              <Box bg={"#0d0d0d"} px={3} py={2}>
                <Text fontWeight="600" color={"#f5f5f5"}>
                  PIXBY Staking
                </Text>
              </Box>
              <Flex
                p={3}
                borderBottom={"1px solid gray"}
                borderColor={"moon-gray"}
                alignItems={"center"}
                flexDirection={["column", "row"]}
              >
                <Box
                  position={"relative"}
                  height={"2em"}
                  width={"2em"}
                  mr={[0, 3]}
                  mb={[3, 0]}
                >
                  <Box position={"absolute"} top={"0"} left={"0"}>
                    <Loader size={"2em"} color="#ffa305" />
                  </Box>
                </Box>
                <Box>
                  <Text
                    textAlign={["center", "left"]}
                    fontWeight={"600"}
                    fontSize={1}
                    lineHeight={"1.25em"}
                  >
                    Waiting for confirmation...
                  </Text>
                  <Link
                    fontWeight={100}
                    lineHeight={"1.25em"}
                    color={"primary"}
                    onClick={metamaskPopupClickHandler}
                  >
                    Don't see the MetaMask popup?
                  </Link>
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
                  href={`https://etherscan.io/tx/${accountId}`}
                  target={"blank"}
                >
                  <Tooltip message={accountId}>
                    <Flex
                      justifyContent={["center", "auto"]}
                      alignItems={"center"}
                      flexDirection="row-reverse"
                    >
                      <Text fontWeight="bold">
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
                      ></Flex>
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
                  Amount to lock
                </Text>
                <Flex
                  alignItems={["center", "flex-end"]}
                  flexDirection={["row", "column"]}
                >
                  <Text
                    mr={[2, 0]}
                    color="near-black"
                    fontWeight="bold"
                    lineHeight={"1em"}
                  >
                    {amount} PIXBY
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
                    Estimated Transaction fee
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
                  alignItems={["center", "flex-end"]}
                  flexDirection={["row", "column"]}
                >
                  {/* <Text
                    mr={[2, 0]}
                    color="near-black"
                    fontWeight="bold"
                    lineHeight={"1em"}
                  >
                    $0.42
                  </Text> */}
                  <Text color="mid-gray" fontSize={1}>
                    {passiveIncome &&
                      Web3.utils.fromWei(passiveIncome.toString(), "gwei")}{" "}
                    ETH
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
                  Estimated confirmation time
                </Text>
                <Text color={"mid-gray"}>Less than 2 minutes</Text>
              </Flex>
            </Flex>
            <Button.Base bg="#fff" color="#F7CBC7" boxShadow="5px 5px 9px #f2f1f5, 
              -5px -5px 9px #fcfbff" onClick={onClose}>Close</Button.Base>
          </Flex>
        </Box>
      </Card>
    </Modal>
  );
};

TransactionSummary.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  amount: PropTypes.string,
  days: PropTypes.string,
  passiveIncome: PropTypes.number,
  makePassiveIncomeInvestmentHandler: PropTypes.func.isRequired,
};

export default TransactionSummary;
