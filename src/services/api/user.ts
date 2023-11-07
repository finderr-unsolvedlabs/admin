import { sendRequest } from "@/services/api";
import { AxiosResponse } from "axios";
import { ILeadModel } from "../interfaces/common";

const authUrl = `/website/auth`;
const leadUrl = `/website/create-product-lead`;

interface IVerifyOtp {
  otp: number;
  mobile: string;
}

interface ISingInForm {
  mobile: string;
  countryCode: string;
}

const verifyOtp = (
  props: IVerifyOtp
): Promise<AxiosResponse<{ token: string }>> => {
  return sendRequest(`${authUrl}/verify-otp`, {
    method: "post",
    data: props,
  });
};

const signIn = (props: ISingInForm): Promise<AxiosResponse<string>> => {
  return sendRequest(`${authUrl}/sign-in`, {
    method: "post",
    data: props,
  });
};

// TODO: move to admin
const fetchLeads = (): Promise<AxiosResponse<ILeadModel[]>> => {
  return sendRequest(`/website/get-leads`);
};

const UserApi = { verifyOtp, signIn, fetchLeads };
export { UserApi };
