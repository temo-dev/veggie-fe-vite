import { useMutation } from "react-query";
import { API_ENDPOINTS } from "../../utils/api-endpoints";
import http from "../../utils/http";
import useAuth from '@/utils/hooks/useAuth';
import { notifications } from "@mantine/notifications";

interface LoginInput {
    user_name: string;
    password: string;
  }

const login = async (input: LoginInput) => {
    const res = await http.post(API_ENDPOINTS.LOGIN, input);
    return res.data;
  }

  export const useLoginMutation = () => {
    const { signIn } = useAuth()
    return useMutation((input:LoginInput) => login(input), {
      onSuccess: (data) => {
        notifications.show({
          title: 'Success',
          message: 'Login successfully',
          color: 'green',
          autoClose: 5000,
        })
        signIn(data)
        return data;
      },
      onError: (error) => {
        notifications.show({
            title: 'Error',
            message: String(error),
            color: 'red',
            autoClose: 5000,
        })
      },
    });
  };