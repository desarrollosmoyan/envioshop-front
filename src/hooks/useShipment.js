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
  const getAll = async (
    [offset, limit, svcName = "", lte = "", gte = ""],
    set,
    setCount
  ) => {
    try {
      const url = `/?offset=${offset}&limit=${limit}&serviceName=${svcName}&lte=${lte}&gte=${gte}`;
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
  const getAllFranchisesWithSales = async ([offset = 0, limit = 0], set) => {
    try {
      const { data } = await request({
        method: "POST",
        url: `/franchises?offset=${offset}&limit=${limit}`,
      });
      if (!set) return data;
      console.log(data);
      set(data.franchises);
    } catch (error) {
      console.log(error);
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
  return { create, getAll, deleteOne, getCount, getAllFranchisesWithSales };
};

export default useShipment;
