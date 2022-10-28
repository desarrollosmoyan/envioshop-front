import axios from "axios";
import { useCookie } from "react-use";
const useShipment = () => {
  const [token] = useCookie("token");
  const request = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/sales`,
    headers: {
      Authorization: `Bearer ${token}`,
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
  const getAll = async ([offset, limit], set, setCount) => {
    try {
      const url = `/?offset=${offset}&limit=${limit}`;
      const { data } = await request.get(url);
      set(data.salesList);
      if (setCount) {
        setCount(data.count);
      }
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
  const getCount = async (id, set) => {
    try {
      let url = "/";
      if (id) {
        url = `/${id}`;
      }
      const { data } = await request.get(url);
      set(data);
      set(data);
    } catch (error) {
      throw error;
    }
  };
  return { create, getAll, deleteOne, getCount };
};

export default useShipment;
