import axios from "axios";

const BaseURL = "https://linked-posts.routemisr.com/";

export async function handleAllPostsAPI() {
  return axios.get(BaseURL + "posts", {
    headers: {
      token: localStorage.getItem("token"),
    },
    params: {
      sort: "-createdAt",
    },
  });
}

export async function handleSinglePostAPI(postId) {
  return axios.get(BaseURL + "posts/" + postId, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
}

export async function handleCreatPostAPI(formData) {
  try {
    const data = await axios.post(BaseURL + "posts", formData, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    console.log(data);
  } catch (error) {
    return error.message;
  }
}

export async function handleDeletePostAPI(postId) {
  try {
    const { data } = await axios.delete(BaseURL + "posts/" + postId, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return data;
  } catch (error) {
    return error.message;
  }
}
