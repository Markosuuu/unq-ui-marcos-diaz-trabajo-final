import "./App.css";

import { Route, Routes } from "react-router";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Game from "./pages/Game";
import ScoreView from "./pages/ScoreView";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/score" element={<ScoreView />} />
        <Route path="*" element={<Game />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
};

export default App;

{
  //<img src="https://ciaccodavi.de/qbdp/acg/alchemymod.php?coloured=1&id=1180968291" />
}
