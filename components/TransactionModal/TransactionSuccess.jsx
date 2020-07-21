import Web3 from "web3";
import PropTypes from "prop-types";
import { useStoreState } from "easy-peasy";
import {
  Modal,
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
import fixedNumber from "../../utils/fixedNumber";
import stringShortener from "../../utils/stringShortener";

const TransactionSuccess = ({ isOpen, onClose, receipt }) => {
  const { accountId } = useStoreState((state) => state.account);

  return (
    <Modal isOpen={isOpen}>
      <Card
        borderRadius="10px"
        bg="#fff"
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
          <Heading textAlign="center" as="h1" fontSize={[2, 3]} px={[3, 0]}>
            Transaction confirmed!
          </Heading>
          <Link onClick={onClose}>
            <Icon
              name="Close"
              color="#F7CBC7"
              aria-label="Close and cancel connection"
            />
          </Link>
        </Flex>
        <Box p={[3, 4]}>
          <Flex justifyContent={"space-between"} flexDirection={"column"}>
            <Text textAlign="center">
              You have successfully released<strong>{" "}
              {receipt &&
                fixedNumber(
                  Web3.utils.fromWei(
                    receipt.events.PassiveSpent.returnValues._amout2,
                    "ether"
                  )
                )}{" "}</strong>
              PIXBY!🎉
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
              <Flex
                bg="#0d0d0d"
                p={3}
                borderBottom={"1px solid gray"}
                borderColor={"moon-gray"}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDirection={["column", "row"]}
              >
                <Box>
                  <Text
                    textAlign={["center", "left"]}
                    color="near-white"
                    my={[1, 0]}
                    fontSize={2}
                    lineHeight={"1.25em"}
                  >
                    Summurry
                  </Text>
                </Box>

                <Box>
                  <Flex flexDirection="row" alignItems="center">
                    <Link
                      color="near-white"
                      ml={[0, 3]}
                      fontSize={1}
                      lineHeight={"1.25em"}
                      href={
                        "https://etherscan.io/tx/" + receipt?.transactionHash
                      }
                    >
                      Etherscan
                      <Icon
                        ml={1}
                        color="near-white"
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
                  href={"https://rinkeby.etherscan.io/address/" + accountId}
                  target={"_blank"}
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
                        bg={"primary-extra-light"}
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
                  color="black"
                  fontWeight="bold"
                >
                  Amount released
                </Text>
                <Flex
                  alignItems={["baseline", "flex-end"]}
                  flexDirection={["row", "column"]}
                >
                  <Text color="mid-gray" fontWeight="bold" fontSize={1}>
                    {receipt &&
                      fixedNumber(
                        Web3.utils.fromWei(
                          receipt.events.PassiveSpent.returnValues._amout2,
                          "ether"
                        )
                      )}{" "}
                    PIXBY
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
                    Gas used
                  </Text>
                  <Tooltip
                    message="Pays the Ethereum network to process your transaction. Spent even if the transaction fails."
                    position="top"
                  >
                    <Icon
                      ml={1}
                      name={"InfoOutline"}
                      size={"14px"}
                      color={"black"}
                    />
                  </Tooltip>
                </Flex>

                <Flex
                  alignItems={["baseline", "flex-end"]}
                  flexDirection={["row", "column"]}
                >
                  <Text color="mid-gray" fontSize={1}>
                    {receipt.cumulativeGasUsed &&
                      Web3.utils.fromWei(
                        receipt.cumulativeGasUsed.toString(),
                        "gwei"
                      )}{" "}
                    ETH
                  </Text>
                </Flex>
              </Flex>
            </Flex>

            <Button.Base
              bg="#fff"
              color="#F7CBC7"
              boxShadow="6px 6px 12px #d0d0d0, 
              -6px -6px 12px #ffffff"
              borderRadius="15px"
              onClick={onClose}
            >
              Close
            </Button.Base>
          </Flex>
        </Box>
      </Card>
    </Modal>
  );
};

TransactionSuccess.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  receipt: PropTypes.object,
};

export default TransactionSuccess;
