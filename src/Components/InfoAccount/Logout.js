import axios from "axios";
import io from "socket.io-client";
const socket = io("http://localhost:3500");

const logoutUser = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3500/logout/deleteCookie",
      { withCredentials: true }
    );
    console.log(socket.disconnect());

    return response.data;
  } catch (e) {
    console.error("There is an error, the user is still online", e);
  }
};
export default logoutUser;
