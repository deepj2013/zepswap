import axios from "axios";



// const BASE_URL="https://api.codingyaari.com/English-Yaariapi"

export const BASE_URL="http://localhost:3097/"


const getAxiosHeader = (token) => {
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  };

export const loginServices = async (payload) => {
    let url = `${BASE_URL}user/login`;
    return await axios.post(url,payload,getAxiosHeader());
  };   

  export const rechargeWalletServices = async (payload) => {
    let token=localStorage.getItem('token');
    let url = `${BASE_URL}user/recharge`;
    return await axios.post(url,payload,getAxiosHeader(token));
  };  

  export const widthrawWalletServices = async (payload) => {
    let token=localStorage.getItem('token');
    let url = `${BASE_URL}user/withdraw`;
    return await axios.post(url,payload,getAxiosHeader(token));
  };  


  export const placeBidServices = async (payload) => {
    let url = `${BASE_URL}prediction/place-bet`;
    return await axios.post(url,payload,getAxiosHeader());
  };  

  export const getBalanceServices = async (token) => {
    let url = `${BASE_URL}user/balance`;
    return await axios.get(url,getAxiosHeader(token));
  };

  export const getTransactionsServices = async (payload) => {
    let url = `${BASE_URL}user/transactions`;
    return await axios.get(url,payload,getAxiosHeader());
  };



  export const currentPredctionServices = async (payload) => {
    let url = `${BASE_URL}prediction/get-prediction-data`;
    return await axios.get(url,getAxiosHeader());
  };

