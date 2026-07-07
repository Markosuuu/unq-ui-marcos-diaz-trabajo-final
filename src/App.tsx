import { useState } from "react";
import "./App.css";
import axios, { AxiosError, type AxiosResponse } from "axios";

type ApiResponse = {
  exists: boolean;
};

const App = () => {
  const [palabra, setPalabra] = useState<string>("");
  const [listaPalabras, setListaPalabras] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handlePalabra = async (e: string) => {
    console.log(e);

    const { exists } = await existeLaPalabra(e);
    // TODO: Sacar a un service

    if (!soloLetras(e) || !exists) {
      return setError("Ingrese palabras válidas");
    }

    setListaPalabras([...listaPalabras, e]);

    setPalabra("");
    setError(null);
  };

  // TODO: Sacar a un service
  const soloLetras = (str: string): boolean => {
    const regex = /^[A-Za-z]+$/;
    return regex.test(str);
  };

  // TODO: Sacar a un service
  const existeLaPalabra = async (str: string): Promise<ApiResponse> => {
    return await axios
      .get(`https://word-api-hmlg.vercel.app/api/validate?word=${str}`)
      .then((response: AxiosResponse<ApiResponse>) => response.data)
      .catch((err: AxiosError) => Promise.reject(err.response?.data));
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlePalabra(palabra);
        }}
      >
        <input
          type="text"
          placeholder="Ingrese una palabra..."
          value={palabra}
          onChange={(e) => setPalabra(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {listaPalabras.map((palabra: string, index: number) => (
          <li key={index}>{palabra}</li>
        ))}
      </ul>
    </>
  );
};

export default App;
