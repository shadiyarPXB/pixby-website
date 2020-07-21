import { action, thunk } from "easy-peasy";
import { getHistory } from "../api/web3";

export default {
  type: "",
  history: [],
  loading: true,
  error: null,
  fetchHistory: thunk(async (actions, payload, { getStoreState }) => {
    actions.setType(payload);
    try {
      const historyData = await getHistory(
        payload,
        getStoreState().account.accountId
      );
      actions.setHistory(historyData);
    } catch (error) {
      console.log(error);
      actions.setError(error);
      actions.setLoading(false);
    }
  }),
  setHistory: action((state, history) => {
    state.history = history;
    state.loading = false;
  }),

  setLoading: action((state, loading) => {
    state.loading = loading;
  }),

  setType: action((state, type) => {
    state.loading = true;
    state.type = type;
    state.history = [];
  }),

  setError: action((state, error) => {
    state.error = error;
    state.loading = false;
  }),
};
