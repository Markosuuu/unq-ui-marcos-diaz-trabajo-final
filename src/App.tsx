import { useState } from "react";
import "./App.css";
import {
  existeLaPalabra,
  soloLetras,
  reglaEncadenamiento,
} from "./services/palabrasService";

const App = () => {
  const [palabra, setPalabra] = useState<string>("");
  const [listaPalabras, setListaPalabras] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handlePalabra = async (palabra: string) => {
    setPalabra("");

    if (!soloLetras(palabra)) return setError("Ingrese palabras válidas.");

    if (listaPalabras.includes(palabra))
      return setError("La palabra ya fue ingresada.");

    if (
      listaPalabras.length > 0 &&
      reglaEncadenamiento(palabra, listaPalabras[listaPalabras.length - 1])
    ) {
      return setError("La palabra no respeta la regla de encadenamiento.");
    }

    try {
      const existe = await existeLaPalabra(palabra);

      if (!existe) return setError("La palabra no existe.");
    } catch {
      return setError("Error al verificar la palabra");
    }

    setListaPalabras([...listaPalabras, palabra]);

    setError(null);
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
