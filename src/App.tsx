import { useEffect, useState } from "react";
import "./App.css";
import { validarPalabra } from "./services/palabrasService";

const App = () => {
  const [palabra, setPalabra] = useState<string>("");
  const [listaPalabras, setListaPalabras] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [segundos, setSegundos] = useState<number>(15);
  const [isActivo, setIsActivo] = useState<boolean>(false);

  const puntaje = listaPalabras.reduce(
    (acc, palabra) => acc + palabra.length,
    0,
  );

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
  }, [isActivo, segundos]);

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

  const handleReiniciar = () => {
    setSegundos(15);
    setIsActivo(false);
    setListaPalabras([]);
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

      {segundos === 0 && (
        <div>
          <span>Puntaje final: {puntaje}</span>
          <button onClick={handleReiniciar}>Otra partida</button>
        </div>
      )}
    </>
  );
};

export default App;
