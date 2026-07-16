import { useState } from "react";
import { Link, useLocation, Navigate } from "react-router";
import type { LeaderBoardItem } from "../types/types";
import Leaderboard from "../components/Leaderboard";
import style from "../styles/scoreView.module.css";
import ListaPalabras from "../components/ListaPalabras";

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
        <h1 className={style["titulo"]}>Palabras encadenadas</h1>
        {leaderBoard.length != 0 && (
          <aside className={style["leaderBoard"]}>
            <Leaderboard leaderBoard={leaderBoard} />
          </aside>
        )}
        <section className={style["section-puntaje"]}>
          <div className={style["estadisticas"]}>
            <h2>Estadisticas</h2>
            <span>
              <img
                src="https://static.wikia.nocookie.net/terraria_gamepedia/images/2/25/World_seed_icon.png/revision/latest?cb=20200921104226&format=original"
                alt=""
              />
              Tu puntaje final fue: {puntaje}
            </span>
            <span>
              <img
                src="https://static.wikia.nocookie.net/terraria_gamepedia/images/0/00/World_name_icon.png/revision/latest?cb=20200921104151&format=original"
                alt=""
              />
              Cantidad de palabras: {lista.length}
            </span>
          </div>
          <Link to={"/"} className={style["btn-reiniciar"]}>
            Otra partida
          </Link>
        </section>
        <ListaPalabras lista={lista} />
      </article>
    </main>
  );
};

export default ScoreView;
