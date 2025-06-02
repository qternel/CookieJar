import { useMutation, useQuery } from "@tanstack/react-query";
import { GetUser, SignIn, SignUp } from "../api/auth";
import api from "../api/client";

export const useAuth = () => {
  const {
    mutate: signIn,
    isPending: isLoadingSignIn,
    error: errorSignIn,
  } = useMutation({
    mutationKey: ["sign in"],
    mutationFn: ({ login, password }) => SignIn(login, password),
  });

  const {
    mutate: signUp,
    isPending: isLoadingSignUp,
    error: errorSignUp,
  } = useMutation({
    mutationKey: ["sign up"],
    mutationFn: ({ login, password, secondPassword }) =>
      SignUp(login, password, secondPassword),
    onSuccess: () =>
      setTimeout(() => {
        refetchUserInfo();
      }, 200),
  });

  const { data: user, refetch: refetchUserInfo } = useQuery({
    queryKey: ["user"],
    queryFn: () => GetUser(),
    onSuccess: () =>
      setTimeout(() => {
        refetchUserInfo();
      }, 200),
  });

  const logout = () => {
    localStorage.removeItem("token");
    api.defaults.headers["Authorization"] = null;
    location.reload();
    refetchUserInfo();
  };

  return {
    signIn,
    signUp,
    user,
    refetchUserInfo,
    isLoadingSignIn,
    isLoadingSignUp,
    errorSignIn,
    errorSignUp,
    logout,
  };
};
