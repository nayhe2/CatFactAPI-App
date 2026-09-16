import type { CatFact } from "./types";
import axiosInstance from "./axiosClient";

export const getFact = async (): Promise<CatFact> => {
  const response = await axiosInstance.get("/catfact");
  return response.data;
};

export const getHistory = async (): Promise<CatFact[]> => {
  const response = await axiosInstance.get("/catfact/history");
  return response.data;
};
