import axios from "axios";
import { useCookie } from "react-use";
const useShipment = () => {
  const [token] = useCookie("token");
  const request = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/sales`,
    headers: {
      Authorization: token,
    },
  });
  const create = async (body, set = null) => {
    try {
      const { data } = await request.post(`/`, body);
      if (set) set(data);
      return data;
    } catch (error) {
      throw error;
    }
  };
  const getAll = async ([offset, limit], set) => {
    try {
      const url = `/?offset=${offset}&limit=${limit}`;
      const { data } = await request.get(url);
      set(data.salesList);
    } catch (error) {
      throw error;
    }
  };
  const deleteOne = async (id) => {
    try {
      const url = `/${id}`;
      const { data } = await request.delete(url);
    } catch (error) {
      throw error;
    }
  };

  const deleteMany = async (ids) => {
    try {
      //const url = `/${}`;
    } catch (error) {
      throw error;
    }
  };
  return { create, getAll, deleteOne };
};

export default useShipment;
