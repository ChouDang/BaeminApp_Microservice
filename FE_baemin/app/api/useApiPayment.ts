import axiosInstance from "@/apis/axiosConfig";
import { notification } from "antd";

const servicePath = "/payment"

const useApiPayment = () => {
  const [api] = notification.useNotification();

  const onInitOrderFood = async (data: any) => {
    try {
      const resp = await axiosInstance.post(servicePath, data)
      if (resp) {
        return resp
      }
    } catch (error) {
      api.error({
        message: `${error}`
      });
    }
  }

  const onGetOrder = async (data: any) => {
    try {
      const resp = await axiosInstance.get(servicePath + "/orderDetail", {
        params: {
          id: data
        }
      })
      if (resp) {
        return resp
      }
    } catch (error) {
      api.error({
        message: `${error}`
      });
    }
  }

  return {
    onInitOrderFood,
    onGetOrder
  }
}

export default useApiPayment