import axios from "axios";
import { useCookie } from "react-use";
import { useCallback } from "react";
const useUser = (type) => {
  const [token] = useCookie("token");
  const request = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/user/${type}`,
    headers: {
      Authorization: `Bearer ${token}`,
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
      const body = ids;
      const { data } = await request.delete(`/`, {
        data: {
          ids: body,
        },
      });
    } catch (error) {
      throw error;
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

  const getBySearch = async (value, [offset = 0, limit = 20], set = null) => {
    try {
      console.log(offset, limit);
      const url = `/search/${value}?offset=${offset}&limit=${limit}`;
      const { data } = await request({
        method: "GET",
        url: url,
      });
      if (!set) return data;
      set(data.franchises);
      console.log(data);
    } catch (error) {
      throw error;
    }
  };

  return {
    getAll,
    deleteOne,
    deleteMany,
    updateOne,
    create,
    getOne,
    getBySearch,
  };
};

export default useUser;
