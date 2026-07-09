import { useEffect, useState } from "react";
import "./App.css";
import { validarPalabra } from "./services/palabrasService";

const App = () => {
  const [palabra, setPalabra] = useState<string>("");
  const [listaPalabras, setListaPalabras] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [segundos, setSegundos] = useState<number>(15);
  const [isActivo, setIsActivo] = useState<boolean>(false);

  useEffect(() => {
    if (!isActivo) return;

    if (segundos === 0) {
      setIsActivo(false);
      return;
    }

    const timer = setTimeout(() => {
      setSegundos((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isActivo, segundos]); // TODO: Botón para iniciar devuelta el contador

  const handlePalabra = async (palabra: string) => {
    setPalabra("");

    const resultado = await validarPalabra(palabra, listaPalabras);

    if (!resultado.valido) {
      return setError(resultado.error || "Error desconocido");
    }

    if (listaPalabras.length === 0) {
      setIsActivo(true);
    }

    setListaPalabras([...listaPalabras, resultado.palabra || ""]);
    setSegundos(15);
    setError(null);
  };

  return (
    <>
      <div className="timer">
        {segundos !== 0 ? (
          <span>{segundos}</span>
        ) : (
          <span>Tiempo finalizado</span>
        )}
      </div>
      {segundos !== 0 && (
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
      )}
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
