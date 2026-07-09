import { useState } from "react";
import "./App.css";
import { validarPalabra } from "./services/palabrasService";

const App = () => {
  const [palabra, setPalabra] = useState<string>("");
  const [listaPalabras, setListaPalabras] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handlePalabra = async (palabra: string) => {
    setPalabra("");

    const resultado = await validarPalabra(palabra, listaPalabras);

    if (!resultado.valido) {
      return setError(resultado.error || "Error desconocido");
    }

    setListaPalabras([...listaPalabras, resultado.palabra || ""]);
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
