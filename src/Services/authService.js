import axios from "axios";

const BaseURL = "https://linked-posts.routemisr.com/";

export async function registerAPI(formData) {
  try {
    const { data } = await axios.post(BaseURL + "users/signup", formData);
    return data;
  } catch (error) {
    return error.response?.data.error ? error.response.data.error : error.message;
  }
}

export async function loginAPI(formData) {
  try {
    const { data } = await axios.post(BaseURL + "users/signin", formData);
    return data;
  } catch (error) {
    return error.response?.data.error ? error.response.data.error : error.message;
  }
}

export async function handleGetUserDataAPI() {
  try {
    const { data } = await axios.get(BaseURL + "users/profile-data", {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return data;
  } catch (error) {
    return error.message;
  }
}
