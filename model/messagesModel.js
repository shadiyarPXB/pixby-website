import { action } from "easy-peasy";
import { v4 as uuidv4 } from "uuid";

export default {
  messages: [],

  addMessage: action((state, { body, type = "success", time = 6000 }) => {
    const message = {
      body,
      type,
      time,
      id: uuidv4(),
    };
    state.messages.push(message);
  }),

  removeMessage: action((state, id) => {
    state.messages = state.messages.filter((message) => message.id !== id);
  }),
};
