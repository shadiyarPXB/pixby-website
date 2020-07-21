import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "rimble-ui";
import Web3 from "web3";
import { useStoreState } from "easy-peasy";
import {
  getSimulatedDailyIncome,
  getPassiveNumberOfDays,
  getPassiveDetails,
  getEstimateGas,
  releasePassiveIncome,
} from "../../api/web3";
import toast from "../../utils/toast";
import Loader from "../../components/Loader/Loader";
import TransactionSummary from "../../components/TransactionModal/TransactionSummary";
import TransactionStarted from "../../components/TransactionModal/TransactionStarted";
import TransactionSuccess from "../../components/TransactionModal/TransactionSuccess";
import TransactionFailed from "../../components/TransactionModal/TransactionFailed";
import fixedNumber from "../../utils/fixedNumber";

const ClaimButton = ({ staking }) => {
  const { accountId } = useStoreState((state) => state.account);
  const [transactionSummaryOpen, setTransactionSummaryOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hash, setHash] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [dailyIncome, setDailyIncome] = useState(null);
  const [error, setError] = useState(null);
  const [passiveIncome, setPassiveIncome] = useState(null);

  const releasePassiveIncomeHandler = async () => {
    releasePassiveIncome(staking?.returnValues?._ID2, accountId)
      .on("transactionHash", (hash) => {
        setTransactionSummaryOpen(false);
        setHash(hash);
        toast.success("Transaction started");
      })
      .on("receipt", (receipt) => {
        setHash("");
        setReceipt(receipt);
        console.log("receipt", receipt);
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

  const getTransactionSummaryDetails = async () => {
    try {
      const passiveNumberOfDays = await getPassiveNumberOfDays(
        staking?.returnValues?._ID2
      );

      const passiveDetails = await getPassiveDetails(
        staking?.returnValues?._ID2
      );

      // Set the daily income
      setDailyIncome(
        (passiveNumberOfDays - passiveDetails._day + 1) *
          fixedNumber(
            Web3.utils.fromWei(passiveDetails._dailyPassiveIncome, "ether")
          )
      );

      const passiveIncomeData = await getEstimateGas(
        staking?.returnValues?._ID2,
        accountId
      );

      setPassiveIncome(passiveIncomeData);
      setTransactionSummaryOpen(true);

      releasePassiveIncomeHandler();
    } catch (error) {
      toast.error("Oops something goes wrong....");
    }
  };

  const onClaimClickHandler = (staking) => async () => {
    setLoading(true);
    try {
      const result = await getSimulatedDailyIncome(staking?.returnValues?._ID2);

      if (!result._spent) {
        toast.error("Tokens did not mature.");
        return;
      }
      await getTransactionSummaryDetails();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Button.Base
        bg="#43705c"
        color="#f5f5f5"
        borderRadius="5px"
        size="small"
        onClick={onClaimClickHandler(staking)}
        disabled={loading}
      >
        {loading ? (
          <Loader loading={true} minHeight={0} size={20} color="#f7cbc7" />
        ) : (
          "CLAIM"
        )}
      </Button.Base>

      {transactionSummaryOpen && (
        <TransactionSummary
          isOpen={transactionSummaryOpen}
          onClose={() => setTransactionSummaryOpen(false)}
          releasePassiveIncomeHandler={releasePassiveIncomeHandler}
          dailyIncome={dailyIncome}
          passiveIncome={passiveIncome}
        />
      )}

      {!!hash && (
        <TransactionStarted
          isOpen={!!hash}
          onClose={() => setHash("")}
          dailyIncome={dailyIncome}
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
        />
      )}

      {!!error && (
        <TransactionFailed
          isOpen={!!error}
          onClose={() => setError(null)}
          error={error}
        />
      )}
    </>
  );
};

ClaimButton.propTypes = { staking: PropTypes.object.isRequired };

export default ClaimButton;
