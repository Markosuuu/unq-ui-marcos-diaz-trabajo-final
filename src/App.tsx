import { useState } from "react";
import "./App.css";

function App() {
  const [palabra, setPalabra] = useState<string>("");
  const [listaPalabras, setListaPalabras] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handlePalabra = (e: string) => {
    console.log(e);

    if (!soloLetras(e)) {
      return setError("Ingrese palabras válidas");
    }

    setListaPalabras([...listaPalabras, e]);

    setPalabra("");
    setError(null);
  };

  const soloLetras = (str: string) => {
    const regex = /^[A-Za-z]+$/;
    return regex.test(str);
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
        {listaPalabras.map((palabra, index) => (
          <li key={index}>{palabra}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
