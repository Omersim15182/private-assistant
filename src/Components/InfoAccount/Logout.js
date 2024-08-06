import axios from "axios";

const logoutUser = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3500/logout/deleteCookie",
      { withCredentials: true }
    );
    return response.data;
  } catch (e) {
    console.error("There is an error, the user is still online", e);
  }
};
export default logoutUser;
