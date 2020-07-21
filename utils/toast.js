import store from "../model/storeModel";

const addMessage = store.getActions().message.addMessage;

class Toast {
  error(body, time) {
    return addMessage({ body, type: "error", time });
  }

  success(body, time) {
    return addMessage({ body, type: "success", time });
  }
}

export default new Toast();
