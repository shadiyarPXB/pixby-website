import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";
import UniLogin from "@unilogin/provider";
import Authereum from "authereum";
import store from "../model/storeModel";
import toast from "../utils/toast";
import BurnerConnectProvider from "@burner-wallet/burner-connect-provider";
import MewConnect from "@myetherwallet/mewconnect-web-client";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "736d741bbc5a4ccd9a89fb46d0e5a9fc",
    },
  },
  fortmatic: {
    package: Fortmatic,
    options: {
      key: "pk_live_BA9B27A642DF53EF",
    },
  },
  burnerconnect: {
    package: BurnerConnectProvider,
    options: {
      defaultNetwork: "100",
    },
  },
  unilogin: {
    package: UniLogin,
  },
  mewconnect: {
    package: MewConnect,
    options: {
      infuraId: "736d741bbc5a4ccd9a89fb46d0e5a9fc",
    },
  },
  authereum: {
    package: Authereum,
  },
};

const web3Modal = new Web3Modal({
  network: "mainnet",
  cacheProvider: true,
  providerOptions,
  theme: {
    background: "#fff",
    main: "#0d0d0d",
    secondary: "#0d0d0d",
    border: "rgba(195, 195, 195, 0.14)",
    bordeRaidus: "20px",
    hover: "#f5f5f5",
  },
});
let provider, selectedAccount;

export const onConnect = async (router) => {
  try {
    provider = await web3Modal.connect();
  } catch (e) {
    if (!(e === "Modal closed by user")) {
      toast.error("Something went wrong. Please try again...", 10000);
    }
    if (router.pathname.includes("/dashboard")) {
      router.push("/");
    }
    return;
  }
  // Subscribe to accounts change
  provider.on("accountsChanged", (accounts) => {
    fetchAccountData();
  });

  // Subscribe to chainId change
  provider.on("chainChanged", (chainId) => {
    fetchAccountData();
  });

  // Subscribe to networkId change
  provider.on("networkChanged", (networkId) => {
    fetchAccountData();
  });

  await refreshAccountData();

  toast.success("Successfully logged in");
  if (router.pathname.includes("/dashboard")) return null;
  router.push("/dashboard");
};

/**
 * Kick in the UI action after Web3modal dialog has chosen a provider
 */
async function fetchAccountData() {
  // Get a Web3 instance for the wallet
  const web3 = new Web3(provider);

  // Get connected chain id from Ethereum node
  // const chainId = await web3.eth.getChainId();
  // Load chain information over an HTTP API
  //   const chainData = await EvmChains.getChain(chainId);
  //   console.log(chainData.name);
  //   console.log(chainId);

  // Get list of accounts of the connected wallet
  const accounts = await web3.eth.getAccounts();

  // MetaMask does not give you all accounts, only the selected account
  //   console.log("Got accounts", accounts);
  selectedAccount = accounts[0];

  store.getActions().account.setAccount(selectedAccount);
  //   // Go through all accounts and get their ETH balance
  //   const rowResolvers = accounts.map(async (address) => {
  //     const balance = await web3.eth.getBalance(address);
  //     // ethBalance is a BigNumber instance
  //     // https://github.com/indutny/bn.js/
  //     const ethBalance = web3.utils.fromWei(balance, "ether");
  //     const humanFriendlyBalance = parseFloat(ethBalance).toFixed(4);
  //     // Fill in the templated row and put in the document
  //     const clone = template.content.cloneNode(true);
  //     clone.querySelector(".address").textContent = address;
  //     clone.querySelector(".balance").textContent = humanFriendlyBalance;
  //     accountContainer.appendChild(clone);
  //   });

  //   // Because rendering account does its own RPC commucation
  //   // with Ethereum node, we do not want to display any results
  //   // until data for all accounts is loaded
  //   await Promise.all(rowResolvers);
}

/**
 * Fetch account data for UI when
 * - User switches accounts in wallet
 * - User switches networks in wallet
 * - User connects wallet initially
 */
async function refreshAccountData() {
  await fetchAccountData();
}

/**
 * Disconnect wallet button pressed.
 */
export const onDisconnect = async (router) => {
  if (provider?.close) {
    await provider.close();

    // If the cached provider is not cleared,
    // WalletConnect will default to the existing session
    // and does not allow to re-scan the QR code with a new wallet.
    // Depending on your use case you may want or want not his behavir.
    await web3Modal.clearCachedProvider();
    provider = null;
  }

  selectedAccount = null;

  store.getActions().account.removeAccount();
  router.push("/");
  toast.success("Successfully logged Out");
};
