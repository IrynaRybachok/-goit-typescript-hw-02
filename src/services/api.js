import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";
const ACCESS_KEY = "pVvJDw1lH32y8ESDqXfooMx3hL6xkl-QOvETbEatgDU";

const fetchImages = async (query, page = 1) => {
  const params = {
    query,
    page: page,
    per_page: 9,
    client_id: ACCESS_KEY,
  };

  const { data } = await axios.get("search/photos", { params });
  return data;
};

export default fetchImages;
