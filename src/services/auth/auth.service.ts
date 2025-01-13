import ApiService from "@/services/ApiService";
import {SignInResponse} from "@/@types/auth";

export const AuthService = {
  async signIn(account: string, password: string): Promise<SignInResponse> {
    const res = await ApiService.fetchData<{ account: string, password: string }, SignInResponse>({
      url: '/auth/login',
      method: 'POST',
      data: {account, password}
    })
    return res.data;
  }
}
