import { useState, useEffect } from "react";
import styled from "styled-components";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Text } from "rimble-ui";
import Pagination from "react-js-pagination";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import HistoryLayout from "../../components/DashboardCard/HistoryLayout";
import HistoryTable from "../../components/HistoryTable/HistoryTable";
import Loader from "../../components/Loader/Loader";

// Tab menu style
const TabMenu = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    padding: 20px 5px;
    font-size: 10px;
    font-weight: 700;
    color: #0d0d0d;
    position: relative;
    cursor: pointer;
    transition: 0.3s;
    @media screen and (min-width: ${(props) => props.theme.breakpoints[0]}) {
      font-size: 15px;
    }
    @media screen and (min-width: ${(props) => props.theme.breakpoints[1]}) {
      padding: 25px 10px;
    }
  }

  li.active,
  li:hover {
    color: #3e3eff;
  }
  li::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 5px;
    background-color: #3e3eff;
    transform: scaleX(0);
    transition: 0.3s;
  }

  li:hover ::after,
  li.active::after {
    transform: scaleX(1);
  }
`;

// Table box style
const TableBox = styled(Box)`
  word-break: break-all;
  /* display: ${(props) => (props.active ? "block" : "none")}; */
  overflow-x: auto;
`;

const countPerPage = 10;

const transactionHistory = () => {
  const fetchHistory = useStoreActions(
    (actions) => actions.history.fetchHistory
  );
  const { history, loading, type } = useStoreState((state) => state.history);
  const accountId = useStoreState((state) => state.account.accountId);

  const [page, setPage] = useState(1);
  const tabChangeHandler = (tabName) => async () => {
    //TODO: have to fixed race condition
    if (loading) return false;
    setPage(1);
    await fetchHistory(tabName);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };
  useEffect(() => {
    if (accountId) {
      fetchHistory("staking");
    }
  }, [accountId]);

  const historyReversed = [...history]
    .reverse()
    .filter(
      (val, index) =>
        (page - 1) * countPerPage <= index && index < page * countPerPage
    );

  return (
    <DashboardLayout>
      <Box
        backgroundColor="#f5f5f5"
        boxShadow="6px 6px 12px #0c0c0c, 
        -6px -6px 12px #0e0e0e"
        borderRadius="10px"
        mb={["15px", "15px", "15px", "30px"]}
        px={["10px", "20px", "40px"]}
      >
        <TabMenu>
          {/* <li>Events:</li> */}
          <li
            onClick={tabChangeHandler("staking")}
            className={type === "staking" ? "active" : ""}
          >
            COLD STAKING
          </li>
          <li
            onClick={tabChangeHandler("rewards")}
            className={type === "rewards" ? "active" : ""}
          >
            PASSIVE REWARDS
          </li>
          <li
            onClick={tabChangeHandler("transferIn")}
            className={type === "transferIn" ? "active" : ""}
          >
            DEPOSITS
          </li>
          <li
            onClick={tabChangeHandler("transferOut")}
            className={type === "transferOut" ? "active" : ""}
          >
            TRANSFERS <strong>OUT</strong>
          </li>
        </TabMenu>
      </Box>
      <HistoryLayout>
        <TableBox>
          <Loader loading={loading} color="#f7cbc7" />
          {!loading && history.length > 0 && (
            <HistoryTable history={historyReversed} type={type} />
          )}
          {!loading && history.length === 0 && (
            <Text>No transactions found</Text>
          )}

          {!loading && history.length > countPerPage && (
            <Box mt="20px" textAlign="center">
              <Pagination
                activePage={page}
                itemsCountPerPage={countPerPage}
                totalItemsCount={history.length}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
              />
            </Box>
          )}
        </TableBox>
      </HistoryLayout>
    </DashboardLayout>
  );
};

export default transactionHistory;
