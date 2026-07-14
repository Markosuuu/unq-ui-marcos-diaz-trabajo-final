import { useEffect, useState } from "react";
import style from "../styles/game.module.css";
import { validarPalabra } from "../services/palabrasService";
import type { LeaderBoardItem } from "../types/types";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Game = () => {
  const gameSecond = 2;
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
      navigate("/score", {
        state: {
          puntaje: puntaje(),
          lista: listaPalabras,
        },
      });
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
        <h1>Palabras encadenadas</h1>
        <section>
          <div className={style["timer"]}>
            {segundos !== 0 && <span>{segundos}</span>}
          </div>
          {segundos !== 0 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlePalabra(palabra);
              }}
              className={style["form-palabra"]}
            >
              <input
                type="text"
                placeholder="Ingrese una palabra..."
                className={style["ingresar-palabra"]}
                value={palabra}
                onChange={(e) => setPalabra(e.target.value)}
              />
              <button type="submit" className={style["btn-palabra"]}>
                Enviar
              </button>
            </form>
          )}
        </section>
        <aside className={style["lista-palabras"]}>
          <p>
            Última palabra ingresada:{" "}
            <span>{listaPalabras[listaPalabras.length - 1]}</span>
          </p>
          <p>
            Puntaje actual: <span>{puntaje()}</span>
          </p>
        </aside>
      </article>
    </main>
  );
};

export default Game;
