import api from "./client";
import { ENDPOINT } from "../constants/api";
export const createAchievement = async (description) => {
  const { data } = await api.post(`${ENDPOINT}/achievements`, {
    achievement: { description },
  });
  return data;
};
