import { useEffect, useState } from "react";
import axios from "axios";
const defaultOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};
const useAxios = ({
  url = "",
  options = defaultOptions,
  body = null,
  initialState = null,
}) => {
  const [responseData, setResponseData] = useState(initialState);
  const [isLoading, setLoading] = useState(true);
  const [err, setError] = useState(null);

  useEffect(() => {
    makeAxiosRequest();
  }, []);

  const makeAxiosRequest = async () => {
    try {
      const { data } = await axios({
        ...options,
        data: body,
        url: url,
      });
      setLoading(false);
      setResponseData(data);
    } catch (error) {
      console.log(error);
      setError(error);
      setResponseData(initialState);
    }
  };
  return { isLoading, responseData, err };
};

export default useAxios;
