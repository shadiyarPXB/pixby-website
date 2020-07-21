import {
  Modal,
  Card,
  Box,
  Flex,
  Icon,
  Text,
  Link,
  Heading,
  Button,
} from "rimble-ui";
import PropTypes from "prop-types";

const TransactionFailed = ({ isOpen, onClose, error }) => {
  return (
    <Modal isOpen={isOpen}>
      <Card p={0} borderRadius={1} mb={4} width={"550px"} maxWidth="100%">
        <Box height="4px" bg="danger" borderRadius={["1rem 1rem 0 0"]} />
        <Flex
          justifyContent="space-between"
          alignItems="center"
          borderBottom={1}
          borderColor="near-white"
          p={[3, 4]}
          pb={3}
        >
          <Icon name="Warning" color="danger" aria-label="Warning" />
          <Heading textAlign="center" as="h1" fontSize={[2, 3]} px={[3, 0]}>
            Transaction Failed!
          </Heading>
          <Link>
            <Icon
              name="Close"
              color="moon-gray"
              aria-label="Close and cancel connection"
              onClick={onClose}
            />
          </Link>
        </Flex>
        <Text p={[3, 4]}>
          Transaction reverted with error! Please try again with a higher gas fee. <br></br> Gas used for this transaction: { error &&
                      Web3.utils.fromWei(error?.receipt?.gasUsed.toString(), "gwei")}{" "}
        </Text>
        <Flex
          p={[3, 4]}
          borderTop={1}
          borderColor="near-white"
          justifyContent="flex-end"
          flexDirection={["column", "row"]}
          alignItems="center"
        >
          <a
            href={
              "https://etherscan.io/tx/ " +
              error?.receipt?.transactionHash
            }
            target="_blank"
          >
            <Button.Outline mr={[0, 3]} mb={[2, 0]} width={["100%", "auto"]}>
              View on Etherscan
            </Button.Outline>
          </a>
        </Flex>
      </Card>
    </Modal>
  );
};

TransactionFailed.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  error: PropTypes.object,
};

export default TransactionFailed;
