import axios, { AxiosError, type AxiosResponse } from "axios";

type ApiResponse = {
  exists: boolean;
};

type ResultadoValidacion = {
  valido: boolean;
  error?: string;
  palabra?: string;
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

export const validarPalabra = async (
  palabra: string,
  listaPalabras: string[],
): Promise<ResultadoValidacion> => {
  const palabraFormateada = formalizarPalabra(palabra);

  // TODO: Consultar que onda esta hermosa cadena de IFs
  if (!soloLetras(palabraFormateada)) {
    return { valido: false, error: "Ingrese palabras válidas." };
  }

  if (listaPalabras.includes(palabraFormateada)) {
    return { valido: false, error: "La palabra ya fue ingresada." };
  }

  if (
    listaPalabras.length > 0 &&
    reglaEncadenamiento(
      palabraFormateada,
      listaPalabras[listaPalabras.length - 1],
    )
  ) {
    return {
      valido: false,
      error: "La palabra no respeta la regla de encadenamiento.",
    };
  }

  try {
    const existe = await existeLaPalabra(palabraFormateada);
    if (!existe) {
      return { valido: false, error: "La palabra no existe." };
    }
  } catch {
    return { valido: false, error: "Error al verificar la palabra." };
  }

  return { valido: true, palabra: palabraFormateada };
};
