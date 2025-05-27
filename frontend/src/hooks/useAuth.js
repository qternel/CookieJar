import { useMutation, useQuery } from "@tanstack/react-query";
import { GetUser, SignIn, SignUp } from "../api/auth";

export const useAuth = () => {
  const {
    mutate: signIn,
    isPending: isLoadingSignIn,
    error: errorSignIn,
  } = useMutation({
    mutationKey: ["sign in"],
    mutationFn: (login, password) => SignIn(login, password),
  });

  const {
    mutate: signUp,
    isPending: isLoadingSignUp,
    error: errorSignUp,
  } = useMutation({
    mutationKey: ["sign up"],
    mutationFn: (login, password) => SignUp(login, password),
    onSuccess: () => refetchUserInfo(),
  });

  const { data: user, refetch: refetchUserInfo } = useQuery({
    queryKey: ["user"],
    queryFn: () => GetUser(),
    onSuccess: () => refetchUserInfo(),
  });

  return {
    signIn,
    signUp,
    user,
    refetchUserInfo,
    isLoadingSignIn,
    isLoadingSignUp,
    errorSignIn,
    errorSignUp,
  };
};
