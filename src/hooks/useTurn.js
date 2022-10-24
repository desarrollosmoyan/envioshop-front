import axios from "axios";
const useTurn = () => {
  const request = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/turn`,
  });
  const assign = async (cashierId, balance, set = null) => {
    try {
      const { data } = await request.post(`/${cashierId}`, {
        openBalance: balance,
      });
      if (set) set(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const end = async (turnId, balance, set = null) => {
    try {
      const { data } = await request.put(`/${turnId}`, {
        closeBalance: balance,
      });
      if (set) set(data);
    } catch (error) {
      throw error;
    }
  };
  const getOne = async (turnId, set) => {
    try {
      const url = `/${turnId}`;
      const { data } = await request.get(url);
      set(data);
    } catch (error) {
      throw error;
    }
  };
  const update = async (turnId, updateData, set) => {
    try {
      const url = `/${turnId}`;
      const { data } = await request.patch(url, updateData);
      set(data);
    } catch (error) {
      throw error;
    }
  };
  return { assign, end, getOne };
};

export default useTurn;
