import { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useRouter } from "next/router";
import Link from "next/link";
import Web3 from "web3";
import { useForm } from "react-hook-form";
import Head from "next/head";
import {
  Flex,
  Box,
  Heading,
  Form,
  Button,
  Radio,
  Text,
  Modal,
  Card,
} from "rimble-ui";
import styled from "styled-components";
import CustomInput from "../../../components/CustomInput/CustomInput";
import fixedNumber from "../../../utils/fixedNumber";
import TransactionSummary from "../../../components/StakingModal/TransactionSummary";
import TransactionStarted from "../../../components/StakingModal/TransactionStarted";
import TransactionSuccess from "../../../components/StakingModal/TransactionSuccess";
import TransactionFailed from "../../../components/StakingModal/TransactionFailed";
import {
  getMakeEstimateGas,
  makePassiveIncomeInvestment,
} from "../../../api/web3";
import toast from "../../../utils/toast";

const StakingWrapper = styled(Box)`
  position: relative;
  min-height: 100vh;
  ::after {
    position: absolute;
    content: "";
    left: 0;
    top: 0;
    height: 100%;
    width: 50%;
    background-image: url(${require("./staking.png")});
    background-size: cover;
    background-position: center;
    display: none;

    @media only screen and (min-width: ${(props) =>
        props.theme.breakpoints[2]}) {
      display: block;
    }
  }
`;

const FormBoxWrapper = styled(Box)`
  position: relative;
  background: #fff;
  box-shadow:  12px 12px 24px #d5d5d5, 
  -12px -12px 24px #ffffff;
`;

const MenuTriggerButton = styled.span`
  margin-left: auto;
  font-size: 26px;
  cursor: pointer;
  transition: 0.3s;
  :hover {
    opacity: 0.5;
  }
`;

const MenuWrapper = styled(Box)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: 0.2s;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  z-index: ${(props) => (props.isOpen ? 999 : -1)};
`;
const Menu = styled.div`
  a {
    display: block;
    padding: 15px 10px;
    text-decoration: none;
    font-size: 20px;
    font-weight: 600;
    color: ${(props) => props.theme.colors.black};
    position: relative;
    padding-left: 50px;
    transition: 0.3s;
  }
  a:hover {
    background-color: ${(props) => props.theme.colors["near-white"]};
  }
  a i {
    position: absolute;
    left: 10px;
    height: 100%;
    width: 35px;
  }
