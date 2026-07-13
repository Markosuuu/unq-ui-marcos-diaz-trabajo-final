import { Route, Routes } from "react-router";
import Game from "./pages/Game";
import ScoreView from "./pages/ScoreView";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Game />} />
      <Route path="/leaderboard" element={<ScoreView />} />
      <Route path="*" element={<Game />} />
    </Routes>
  );
};

export default App;

{
  //<img src="https://ciaccodavi.de/qbdp/acg/alchemymod.php?coloured=1&id=1180968291" />
}
