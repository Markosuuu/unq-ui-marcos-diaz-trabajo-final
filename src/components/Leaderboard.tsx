import type { LeaderBoardItem } from "../types/types";
import style from "../styles/leaderboard.module.css";

import copper from "../assets/Copper_Coin.gif";
import silver from "../assets/Silver_Coin.gif";
import gold from "../assets/Gold_Coin.gif";
import platinum from "../assets/Platinum_Coin.gif";

type Props = {
  leaderBoard: LeaderBoardItem[];
};

const Leaderboard = ({ leaderBoard }: Props) => {
  const elegirMoneda = (n: number) => {
    switch (true) {
      case 0 == n:
        return platinum;
      case n < 4:
        return gold;
      case n < 7:
        return silver;
      default:
        return copper;
    }
  };

  return (
    <>
      <h2 className={style["titulo"]}>Leaderboard</h2>
      <ul className={style["lista-puntajes"]}>
        {leaderBoard.map((item: LeaderBoardItem, index: number) => (
          <li key={index}>
            <div className={style["nombres-leaderboard"]}>
              <img src={elegirMoneda(index)} alt="" />
              <span>{item.nombre}</span>
            </div>
            <span className={style["puntaje-leaderboard"]}>{item.puntaje}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Leaderboard;
