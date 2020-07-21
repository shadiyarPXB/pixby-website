import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Web3 from "web3";
import {
  Heading,
  Text,
  Button,
  MetaMaskButton,
  Flex,
  Box,
  Blockie,
  Image,
} from "rimble-ui";
import { useStoreActions, useStoreState } from "easy-peasy";
import styled from "styled-components";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import Row from "../../components/Row/Row";
import Column from "../../components/Column/Column";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import Loader from "../../components/Loader/Loader";
import fixedNumber from "../../utils/fixedNumber";
import DashGames from "../../views/common/DashGames/DashGames";
import toast from "../../utils/toast";
const EthAddress = dynamic(
  () => import("rimble-ui").then((components) => components.EthAddress),
  {
    ssr: false,
  }
);

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  li {
    padding: 6px 0px;
    position: relative;
    ::before {
      position: absolute;
      content: "";
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      background-color: #6851ff;
    }
    a {
      color: #6851ff;
    }
  }
`;
const RefreshButton = styled.i`
  display: inline-block;
  font-size: 65% !important;
  margin-left: 20px;
  cursor: pointer;
`;

const Dashboard = () => {
  const { accountId, balance } = useStoreState((state) => state.account);
  const fetchBalance = useStoreActions(
    (actions) => actions.account.fetchBalance
  );

  const [balanceLoading, setBalanceLoading] = useState(true);

  const getBalance = async () => {
    if (accountId) {
      setBalanceLoading(true);
      await fetchBalance();
      setBalanceLoading(false);
    }
  };

  const addToMetaMaskClickHandler = async (e) => {
    e.preventDefault();

    const tokenAddress = "0xB53e08B97724126Bda6d237B94F766c0b81C90fE";
    const tokenSymbol = "PIXBY";
    const tokenDecimals = 18;
    const tokenImage =
      "https://raw.githubusercontent.com/PIXBY-Project/assets/master/logo.png";
    if (typeof window === "undefined") return;
    if (typeof window.ethereum === "undefined") {
      toast.error(
        "Looks like you need a Dapp browser to get started.Consider installing MetaMask!"
      );
    }

    try {
      const wasAdded = await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
          },
        },
      });

      if (wasAdded) {
        toast.success("Thanks for your interest!");
      } else {
        toast.error("Your loss!");
      }
    } catch (error) {
      toast.error("Oops something went wrong...");
    }
  };

  useEffect(() => {
    getBalance();
  }, [accountId]);

  return (
    <DashboardLayout>
      <Row>
        <Column width={[1, 1, 1, 3 / 5]}>
          <DashboardCard>
            <Heading
              mb="15px"
              as="h2"
              color="#f5f5f5"
              fontSize={["22px", "28px", "30px"]}
              fontWeight="600"
            >
              Hello again! Welcome to PIXBY Dashboard
            </Heading>
            <Text fontWeight="500" color="#f5f5f5">
              Welcome! to PIXBY!👋 Start by staking your PIXBY!🚀
            </Text>
            <Link href="/dashboard/staking">
              <Button.Base
                bg="#F7CBC7"
                boxShadow="10px 10px 20px #0c0c0c, 
                -10px -10px 20px #0e0e0e"
                borderRadius={10}
                size="small"
                color="#0d0d0d"
                mt="20px"
                width="30%"
                fontSize="15px"
                // boxShadow=" 5px 5px 10px #f0f0f0,
                // -5px -5px 10px #ffffff"
                as="a"
              >
                Stake PIXBY
              </Button.Base>
            </Link>
          </DashboardCard>
          <DashboardCard>
            <Heading
              mb="15px"
              as="h2"
              color="#f5f5f5"
              className="heading-bar"
              fontSize={["22px", "28px", "30px"]}
            >
              Account
            </Heading>
            <Text mb="10px" color="#f5f5f5">
              Connected as:
            </Text>
            <EthAddress maxWidth="90%" address={accountId} />
            <Text mt="15px" color="#f5f5f5">
              Available Balance:
            </Text>
            <Text mt="5px" fontSize={["20px", "26px", "30px"]} color="#f5f5f5">
              {balanceLoading ? (
                <Loader
                  loading={true}
                  minHeight={40}
                  size={40}
                  center={false}
                  color="#f5f5f5"
                />
              ) : (
                <>
                  {balance && fixedNumber(Web3.utils.fromWei(balance, "ether"))}{" "}
                  PIXBY
                  <RefreshButton
                    onClick={getBalance}
                    className="fa fa-refresh"
                    aria-hidden="true"
                  />
                </>
              )}
            </Text>
            <Link href="/dashboard/transaction-history">
              <Button.Base
                bg="#F7CBC7"
                boxShadow="10px 10px 20px #0c0c0c, 
                -10px -10px 20px #0e0e0e"
                borderRadius={10}
                size="small"
                color="#0d0d0d"
                mt="20px"
                width="30%"
                fontSize="15px"
              >
                VIEW HISTORY
              </Button.Base>
            </Link>
          </DashboardCard>
        </Column>
        <Column width={[1, 1, 1, 2 / 5]} mt={["15px", "15px", "15px", 0]}>
          <DashboardCard>
            <Heading
              mb="15px"
              as="h2"
              color="#f5f5f5"
              className="heading-bar"
              fontSize={["22px", "28px", "30px"]}
            >
              Need Help?
            </Heading>
            <Ul>
              <li>
                <a href="https://t.me/pixbytoken">Ask community in Telegram</a>
              </li>
              <li>
                <a href="https://discord.gg/GWpyFB9">Ask community in Discord</a>
              </li>
            </Ul>
          </DashboardCard>
          <DashboardCard>
            <Flex>
              <Box width={1 / 3.5} mr={3}>
                <Image
                  alt="PIXBY Blockie"
                  borderRadius={8}
                  mr={3}
                  height="auto"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAD9UlEQVR4Xu3dTWoVURDF8XoDhyJkDS5AyC6cSybOXYRjV6NbCWQBQsAFCMGhg0i28H4NRZv/m9er26fOPfXR3bcvvz4/PA/8Pvx9B9YzD2+eyF79k/PZX7/id4kARgENgBJY/UcAi/+6gkUATEEY/wiwLWHqPwJUBBIHVIKVwOq/GoDCXxcw2wxW/xj/agANgEqY+o8A1QDEgW0Cq/9qAAp/NUA1wPIoOwVoEEQaVgog+EoBpYBSQLeDRUS0jeUa4ObukZ4H0AVsAyDBe7HdXr/6v0QAo4AGYHsDRQCLfwqwzWD1j/GPABqAbQmNABWBxIFtAqv/agAKf13A6e+HY/yrAaoBzj0IKwWgBGgO3t5AESACNAoWDqQAJ78bJsHvXsB/8HJkBGgQRBwoBZQCiECn7wI+/bknAL6/vSV7BZCcH/A8wDZ+3AZuX0AEsA0UAVACtAbY3kARIALYIGibwaWAUgDuYTMvBdQFEIO2FbQagMLnD4REgOYAREGdo6QABH8KMNsSVhdQF4B72MzrAuoCiEHbCloNQOGrBqgGwBNKUoDaQNIgbgO/fPxB5wPQ6mdGL0D9b9urAuj6LxFAITT7CIApwODft44AEWCVhaWAVfiHuyhdfgRQBNG+FFAKQAqZeQpg+LF1CpACMInkD1IAQe8A2xQgBTiARtf/RQpwPXaHWKYAKcAhRLr2T1KAa5E7yC4FSAEOotJ1f5MCXIfbYVbrCqDHxSsS+lTvt98/dQlk//XmPdnrQ6XkfGb4mUBdQASwgyYV/wiACKYACGAKkAIQhaoBCL5qAINvphSACJYCSgFEoVIAwVcKMPhKAYoff3EkBbAQNAcw/CoCEb8UAF8uVfxTAESwNhABrA2sDSQKVQQSfLWBBl9toOLH9ppCdAHb9/N1/etFoF5ABDAEI4Dhx5+ORfdsHgEQwlIAAqjmpQBDMAUw/EoBiB+bpwAGYQpg+KUAiB+bpwAGYQpg+KUAiB+bpwAGYQpg+KUAiB+bpwAGYQpg+KUAiB+bpwAGYQpg+KUAesDB2Z+pUwXSJ5r0ewusABHgiTQkApz8hI0UAD8bVwqwI25KAcsvVqQAKUA1gCBQCigFCH/W+/BSQCmACFwbWBtIBKoLqAsgAjUJJPhm/XyDFCAFIAqnAARfCsBfvmwO0ByA9uD2u3mvfg6gAGgA1T+xb4YHUbp+xY9rgO0LUP8R4O7xWUDQACiD1b9c+4vt9vrVfwqADNAAKIHVfwSIAKUA4YDuwBQAJ3kKoAS/GmB8Era9gyJAXQBxYJvA6r8ikMJfG8i3Q5XB1QB22HQKkALUBgoHthVM/acAEv1GwbWBugO1hlH/KcArV4B/ulrB7XY4b6sAAAAASUVORK5CYII="
                />
              </Box>
              <Box width={1 / 2} mt={3}>
                <Text
                  color="#f5f5f5"
                  fontSize={["8px", "8px", "8px", "8px", "12px"]}
                >
                  <strong>PIXBY Smart-Contract address</strong>
                </Text>
                <Text
                  color="#f5f5f5"
                  fontSize={["8px", "8px", "8px", "8px", "12px"]}
                >
                  0xB53e08B97724126Bda6d237B94F766c0b81C90fE
                </Text>
                <a href="#" onClick={addToMetaMaskClickHandler}>
                  <MetaMaskButton
                    size="small"
                    mt={3}
                    // borderRadius="10px"
                    // boxShadow="3px 3px 6px #d0d0d0,
                    // -3px -3px 6px #ffffff"
                  >
                    ADD TO METAMASK
                  </MetaMaskButton>
                </a>
              </Box>
            </Flex>
          </DashboardCard>
        </Column>
      </Row>
      <DashGames />
    </DashboardLayout>
  );
};

export default Dashboard;
