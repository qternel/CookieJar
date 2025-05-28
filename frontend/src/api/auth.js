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

  localStorage.setItem("token", data.token);
  api.defaults.headers["Authorization"] = `Bearer ${data.token}`;

  return data;
};

export const SignUp = async (login, password, secondPassword) => {
  const { data } = await api({
    method: "post",
    url: `${ENDPOINT}/auth/signup`,
    data: {
      login: login,
      password: password,
      password_confirmation: secondPassword,
    },
  });

  localStorage.setItem("token", data.token);
  api.defaults.headers["Authorization"] = `Bearer ${data.token}`;

  return data;
};

export const GetUser = async () => {
  const { data } = await api({
    method: "get",
    url: `${ENDPOINT}/user/me`,
  });

  return data;
};
