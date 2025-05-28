import { useMutation } from "@tanstack/react-query";
import { createAchievement } from "../api/achievements";
import { useAuth } from "./useAuth";

export const useAchievements = () => {
  const { refetchUserInfo } = useAuth();
  const { mutate: CreateAchievement, isPending: isAdding } = useMutation({
    mutationKey: ["add achievement"],
    mutationFn: (description) => createAchievement(description),
    onSuccess: () => refetchUserInfo(),
  });

  return {
    CreateAchievement,
    isAdding,
  };
};
