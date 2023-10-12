import { IFilterSearchOrder } from "@/hook/useGetFetchOrders";
import { IOrder, RootOrder, Service } from "../../../types/order";
import { Api } from "./axios-config";

class OrderApi {
  getAllOrder(filter: IFilterSearchOrder = { status: "", search: "", customer: "" }, page = 1, limit = 10) {
    return Api.get<RootOrder>(`order/?filter=${JSON.stringify(filter)}&page=${page}&limit=${limit}`);
  }
  getPendingOrder(filter: IFilterSearchOrder = { status: "", search: "", customer: "" }, page = 1, limit = 10) {
    return Api.get<RootOrder>(`order/pending?filter=${JSON.stringify(filter)}&page=${page}&limit=${limit}`);
  }

  async createOrder(data: IOrder, customerId: string) {
    const res = await Api.post("order", {
      equipment: data.equipment,
      brand: data.brand,
      model: data.model,
      defect: data.defect,
      observation: data.observation,
      dateEntry: data.dateEntry,
      services: [],
      status: data.status,
      customer: customerId,
    });
    return res;
  }

  async getCustomerOrders(id: string, filter: IFilterSearchOrder = { search: "" }, page = 1, limit = 10) {
    try {
      const data = await Api.get(
        `order/customer?customerId=${id}&filter=${JSON.stringify(filter)}&$page=${page}&limit=${limit}`
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  deleteOrder(id: string) {
    return Api.delete(`order/${id}`);
  }

  async updateOrder(data: IOrder, orderId: string) {
    try {
      const res = await Api.put(`order/${orderId}`, {
        equipment: data.equipment,
        brand: data.brand,
        model: data.model,
        defect: data.defect,
        discount: data.discount,
        technicalOpinion: data.technicalOpinion,
        observation: data.observation,
        dateEntry: data.dateEntry,
        services: data.services,
        status: data.status,
        customer: data.customer,
        exitDate: data.exitDate,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}

export const orderApi = new OrderApi();
