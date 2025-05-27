import api from './client';

export const getMyProfile = async () => {
  const response = await api.get('/user/me');
  return response.data;
};

export const createAchievement = async (description) => {
  const response = await api.post('/achievements', { achievement: { description } });
  return response.data;
};