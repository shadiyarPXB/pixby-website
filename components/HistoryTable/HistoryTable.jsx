import PropTypes from "prop-types";
import styled from "styled-components";
import Web3 from "web3";
import fixedNumber from "../../utils/fixedNumber";
import stringShortener from "../../utils/stringShortener";
import ClaimButton from "./ClaimButton";

// Table style
const HistoryTableWrapper = styled.table`
  border-collapse: collapse;
  min-width: 100%;
  th,
  td {
    padding: 20px 8px;
    text-align: left;
    white-space: pre;
  }
  th.center,
  td.center {
    text-align: center;
  }
  th {
    color: #0d0d0d;
    word-break: keep-all;
  }
  td {
    color: #0d0d0d;
  }
`;

const HistoryTableOutWrapper = styled.table`
  border-collapse: collapse;
  min-width: 100%;
  th,
  td {
    padding: 20px 8px;
    text-align: left;
    white-space: pre;
  }
  th.center,
  td.center {
    text-align: center;
  }
  th {
    color: #0d0d0d;
    word-break: keep-all;
  }
  td {
    color: #0d0d0d;
  }
`;

const HistoryTable = ({ history, type }) => {
  if (type === "staking") {
    return (
      <HistoryTableWrapper>
        <thead>
          <tr>
            <th>Block Number</th>
            <th>Txn</th>
            <th>Invested value</th>
            <th>Passive Income</th>
            <th className="center">Release Reward</th>
          </tr>
        </thead>
        <tbody>
          {history.map((staking) => {
            const { blockNumber, transactionHash, returnValues } = staking;

            return (
              <tr key={transactionHash}>
                <td style={{ color: "#a6a6a6", fontWeight: 300 }}>{blockNumber}</td>
                <td>
                  <a
                    target="blank"
                    href={`https://etherscan.io/tx/${transactionHash}`}
                  >
                    {stringShortener(transactionHash)}
                  </a>
                </td>
                <td>
                  {fixedNumber(Web3.utils.fromWei(returnValues[1], "ether"))}{" "}
                  PIXBY
                </td>
                <td style={{ color: "#0d0d0d", fontWeight: 300 }}>
                 + {fixedNumber(
                    Web3.utils.fromWei(returnValues._dailyIncome, "ether")
                  )}{" "}
                  PIXBY
                </td>
                <td className="center">
                  <ClaimButton staking={staking} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </HistoryTableWrapper>
    );
  }
  if (type === "rewards") {
    return (
      <HistoryTableWrapper>
        <thead>
          <tr>
            <th>Block Number</th>
            <th>Txn</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {history.map(
            ({ blockNumber, transactionHash, returnValues }, index) => (
              <tr key={transactionHash}>
                <td style={{ color: "#a6a6a6", fontWeight: 300 }}>{blockNumber}</td>
                <td>
                  <a
                    target="blank"
                    href={`https://etherscan.io/tx/${transactionHash}`}
                  >
                    {stringShortener(transactionHash)}
                  </a>
                </td>
                <td style={{ color: "#17c490", fontWeight: 300 }}>
                 +{fixedNumber(Web3.utils.fromWei(returnValues[1], "ether"))}{" "}
                  PIXBY
                </td>
              </tr>
            )
          )}
        </tbody>
      </HistoryTableWrapper>
    );
  }
  if (type === "transferIn") {
    return (
      <HistoryTableWrapper>
        <thead>
          <tr>
            <th>Block Number</th>
            <th>Txn</th>
            <th>From</th>
            <th>To</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {history.map(
            ({ blockNumber, transactionHash, returnValues }, index) => (
              <tr key={transactionHash}>
                <td style={{ color: "#a6a6a6", fontWeight: 300 }}>{blockNumber}</td>
                <td>
                  <a
                    target="blank"
                    href={`https://etherscan.io/tx/${transactionHash}`}
                  >
                    {stringShortener(transactionHash)}
                  </a>
                </td>
                <td>{stringShortener(returnValues._from)}</td>
                <td>{stringShortener(returnValues._to)}</td>
                <td style={{ color: "#17c490", fontWeight: 300 }}>
                  +{fixedNumber(Web3.utils.fromWei(returnValues[2], "ether"))}{" "}
                  PIXBY
                </td>
              </tr>
            )
          )}
        </tbody>
      </HistoryTableWrapper>
    );
  }
  if (type === "transferOut") {
    return (
      <HistoryTableWrapper>
        <thead>
          <tr>
            <th>Block Number</th>
            <th>Txn</th>
            <th>From</th>
            <th>To</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {history.map(
            ({ blockNumber, transactionHash, returnValues }, index) => (
              <tr key={transactionHash}>
                <td style={{ color: "#a6a6a6", fontWeight: 300 }}>{blockNumber}</td>
                <td>
                  <a
                    target="blank"
                    href={`https://etherscan.io/tx/${transactionHash}`}
                  >
                    {stringShortener(transactionHash)}
                  </a>
                </td>
                <td>{stringShortener(returnValues._from)}</td>
                <td>{stringShortener(returnValues._to)}</td>
                <td style={{ color: "#840101", fontWeight: 300 }}>
                  -{fixedNumber(Web3.utils.fromWei(returnValues[2], "ether"))}{" "}
                  PIXBY
                </td>
              </tr>
            )
          )}
        </tbody>
      </HistoryTableWrapper>
    );
  }

  return null;
};

HistoryTable.propTypes = {};

export default HistoryTable;
