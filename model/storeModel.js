import { createStore } from "easy-peasy";
import historyModel from "./historyModel";
import marketDataModel from "./marketDataModel";
import accountModel from "./accountModel";
import messagesModel from "./messagesModel";

export default createStore({
  history: historyModel,
  marketData: marketDataModel,
  account: accountModel,
  message: messagesModel,
});
