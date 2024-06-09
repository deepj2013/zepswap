import axios from "axios";



// const BASE_URL="https://api.codingyaari.com/English-Yaariapi"

export const BASE_URL = "http://localhost:3097/"


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
  return await axios.post(url, payload, getAxiosHeader());
};

export const rechargeWalletServices = async (payload) => {
  let token = localStorage.getItem('token');
  let url = `${BASE_URL}user/recharge`;
  return await axios.post(url, payload, getAxiosHeader(token));
};

export const widthrawWalletServices = async (payload) => {
  let token = localStorage.getItem('token');
  let url = `${BASE_URL}user/withdraw`;
  return await axios.post(url, payload, getAxiosHeader(token));
};


export const placeBidServices = async (payload) => {
  let token = localStorage.getItem('token');
  let url = `${BASE_URL}prediction/place-bet`;
  return await axios.post(url, payload, getAxiosHeader(token));
};

export const getBalanceServices = async (token) => {
  let url = `${BASE_URL}user/balance`;
  return await axios.get(url, getAxiosHeader(token));
};

export const getTransactionsServices = async (payload) => {
  let url = `${BASE_URL}user/transactions`;
  return await axios.get(url, payload, getAxiosHeader());
};



export const currentPredctionServices = async (payload) => {
  let url = `${BASE_URL}prediction/get-prediction-data`;
  return await axios.get(url, getAxiosHeader());
};



export const getLotteryListServices = async (payload) => {
  let url = `${BASE_URL}lottery/live-lottery`;
  return await axios.get(url, getAxiosHeader());
};


export const participateLotteryServices = async (payload) => {
  let token = localStorage.getItem('token');
  let url = `${BASE_URL}lottery/participate-lottery`;
  return await axios.post(url, payload, getAxiosHeader(token));
};


export const myLotteryHistory = async (payload) => {
  let token = localStorage.getItem('token');
  let url = `${BASE_URL}lottery/user-lottery-historybyWallet`;
  return await axios.post(url, payload, getAxiosHeader(token));
};


export const getCoinsList = async (payload) => {
  let url = `https://api.llama.fi/protocols`;
  return await axios.get(url, getAxiosHeader());
};


export const getCurrentPrice = async (symbol) => {
  let url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${symbol}&tsyms=USD&api_key=fd7ba8b55ebc06e5e6f8470507d6c3fe07e98b457509932ef9252806d701c667`;
  return await axios.get(url, getAxiosHeader());
};

