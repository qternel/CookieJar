import { ENDPOINT } from "../constants/api";
import api from "./client";

export const SignIn = async (login, password) => {
  const { data } = await api({
    method: "post",
    url: `${ENDPOINT}/auth/signin`,
    data: {
      login: login,
      password: password,
    },
  });

  const token = localStorage.setItem("token", data.token);
  if (token) api.defaults.headers["Authorization"] = `Bearer ${token}`;

  return data;
};

export const SignUp = async (login, password) => {
  const { data } = await api({
    method: "post",
    url: `${ENDPOINT}/auth/signup`,
    data: {
      login: login,
      password: password,
    },
  });

  const token = localStorage.setItem("token", data.token);
  if (token) api.defaults.headers["Authorization"] = `Bearer ${token}`;

  return data;
};

export const GetUser = async () => {
  const { data } = await api({
    method: "get",
    url: `${ENDPOINT}/user/me`,
  });

  return data;
};
