import { useEffect, useState } from "react";
import "../App.css";
import { validarPalabra } from "../services/palabrasService";
import type { LeaderBoardItem } from "../types/types";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Game = () => {
  const [palabra, setPalabra] = useState<string>("");
  const [listaPalabras, setListaPalabras] = useState<string[]>([]);

  const [segundos, setSegundos] = useState<number>(15);
  const [isActivo, setIsActivo] = useState<boolean>(false);

  const [leaderBoard] = useState<LeaderBoardItem[]>(() => {
    const leaderBoardTemp = localStorage.getItem("leaderBoard");
    return leaderBoardTemp ? JSON.parse(leaderBoardTemp) : [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("leaderBoard", JSON.stringify(leaderBoard));
  }, [leaderBoard]);

  useEffect(() => {
    if (!isActivo) return;

    if (segundos === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsActivo(false);
      navigate("/leaderboard");
    }

    const timer = setTimeout(() => {
      setSegundos((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isActivo, navigate, segundos]);

  const handlePalabra = async (palabra: string) => {
    setPalabra("");

    const resultado = await validarPalabra(palabra, listaPalabras);

    if (!resultado.valido) {
      toast.error(resultado.error || "Error desconocido");
      return;
    }

    if (listaPalabras.length === 0) {
      setIsActivo(true);
    }

    setListaPalabras([...listaPalabras, resultado.palabra || ""]);
    setSegundos(15);
  };

  const puntaje = listaPalabras.reduce(
    (acc: number, palabra: string) => acc + palabra.length,
    0,
  );

  localStorage.setItem("puntaje", puntaje.toString());

  return (
    <main className="main-container">
      <div className="timer">{segundos !== 0 && <span>{segundos}</span>}</div>
      {segundos !== 0 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePalabra(palabra);
          }}
          className="form-palabra"
        >
          <input
            type="text"
            placeholder="Ingrese una palabra..."
            className="ingresar-palabra"
            value={palabra}
            onChange={(e) => setPalabra(e.target.value)}
          />
          <button type="submit" className="btn-palabra">
            Enviar
          </button>
        </form>
      )}
      <ul>
        {listaPalabras.map((palabra: string, index: number) => (
          <li key={index}>{palabra}</li>
        ))}
      </ul>
    </main>
  );
};

export default Game;
