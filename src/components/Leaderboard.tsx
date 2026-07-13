import type { LeaderBoardItem } from "../types/types";

type Props = {
  leaderBoard: LeaderBoardItem[];
};

const Leaderboard = ({ leaderBoard }: Props) => {
  return (
    <div>
      <h2>LeaderBoard</h2>
      <ul>
        {leaderBoard.map((item: LeaderBoardItem, index: number) => (
          <li key={index}>
            {item.nombre} - {item.puntaje} puntos
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
