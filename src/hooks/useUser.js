import axios from "axios";

const useUser = (type) => {
  const request = axios.create({
    baseURL: `http://localhost:5000/user/${type}`,
  });
  const getAll = async (set) => {
    try {
      const { data } = await request.get("/");
      set(data);
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
    } catch (error) {}
  };
  const deleteMany = async (ids) => {
    try {
      const { data } = await request.delete(`/`);
      //const { data } = await axios.put("/");
    } catch (error) {}
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
