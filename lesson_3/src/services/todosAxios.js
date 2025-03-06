import axios from "axios";
const API = `https://67c47675c4649b9551b3b182.mockapi.io/todos`;

const service = {
  get: (id) => axios(API + (id ? `/${id}` : ``)).then(({ data }) => data),
  delete: (id) => axios.delete(API + `/${id}`).then(({ data }) => data),
  patch: (id, item) => axios.patch(API + `/${id}`, item).then(({ data }) => data),
  put: (id, item) => axios.put(API + `/${id}`, item).then(({ data }) => data),
  post: (item) => axios.post(API, item).then(({ data }) => data),
};

export default service;