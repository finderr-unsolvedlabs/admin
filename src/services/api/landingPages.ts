import { sendRequest } from "@/services/api";
import { AxiosResponse } from "axios";
import { IBrandModel, IProductModel } from "../interfaces/common";

const baseURL = `/website/pages`;

const getDiwaliPicks = (): Promise<
  AxiosResponse<{ data: IProductModel[] }>
> => {
  return sendRequest(`${baseURL}/diwali-picks`);
};

const LandingPagesApi = { getDiwaliPicks };
export { LandingPagesApi };
