import { useMutation } from "@tanstack/react-query";
import { createAchievement } from "../api/achievements";
import { useAuth } from "./useAuth";

export const useAchivements = () => {
  const { refetchUserInfo } = useAuth();
  const { mutate: CreateAchievement, isPending: isAdding } = useMutation({
    mutationKey: ["add achivement"],
    mutationFn: (description) => createAchievement(description),
    onSuccess: () => refetchUserInfo(),
  });

  return {
    CreateAchievement,
    isAdding,
  };
};
