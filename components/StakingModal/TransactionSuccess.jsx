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

const TransactionSuccess = ({ isOpen, onClose, receipt, days }) => {
  const { accountId } = useStoreState((state) => state.account);

  return (
    <Modal isOpen={isOpen}>
      <Card
        bg="#f5f5f5"
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
          <Heading textAlign="center" as="h1" fontSize={[2, 3]} px={[3, 0]}>
            Transaction successfull! 🚀
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
              Congratulations! You have successfully staked{" "}
              <strong>
                {" "}
                {receipt &&
                  fixedNumber(
                    Web3.utils.fromWei(
                      receipt.events.Transfer[0].returnValues._value.toString(),
                      "ether"
                    )
                  )}{" "}
                PIXBY{" "}
              </strong>{" "}
              for <strong> {days} days. </strong> Your daily passive income is{" "}
              <strong>
                {" "}
                {receipt &&
                  fixedNumber(
                    Web3.utils.fromWei(
                      receipt.events.PassiveDeposit.returnValues._dailyIncome.toString(),
                      "ether"
                    )
                  )}{" "}
                PIXBY{" "}
              </strong>
              . Your first reward can be claimed after 24 hours!
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
                    color="#f5f5f5"
                    my={[1, 0]}
                    fontSize={2}
                    lineHeight={"1.25em"}
                  >
                    Transaction details
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
                        <Icon color={"black"} name="OpenInNew" size={"1em"} />
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
                  Daily income
                </Text>
                <Flex
                  alignItems={["baseline", "flex-end"]}
                  flexDirection={["row", "column"]}
                >
                  <Text color="mid-gray" fontSize={1}>
                    {receipt &&
                      fixedNumber(
                        Web3.utils.fromWei(
                          receipt.events.PassiveDeposit.returnValues
                            ._dailyIncome,
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
                <Text
                  textAlign={["center", "left"]}
                  color="near-black"
                  fontWeight="bold"
                >
                  Amount locked
                </Text>
                <Flex
                  alignItems={["baseline", "flex-end"]}
                  flexDirection={["row", "column"]}
                >
                  <Text color="mid-gray" fontSize={1}>
                    {receipt && fixedNumber(
                      Web3.utils.fromWei(
                        receipt.events.Transfer[0].returnValues._value.toString(),
                        "ether"
                      ))}{" "}
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
                      color={"primary"}
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
              bg="#f5f5f5"
              color="#F7CBC7"
              boxShadow="5px 5px 9px #f2f1f5, 
              -5px -5px 9px #fcfbff"
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
  days: PropTypes.string,
};

export default TransactionSuccess;
