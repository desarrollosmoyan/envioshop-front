import axios from "axios";
import { useState, useEffect } from "react";

const defaultHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};
axios.defaults.baseURL = "http://localhost:5000";
const useAxios = ({
  url,
  method = "GET",
  initialData = [],
  body = undefined,
  headers = defaultHeaders,
  isLazy = false,
}) => {
  const [trigger, setTrigger] = useState(!isLazy);
  const [responseData, setResponseData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bodyState, setBodyState] = useState(body);
  const dispatchTrigger = () => {
    setTrigger(!trigger);
  };
  const dispatchBody = (newBody) => {
    setBodyState(newBody);
  };

  useEffect(() => {
    if (!trigger) return;
    getData();
    dispatchTrigger();
  }, [trigger]);

  const getData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios({
        method: method,
        url: url,
        data: bodyState,
        headers: headers,
      });
      setResponseData(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    responseData,
    isLoading,
    error,
    setResponseData,
    shootRequest: dispatchTrigger,
    dispatchBody,
  };
};

export default useAxios;
