import axios from "axios";
import { useCookie } from "react-use";
const useUser = (type) => {
  const [token] = useCookie("token");
  const request = axios.create({
    baseURL: `http://localhost:5000/user/${type}`,
    headers: {
      Authorization: token,
    },
  });
  const getAll = async ([offset, limit], set, setCount) => {
    try {
      const { data } = await request.get(`/?offset=${offset}&limit=${limit}`);
      set(data[`${type}s`]);
      setCount(data["total"]);
      console.log(offset, limit);
    } catch (error) {}
  };
  const getOne = async (id, set) => {
    try {
      const { data } = await request.get(`/${id}`);
      console.log(data);
      set(data);
    } catch (error) {
      throw error;
    }
  };
  const deleteOne = async (id) => {
    try {
      const { data } = await request.delete(`/${id}`);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const deleteMany = async (ids) => {
    try {
      const { data } = await request.delete(`/`);
      //const { data } = await axios.put("/");
    } catch (error) {
      console.log(error);
    }
  };
  const updateOne = async (id, body, set = null) => {
    try {
      const { data } = await request.put(`/${id}`, body);
      console.log(data);
      if (set) set(data);
    } catch (error) {
      throw error;
    }
  };
  const create = async (body, set = null) => {
    try {
      const { data } = await request({
        method: "POST",
        data: body,
        url: "",
      });
      if (set) set(data);
    } catch (error) {
      throw error;
    }
  };

  return { getAll, deleteOne, deleteMany, updateOne, create, getOne };
};

export default useUser;
