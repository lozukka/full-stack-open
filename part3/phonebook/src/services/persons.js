import axios from "axios";
const baseURL = "https://full-stack-open-cl8x.onrender.com/api/persons";

const getAll = () => {
  return axios.get(baseURL);
};

const create = (newObject) => {
  return axios.post(baseURL, newObject);
};

const replace = (id, newObject) => {
  return axios.put(`${baseURL}/${id}`, newObject);
};

const remove = (id) => {
  return axios.delete(`${baseURL}/${id}`);
};

export default {
  getAll: getAll,
  create: create,
  replace: replace,
  remove: remove,
};
