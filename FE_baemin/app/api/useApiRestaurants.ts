import axiosInstance from "@/apis/axiosConfig"
import { notification } from "antd";

const servicePath = "/restaurants"

const useApiRestaurants = () => {
  const [api] = notification.useNotification();

  const getAllRestaurants = async () => {
    try {
      const resp = await axiosInstance.get<Restaurant[]>(servicePath)
      if (resp) {
        localStorage.setItem('allRestaurants', JSON.stringify(resp.data))
        return resp
      }
    } catch (error) {
      api.error({
        message: `${error}`
      });
    }
  }

  const getRestaurantById = async (id: string) => {
    try {
      const resp = await axiosInstance.get<Restaurant>(servicePath + '/' + id)
      if (resp) {
        return resp
      }
    } catch (error) {
      api.error({
        message: `${error}`
      });
    }
  }

  const getRestaurantsByIdCategory = async (id: string, page: number, size: number, query: string) => {
    try {
      const resp = await axiosInstance.get<CustomRestaurant>(servicePath + '/categories/foods', {
        params: {
          ...(id != "all" && id && { categorie: id }) ,
          page,
          size,
          query
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
    getAllRestaurants,
    getRestaurantById,
    getRestaurantsByIdCategory
  }
}

export default useApiRestaurants