import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../../constants";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [data, setData] = useState({ franchises: null, cashiers: null });
  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    try {
      const allFranchises = await axios.get(
        API_ENDPOINTS.users.franchises.allFranchises
      );

      /*const allCashiers = await axios.get(
        API_ENDPOINTS.users.cashiers.allCashiers
      );*/
      setData({ franchises: { ...allFranchises.data } });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return (
    <UserContext.Provider value={{ contextData: [data, setData] }}>
      {props.children}
    </UserContext.Provider>
  );
};

/*export const UserContextProvider = (props) => {
  const [data, setData] = useState({ franchises: null, cashiers: null });
  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    try {
      const allFranchises = await axios.get(
        API_ENDPOINTS.users.franchises.allFranchises
      );
      const allCashiers = await axios.get(
        API_ENDPOINTS.users.cashiers.allCashiers
      );
      setData({ franchise: allFranchises.data, cashiers: allCashiers.data });
    } catch (error) {
      throw error;
    }
  };
  return (
    <UserContext.Provider value={{ contextData: [data, setData] }}>
      {props.children}
    </UserContext.Provider>
  );
}; */
