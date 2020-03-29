import axios from "axios";

const config = () => {
  return {
    baseURL: 'https://cinema-api-test.herokuapp.com/',
  };
};

export default axios.create(config());