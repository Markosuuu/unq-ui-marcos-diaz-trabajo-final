import axios, { AxiosError, type AxiosResponse } from "axios";

type ApiResponse = {
  exists: boolean;
};

export const existeLaPalabra = async (str: string): Promise<boolean> => {
  return await axios
    .get<ApiResponse>(
      `https://word-api-hmlg.vercel.app/api/validate?word=${str}`,
    )
    .then((response: AxiosResponse<ApiResponse>) => response.data.exists)
    .catch((err: AxiosError) => Promise.reject(err.response?.data));
};

export const soloLetras = (str: string): boolean => {
  const regex = /^[A-Za-z]+$/;
  return regex.test(str);
};

export const reglaEncadenamiento = (
  palabra: string,
  ultimaPalabra: string,
): boolean => {
  return ultimaPalabra.slice(-1) !== palabra[0];
};

export const formalizarPalabra = (palabra: string): string => {
  return palabra
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};
