import { useState } from "react";
import { Link } from "react-router";
import type { LeaderBoardItem } from "../types/types";
import Leaderboard from "../components/Leaderboard";
import style from "../styles/scoreView.module.css";

const ScoreView = () => {
  const puntaje = Number(localStorage.getItem("puntaje") || 0);

  const [nombre, setNombre] = useState<string>("");
  const [leaderBoard, setLeaderBoard] = useState<LeaderBoardItem[]>(() => {
    const leaderBoardTemp = localStorage.getItem("leaderBoard");
    return leaderBoardTemp ? JSON.parse(leaderBoardTemp) : [];
  });

  const actualizarLeaderBoard = () => {
    const nuevoPuntaje: LeaderBoardItem = { nombre, puntaje };

    setLeaderBoard((prev: LeaderBoardItem[]) => {
      const actualizado = [...prev, nuevoPuntaje]
        .sort((a: LeaderBoardItem, b: LeaderBoardItem) => b.puntaje - a.puntaje)
        .slice(0, 10);

      return actualizado;
    });
  };

  return (
    <main>
      <article className={style["score-container"]}>
        <section className={style["section-puntaje"]}>
          <h1>Tiempo finalizado</h1>
          <span>Tu puntaje final fue: {puntaje}</span>

          <div hidden={leaderBoard[9].puntaje > puntaje}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                actualizarLeaderBoard();
              }}
              className="form-palabra"
            >
              <input
                type="text"
                placeholder="Ingrese su nombre..."
                className="ingresar-palabra"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <button type="submit" className="btn-palabra">
                Guardar puntaje
              </button>
              {/* TODO: Desaparecer botón una vez enviado & no aceptar nulos */}
            </form>
          </div>

          <Link to={"/"} className={style["btn-reiniciar"]}>
            Otra partida
          </Link>
        </section>
        <aside className={style["leaderBoard"]}>
          <Leaderboard leaderBoard={leaderBoard} />
        </aside>
      </article>
    </main>
  );
};

export default ScoreView;
