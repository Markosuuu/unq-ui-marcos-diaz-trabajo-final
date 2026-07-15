import type { LeaderBoardItem } from "../types/types";
import style from "../styles/leaderboard.module.css";

type Props = {
  leaderBoard: LeaderBoardItem[];
};

const Leaderboard = ({ leaderBoard }: Props) => {
  return (
    <>
      <h2 className={style["titulo"]}>Leaderboard</h2>
      <table className={style["tablero-puntajes"]}>
        <tr className={style["cabecera-leaderboard"]}>
          <td>Puesto</td>
          <td>Nombre</td>
          <td>Puntos</td>
        </tr>
        {leaderBoard.map((item: LeaderBoardItem, index: number) => (
          <tr key={index}>
            <td>{"N°" + (index + 1)}</td>
            <td>{item.nombre}</td>
            <td>{item.puntaje}</td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default Leaderboard;
