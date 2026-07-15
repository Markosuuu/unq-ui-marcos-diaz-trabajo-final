import { useEffect, useState } from "react";
import style from "../styles/game.module.css";
import { validarPalabra } from "../services/palabrasService";
import type { LeaderBoardItem } from "../types/types";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import RegistroDeJugada from "../components/RegistroDeJugada";
import IngresarDato from "../components/IngresarDato";

const Game = () => {
  const gameSecond = 3;
  const [palabra, setPalabra] = useState<string>("");
  const [listaPalabras, setListaPalabras] = useState<string[]>([]);

  const [segundos, setSegundos] = useState<number>(gameSecond);
  const [isActivo, setIsActivo] = useState<boolean>(false);

  const [leaderBoard] = useState<LeaderBoardItem[]>(() => {
    const leaderBoardTemp = localStorage.getItem("leaderBoard");
    return leaderBoardTemp ? JSON.parse(leaderBoardTemp) : [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("leaderBoard", JSON.stringify(leaderBoard));
  }, [leaderBoard]);

  const puntaje = () => {
    return listaPalabras.reduce(
      (acc: number, palabra: string) => acc + palabra.length,
      0,
    );
  };

  useEffect(() => {
    if (!isActivo) return;

    if (segundos === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsActivo(false);

      // TODO: Emprolijar esto
      if (leaderBoard[leaderBoard.length - 1].puntaje < puntaje()) {
        navigate("/record", {
          state: {
            puntaje: puntaje(),
            lista: listaPalabras,
          },
        });
      } else {
        navigate("/score", {
          state: {
            puntaje: puntaje(),
            lista: listaPalabras,
          },
        });
      }
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
      toast.error(resultado.error || "Error desconocido");
      return;
    }

    if (listaPalabras.length === 0) {
      setIsActivo(true);
    }

    setListaPalabras([...listaPalabras, resultado.palabra || ""]);
    setSegundos(gameSecond);
  };

  return (
    <main>
      <article className={style["container"]}>
        <h1 className={style["titulo"]}>Palabras encadenadas</h1>
        <section>
          <div className={style["timer"]}>
            <span>{segundos}</span>
          </div>
          <IngresarDato
            handleFunc={handlePalabra}
            valorString={palabra}
            setString={setPalabra}
          />
        </section>
        {listaPalabras.length > 0 && (
          <RegistroDeJugada
            palabra={listaPalabras[listaPalabras.length - 1]}
            puntaje={puntaje()}
          />
        )}
      </article>
    </main>
  );
};

export default Game;
