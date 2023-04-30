import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api/",
  params: {
    key: "eda951b243dd43e2a563774e03bd36b6",
  },
});
