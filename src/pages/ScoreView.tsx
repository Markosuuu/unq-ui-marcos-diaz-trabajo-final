import { useState } from "react";
import { Link, useLocation, Navigate } from "react-router";
import type { LeaderBoardItem } from "../types/types";
import Leaderboard from "../components/Leaderboard";
import style from "../styles/scoreView.module.css";

const ScoreView = () => {
  const [leaderBoard] = useState<LeaderBoardItem[]>(() => {
    const leaderBoardTemp = localStorage.getItem("leaderBoard");
    return leaderBoardTemp ? JSON.parse(leaderBoardTemp) : [];
  });

  const location = useLocation();

  if (location.state === null) {
    return <Navigate to="/" replace />;
  }

  const { puntaje, lista } = location.state;

  return (
    <main>
      <article className={style["score-container"]}>
        <section className={style["section-puntaje"]}>
          <h1>Tiempo finalizado</h1>
          <span>Tu puntaje final fue: {puntaje}</span>
          <Link to={"/"} className={style["btn-reiniciar"]}>
            Otra partida
          </Link>
        </section>
        {leaderBoard.length != 0 && (
          <aside className={style["leaderBoard"]}>
            <Leaderboard leaderBoard={leaderBoard} />
          </aside>
        )}
        <aside className={style["lista-palabras"]}>
          <ul>
            {lista.map((palabra: string, index: number) => (
              <li key={index}>{palabra}</li>
            ))}
          </ul>
        </aside>
      </article>
    </main>
  );
};

export default ScoreView;
