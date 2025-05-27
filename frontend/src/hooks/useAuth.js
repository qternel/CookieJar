import { useMutation, useQuery } from "@tanstack/react-query";
import { GetUser, SignIn, SignUp } from "../api/auth";

export const useAuth = () => {
  const { mutate: signIn } = useMutation({
    mutationKey: ["sign in"],
    mutationFn: (login, password) => SignIn(login, password),
  });

  const { mutate: signUp } = useMutation({
    mutationKey: ["sign up"],
    mutationFn: (login, password) => SignUp(login, password),
  });

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => GetUser(),
  });

  return {
    signIn,
    signUp,
    user,
  };
};
