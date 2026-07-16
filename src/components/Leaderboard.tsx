import type { LeaderBoardItem } from "../types/types";
import style from "../styles/leaderboard.module.css";

type Props = {
  leaderBoard: LeaderBoardItem[];
};

const Leaderboard = ({ leaderBoard }: Props) => {
  const elegirMoneda = (n: number) => {
    switch (true) {
      case 0 == n:
        return "https://static.wikia.nocookie.net/terraria_gamepedia/images/f/f8/Platinum_Coin.gif/revision/latest?cb=20150713204825&format=original";
      case n < 4:
        return "https://static.wikia.nocookie.net/terraria_gamepedia/images/b/b0/Gold_Coin.gif/revision/latest?cb=20150713204755&format=original";
      case n < 7:
        return "https://static.wikia.nocookie.net/terraria_gamepedia/images/c/cf/Silver_Coin.gif/revision/latest?cb=20150713204034&format=original";
      default:
        return "https://static.wikia.nocookie.net/terraria_gamepedia/images/8/8f/Copper_Coin.gif/revision/latest?cb=20150703190535&format=original";
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
