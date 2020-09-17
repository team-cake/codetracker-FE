import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken} from "../user/selectors";

export const sendMail = (to) => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const response = await axios.post(`${apiUrl}/mail`, {
        to
      })

      console.log("RESPONSE:", response)
    } catch (e) {
      console.log("ERROR IS:", e.message)
    }
  };
};
