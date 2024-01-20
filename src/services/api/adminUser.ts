import { sendRequest } from "@/services/api";
import { AxiosResponse } from "axios";

const authUrl = `/admin/login`;

export interface ILogInForm {
  username: string;
  password: string;
}

const logIn = (
  props: ILogInForm
): Promise<AxiosResponse<{ token: string }>> => {
  return sendRequest(authUrl, {
    method: "post",
    data: props,
  });
};

const AdminUserApi = { logIn };
export { AdminUserApi };