`;

const menuLinks = [
  { title: "Dashboard", href: "/dashboard", icon: "fa-home" },
  { title: "Transaction History", href: "/dashboard/transaction-history", icon: "fa-history" },
  { title: "Etherscan", href: "https://etherscan.io/token/0xB53e08B97724126Bda6d237B94F766c0b81C90fE", icon: "fa-file-o" },
  { title: "Get help from community", href: "https://discord.gg/GWpyFB9", icon: "fa-comments-o" },
];

const Staking = () => {
  const router = useRouter();

  const { accountId, balance, isAuthenticated } = useStoreState(
    (state) => state.account
  );
  const fetchBalance = useStoreActions(
    (actions) => actions.account.fetchBalance
  );

  const getBalance = async () => {
    if (accountId) {
      await fetchBalance();
    }
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const [transactionSummaryOpen, setTransactionSummaryOpen] = useState(false);
  const [dailyIncome, setDailyIncome] = useState(null);
  const [passiveIncome, setPassiveIncome] = useState(null);
  const [hash, setHash] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState(null);

  // Initiate hook form
  const {
    register,
    handleSubmit,
    errors,
    setValue,
    getValues,
    triggerValidation,
  } = useForm({
    mode: ["onChange", "onBlur"],
  });

  const makePassiveIncomeInvestmentHandler = async (amount, days) => {
    makePassiveIncomeInvestment(amount, days, accountId)
      .on("transactionHash", (hash) => {
        setTransactionSummaryOpen(false);
        setHash(hash);
        toast.success("Transaction started");
      })
      .on("receipt", (receipt) => {
        setHash("");
        setReceipt(receipt);

      })
      .on("error", (error) => {
        setTransactionSummaryOpen(false);
        setHash("");
        setReceipt(null);
        if (error?.code === 4001) {
          toast.error("User rejected transaction");
          return false;
        }
        setError(error);
      });
  };

  const onSubmitHandler = async (data, e) => {
    try {
      const amount = Web3.utils.toWei(data.amount, "ether");
      const days = data.days * 86400;
      const passiveIncomeData = await getMakeEstimateGas(
        amount,
        days,
        accountId
      );

      setPassiveIncome(passiveIncomeData);
      setTransactionSummaryOpen(true);
      makePassiveIncomeInvestmentHandler(amount, days);
    } catch (error) {
      console.log(error);
      toast.error("Opps something went wrong...");
    }
  };

  const setMaxValueHandler = () => {
    if (balance) {
      setValue("amount", Web3.utils.fromWei(balance, "ether"));
    }
  };

  const changeWeekHandler = (type) => (e) => {
    e.preventDefault();
    const currentValue = isNaN(parseInt(getValues("days")))
      ? 0
      : parseInt(getValues("days"));

    if (type === "add") {
      setValue("days", currentValue + 1);
    }
    if (type === "subtract" && currentValue > 1) {
      setValue("days", currentValue - 1);
    }
    triggerValidation("days");
  };

  useEffect(() => {
    const { onConnect } = require("../../../api/web3Modal");
    if (!isAuthenticated && onConnect) {
      onConnect(router);
    }
  }, []);

  useEffect(() => {
    getBalance();
  }, [accountId]);
  return (
    <StakingWrapper as="section">
      <Head>
        <title>Make Passive Investment</title>
      </Head>
      <Flex
        width={[1, 1, 1, 1 / 2]}
        justifyContent="center"
        alignItems="center"
        background="#F7F6FA"
        ml="auto"
        minHeight="100vh"
        p="30px"
      >
        <FormBoxWrapper
          width={["100%", "80%", "60%"]}
          p="30px"
          borderRadius="15px"
          position="relative"
          maxWidth="700px"
        >
          <Flex mb="50px">
            <Heading as="h4">Lock & Stake PIXBY</Heading>
            <MenuTriggerButton onClick={() => setMenuOpen(true)}>
              <i className="fa fa-bars"></i>
            </MenuTriggerButton>
          </Flex>
          <Form onSubmit={handleSubmit(onSubmitHandler)}>
            <CustomInput
              id="amount"
              labelText="Amount"
              labelOptionalText={
                balance
                  ? ` Balance: ${fixedNumber(
                      Web3.utils.fromWei(balance, "ether")
                    )} PIXBY`
                  : "Loading..."
              }
              inputProps={{
                name: "amount",
                ref: register({
                  required: "Amount is required.",

                  validate: {
                    minMax: (v) => {
                      const value = parseInt(v, 10);
                      return value < 35000 || value > 2500000 || isNaN(value)
                        ? "Please enter amount between 35,000 - 2,500,000."
                        : true;
                    },
                  },
                }),
              }}
              error={!!errors?.amount}
              helperText={errors?.amount?.message}
              inputInnerBtn={
                <Button.Base
                  bg="#0d0d0d"
                  color="#F7CBC7"
                  position="absolute"
                  boxShadow="5px 5px 9px #f2f1f5, 
              -5px -5px 9px #fcfbff"
                  right="16px"
                  borderRadius="10%"
                  top="50%"
                  style={{ transform: "translateY(-50%)" }}
                  height="auto"
                  p="5px 10px"
                  minWidth="auto"
                  onClick={setMaxValueHandler}
                >
                  Max
                </Button.Base>
              }
            />

            <CustomInput
              id="LockUp"
              labelText="Lock up period (days)"
              inputProps={{
                name: "days",
                ref: register({
                  required: "Days is required",
                  validate: {
                    minMax: (v) => {
                      const value = parseInt(v, 10);
                      return value < 3 || value > 365 || isNaN(value)
                        ? "Number of days should be greater than 2 or less than 365."
                        : true;
                    },
                  },
                }),
                defaultValue: 3,
              }}
              error={!!errors?.days}
              helperText={errors?.days?.message}
              inputInnerBtn={
                <Flex position="absolute" right="16px" top="50%">
                  <Button
                    mainColor="#0d0d0d"
                    contrastColor="#F7CBC7"
                    style={{ transform: "translateY(-50%)" }}
                    minWidth="auto"
                    height="25px"
                    width="25px"
                    lineHeight="25px"
                    fontSize="20px"
                    borderRadius="50%"
                    p="0"
                    mr="10px"
                    textAlign="center"
                    onClick={changeWeekHandler("add")}
                  >
                    +
                  </Button>
                  <Button
                    mainColor="#0d0d0d"
                    contrastColor="#F7CBC7"
                    style={{ transform: "translateY(-50%)" }}
                    minWidth="auto"
                    height="25px"
                    width="25px"
                    lineHeight="25px"
                    fontSize="20px"
                    borderRadius="50%"
                    p="0"
                    textAlign="center"
                    onClick={changeWeekHandler("subtract")}
                  >
                    -
                  </Button>
                </Flex>
              }
            />

            <Button.Base
              bg="#0d0d0d"
              type="submit"
              width="100%"
              mt="30px"
              borderRadius="25px"
              color="#fff"
              boxShadow="5px 5px 9px #f2f1f5, 
              -5px -5px 9px #fcfbff"
            >
              SUBMIT
            </Button.Base>
          </Form>

          <MenuWrapper
            p="30px"
            backgroundColor="white"
            borderRadius="10px"
            isOpen={menuOpen}
          >
            <Flex mb="50px">
              <Heading as="h4">Menu</Heading>
              <MenuTriggerButton onClick={() => setMenuOpen(false)}>
                <i className="fa fa-close"></i>
              </MenuTriggerButton>
            </Flex>
            <Menu>
              {menuLinks.map((link, index) => (
                <Link href={link.href} key={index} passHref={true}>
                  <a>
                    <i className={`fa ${link.icon}`}></i> {link.title}
                  </a>
                </Link>
              ))}
            </Menu>
          </MenuWrapper>
        </FormBoxWrapper>
      </Flex>

      {transactionSummaryOpen && (
        <TransactionSummary
          isOpen={transactionSummaryOpen}
          onClose={() => setTransactionSummaryOpen(false)}
          makePassiveIncomeInvestmentHandler={
            makePassiveIncomeInvestmentHandler
          }
          amount={getValues().amount}
          days={getValues().days}
          passiveIncome={passiveIncome}
        />
      )}

      {!!hash && (
        <TransactionStarted
          isOpen={!!hash}
          onClose={() => setHash("")}
          amount={getValues().amount}
          days={getValues().days}
          passiveIncome={passiveIncome}
          done={!!receipt}
          hash={hash}
        />
      )}

      {!!receipt && (
        <TransactionSuccess
          isOpen={!!receipt}
          onClose={() => setReceipt(null)}
          dailyIncome={dailyIncome}
          passiveIncome={passiveIncome}
          receipt={receipt}
          days={getValues().days}
        />
      )}

      {!!error && (
        <TransactionFailed
          isOpen={!!error}
          onClose={() => setError(null)}
          error={error}
        />
      )}
    </StakingWrapper>
  );
};

Staking.propTypes = {};

export default Staking;
