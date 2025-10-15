import apiCLient from "@/lib/axios-client";
import { AxiosError, type AxiosResponse } from "axios";
import { toast } from "sonner";

type HTTPMethod = "get" | "post" | "patch" | "delete";

const useApi = () => {
  const makeAPIRequest = async <T = unknown>(
    method: HTTPMethod,
    route: string,
    data?: T,
    successMessage?: string
  ) => {
    let response: AxiosResponse;
    try {
      const Config = { withCredentials: true };
      switch (method) {
        case "get":
          response = await apiCLient.get(route, Config);
          break;
        case "post":
          response = await apiCLient.post(route, data, Config);
          break;
        case "patch":
          response = await apiCLient.patch(route, data, Config);
          break;
        case "delete":
          response = await apiCLient.delete(route, Config);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }

      if (response?.status >= 200 && response?.status < 300) {
        if (successMessage) {
          toast.success(successMessage);
        }

        return {
          success: true,
          data: response.data,
        };
      }
    } catch (error) {
      const axiosErro = error as AxiosError;
      if (
        typeof axiosErro.response?.data === "string" &&
        axiosErro.response.data.length > 10
      ) {
        toast.error(axiosErro.response.data);
      }
      return { success: false };
    }
  };

  return {
    post: <T>(route: string, data: T, successMessage?: string) =>
      makeAPIRequest("post", route, data, successMessage),
    get: (route: string) => makeAPIRequest("get", route, undefined, undefined),
    patch: <T>(route: string, data: T, successMessage: string) =>
      makeAPIRequest("patch", route, data, successMessage),
    delete: (route: string, successMessage: string) =>
      makeAPIRequest("delete", route, undefined, successMessage),
  };
};

export default useApi;
