import Web3 from "web3";

const initiateWeb3 = () => {
  if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
    // We are in the browser and metamask is running.
    return new Web3(window.web3.currentProvider);
  } else {
    // We are on the server *OR* the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
      "https://mainnet.infura.io/v3/736d741bbc5a4ccd9a89fb46d0e5a9fc"
    );
    return new Web3(provider);
  }
};

const abi = [
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_fundsWallet",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_investor2",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_investmentValue2",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_ID2",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_unlocktime2",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_dailyIncome",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_investmentTime",
        type: "uint256",
      },
    ],
    name: "PassiveDeposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_acclaimer2",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_amout2",
        type: "uint256",
      },
    ],
    name: "PassiveSpent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "Percent",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "fundsWallet",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBlockTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "blockTimestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_investment",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_term",
        type: "uint256",
      },
    ],
    name: "getInterestRate",
    outputs: [
      {
        internalType: "uint256",
        name: "rate",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_passiveIncomeID",
        type: "uint256",
      },
    ],
    name: "getPassiveDetails",
    outputs: [
      {
        internalType: "address",
        name: "investorAddress2",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "investedAmount2",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "dailyPassiveIncome",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "investmentTimeStamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "investmentUnlocktime2",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "day",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "spent2",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_passiveIncomeID",
        type: "uint256",
      },
    ],
    name: "getPassiveIncomeDay",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_passiveIncomeID",
        type: "uint256",
      },
    ],
    name: "getPassiveIncomeStatus",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_passiveIncomeID",
        type: "uint256",
      },
    ],
    name: "getPassiveInvestmentTerm",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_passiveIncomeID",
        type: "uint256",
      },
    ],
    name: "getPassiveInvestmentTimeStamp",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_passiveIncomeID",
        type: "uint256",
      },
    ],
    name: "getPassiveNumberOfDays",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_passiveIncomeID",
        type: "uint256",
      },
    ],
    name: "getSimulatedDailyIncome",
    outputs: [
      {
        internalType: "uint256",
        name: "_numberOfDaysHeld",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_numberOfDaysOwed",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_totalDailyPassiveIncome",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_dailyPassiveIncome",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_totalReward",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_day",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_spent",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "interestRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_unlockTime",
        type: "uint256",
      },
    ],
    name: "makePassiveIncomeInvestment",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "maxForPassive",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minForPassive",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "passiveInvestorIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_passiveIncomeID",
        type: "uint256",
      },
    ],
    name: "releasePassiveIncome",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "standard",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalInvestmentAfterInterest",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const address = "0xB53e08B97724126Bda6d237B94F766c0b81C90fE";
// initiateWeb3();
// let contract = new web3.eth.Contract(abi, address);

// let accounts;
// web3.eth.getAccounts().then((r) => {
//   accounts = r;
// });

const initiateContract = () => {
  const web3 = initiateWeb3();
  return new web3.eth.Contract(abi, address);
};

export const getHistory = (type, connectWallet) => {
  const contract = initiateContract();

  const config = {
    fromBlock: 0,
    toBlcok: "latest",
  };

  return new Promise((resolve, reject) => {
    if (type === "staking") {
      if (connectWallet) {
        config.filter = { _investor2: connectWallet };
      }

      contract.getPastEvents("PassiveDeposit", config, (err, events) => {
        if (err) {
          return reject(err);
        }

        resolve(events);
      });
    } else if (type === "rewards") {
      if (connectWallet) {
        config.filter = { _acclaimer2: connectWallet };
      }

      contract.getPastEvents("PassiveSpent", config, (err, events) => {
        if (err) {
          return reject(err);
        }

        resolve(events);
      });
    } else if (type === "transferIn") {
      if (connectWallet) {
        config.filter = { _to: connectWallet };
      }
      contract.getPastEvents("Transfer", config, (err, events) => {
        if (err) {
          return reject(err);
        }

        resolve(events);
      });
    } else if (type === "transferOut") {
      if (connectWallet) {
        config.filter = { _from: connectWallet };
      }
      contract.getPastEvents("Transfer", config, (err, events) => {
        if (err) {
          return reject(err);
        }

        resolve(events);
      });
    }
  });
};

export const getBalance = (accountId) => {
  const contract = initiateContract();
  return new Promise((resolve, reject) => {
    contract.methods.balanceOf(accountId).call((err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

export const getPassiveDetails = (ID) => {
  const contract = initiateContract();
  return new Promise((resolve, reject) => {
    contract.methods.getSimulatedDailyIncome(ID).call((err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

export const getPassiveNumberOfDays = (ID) => {
  const contract = initiateContract();
  return new Promise((resolve, reject) => {
    contract.methods.getPassiveNumberOfDays(ID).call((err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

export const getBlockTimestamp = (ID) => {
  const contract = initiateContract();
  return new Promise((resolve, reject) => {
    contract.methods.getBlockTimestamp().call((err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

// For staking page
export const getMakeEstimateGas = (_amount, _unlockTime, from) => {
  const contract = initiateContract();
  return contract.methods
    .makePassiveIncomeInvestment(_amount, _unlockTime)
    .estimateGas({ from });
};

export const makePassiveIncomeInvestment = (_amount, _unlockTime, from) => {
  const contract = initiateContract();
  return contract.methods
    .makePassiveIncomeInvestment(_amount, _unlockTime)
    .send({ from });
};

export const releasePassiveIncome = (_ID, from) => {
  const contract = initiateContract();
  return contract.methods.releasePassiveIncome(_ID).send({ from });
};

export const getEstimateGas = (ID, from) => {
  const contract = initiateContract();
  return contract.methods.releasePassiveIncome(ID).estimateGas({ from });
};

export const getSimulatedDailyIncome = (ID) => {
  const contract = initiateContract();
  return new Promise((resolve, reject) => {
    contract.methods.getSimulatedDailyIncome(ID).call((err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};
