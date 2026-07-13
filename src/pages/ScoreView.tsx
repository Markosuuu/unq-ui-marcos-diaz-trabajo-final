import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import type { LeaderBoardItem } from "../types/types";
import Leaderboard from "../components/Leaderboard";
import style from "../styles/scoreView.module.css";
import { toast } from "react-toastify";

// TODO: Bug que al reiniciar te deja enviar nuevamente el puntaje
const ScoreView = () => {
  const location = useLocation();
  const { puntaje } = location.state ?? {};

  const [nombre, setNombre] = useState<string>("");
  const [leaderBoard, setLeaderBoard] = useState<LeaderBoardItem[]>(() => {
    const leaderBoardTemp = localStorage.getItem("leaderBoard");
    return leaderBoardTemp ? JSON.parse(leaderBoardTemp) : [];
  });

  const [enviado, setEnviado] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("leaderBoard", JSON.stringify(leaderBoard));
  }, [leaderBoard]);

  const actualizarLeaderBoard = () => {
    if (nombre === "") {
      toast.error("Ingrese su nombre por favor");
      return;
    }

    const nuevoPuntaje: LeaderBoardItem = { nombre, puntaje };

    setEnviado(true);

    setLeaderBoard((prev: LeaderBoardItem[]) => {
      const actualizado = [...prev, nuevoPuntaje]
        .sort((a: LeaderBoardItem, b: LeaderBoardItem) => b.puntaje - a.puntaje)
        .slice(0, 10);

      return actualizado;
    });
  };

  const mostrarNuevoTop =
    leaderBoard.length == 0 ||
    (leaderBoard[leaderBoard.length - 1].puntaje <= puntaje && !enviado);

  return (
    <main>
      <article className={style["score-container"]}>
        <section className={style["section-puntaje"]}>
          <h1>Tiempo finalizado</h1>
          <span>Tu puntaje final fue: {puntaje}</span>

          {mostrarNuevoTop && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                actualizarLeaderBoard();
              }}
              className={style["form-nombre"]}
            >
              <input
                type="text"
                placeholder="Ingrese su nombre..."
                className={style["ingresar-nombre"]}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <button type="submit" className={style["btn-nombre"]}>
                Guardar puntaje
              </button>
            </form>
          )}

          <Link to={"/"} className={style["btn-reiniciar"]}>
            Otra partida
          </Link>
        </section>

        {leaderBoard.length != 0 && (
          <aside className={style["leaderBoard"]}>
            <Leaderboard leaderBoard={leaderBoard} />
          </aside>
        )}
      </article>
    </main>
  );
};

export default ScoreView;
