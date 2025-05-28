import api from "./client";

export const createAchievement = async (description) => {
  const { data } = await api.post("/achievements", {
    achievement: { description },
  });
  return data;
};
