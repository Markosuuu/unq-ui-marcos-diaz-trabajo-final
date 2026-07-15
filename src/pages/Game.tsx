import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import style from "../styles/game.module.css";
import { validarPalabra } from "../services/palabrasService";
import type { LeaderBoardItem } from "../types/types";

import RegistroDeJugada from "../components/RegistroDeJugada";
import IngresarDato from "../components/IngresarDato";

const Game = () => {
  const gameSecond = 15;
  const [palabra, setPalabra] = useState<string>("");
  const [listaPalabras, setListaPalabras] = useState<string[]>([]);
  const [puntaje, setPuntaje] = useState<number>(0);

  const [segundos, setSegundos] = useState<number>(gameSecond);
  const [isActivo, setIsActivo] = useState<boolean>(false);

  const [leaderBoard] = useState<LeaderBoardItem[]>(() => {
    const leaderBoardTemp = localStorage.getItem("leaderBoard");
    return leaderBoardTemp ? JSON.parse(leaderBoardTemp) : [];
  });

  const navigate = useNavigate();

  /**
   * Descuenta el timer
   *
   * Además, si termina el tiempo redirige
   * al usuario a la siguiente sección
   */
  useEffect(() => {
    if (!isActivo) return;

    if (segundos === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsActivo(false);

      const esRecord =
        leaderBoard.length < 10 ||
        leaderBoard[leaderBoard.length - 1].puntaje < puntaje;

      navigate(esRecord ? "/record" : "/score", {
        state: {
          puntaje: puntaje,
          lista: listaPalabras,
        },
      });
    }

    const timer = setTimeout(() => {
      setSegundos((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isActivo, segundos]);

  /**
   * Maneja la palabra ingresada por el usuario contra la api de la cátedra
   * En caso de haber algún error, levanta un toast indicando el error
   * De ser la primera palabra ingresada, inicia el juego y empieza a correr el tiempo
   *
   * @param palabra Una palabra
   */
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
    setPuntaje(puntaje + (resultado.palabra?.length || 0));
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
            placerholder="Ingrese una palabra..."
          />
        </section>
        {listaPalabras.length > 0 && (
          <RegistroDeJugada
            palabra={listaPalabras[listaPalabras.length - 1]}
            puntaje={puntaje}
          />
        )}
      </article>
    </main>
  );
};

export default Game;
