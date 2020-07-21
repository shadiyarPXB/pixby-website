import { action, thunk } from "easy-peasy";
import { getBalance } from "../api/web3";

export default {
  accountId: null,
  balance: null,
  isAuthenticated: false,
  loading: true,
  error: null,
  fetchBalance: thunk(
    async (actions, payload, { getState, getStoreActions }) => {
      try {
        const balance = await getBalance(getState().accountId);
        actions.setBalance(balance);
      } catch (error) {
        getStoreActions().message.addMessage({
          body:
            "Oops, something went wrong while fetching balance. Please try again...",
          type: "error",
        });

        actions.setError(error);
      }
    }
  ),
  setAccount: action((state, accountId) => {
    state.accountId = accountId;
    state.isAuthenticated = true;
    state.loading = false;
  }),
  setBalance: action((state, balance) => {
    state.balance = balance;
  }),

  removeAccount: action((state) => {
    state.accountId = null;
    state.isAuthenticated = false;
    state.loading = false;
    state.balance = null;
  }),

  setError: action((state, error) => {
    state.error = error;
    state.loading = false;
  }),
};
