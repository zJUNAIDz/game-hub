import axios from "axios";
export interface DataResponse<T> {
  count: number;
  // next: string;
  // previous: string;
  results: T[];
}
export default axios.create({
  baseURL: "https://api.rawg.io/api/",
  params: {
    // key: "eda951b243dd43e2a563774e03bd36b6",
    key: "c542e67aec3a4340908f9de9e86038af",
  },
});
