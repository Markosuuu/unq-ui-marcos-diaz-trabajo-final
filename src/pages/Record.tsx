import { Navigate, useLocation, useNavigate } from "react-router";
import type { LeaderBoardItem } from "../types/types";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import style from "../styles/scoreView.module.css";

const Record = () => {
  const [nombre, setNombre] = useState<string>("");
  const [leaderBoard, setLeaderBoard] = useState<LeaderBoardItem[]>(() => {
    const leaderBoardTemp = localStorage.getItem("leaderBoard");
    return leaderBoardTemp ? JSON.parse(leaderBoardTemp) : [];
  });
  useEffect(() => {
    localStorage.setItem("leaderBoard", JSON.stringify(leaderBoard));
  }, [leaderBoard]);
  const location = useLocation();
  const navigate = useNavigate();
  if (location.state === null) {
    return <Navigate to="/" replace />;
  }

  const { puntaje, lista } = location.state;

  const actualizarLeaderBoard = () => {
    if (nombre === "") {
      toast.error("Ingrese su nombre por favor");
      return;
    }

    const nuevoPuntaje: LeaderBoardItem = { nombre, puntaje };

    setLeaderBoard((prev: LeaderBoardItem[]) => {
      const actualizado = [...prev, nuevoPuntaje]
        .sort((a: LeaderBoardItem, b: LeaderBoardItem) => b.puntaje - a.puntaje)
        .slice(0, 10);

      return actualizado;
    });

    navigate("/score", {
      state: {
        puntaje: puntaje,
        lista: lista,
      },
    });
  };

  return (
    <main>
      <div>
        <h1>Nuevo record!</h1>
        <p>Ingrese su nombre para registrarlo en el top</p>
        <p>Puntaje: {puntaje}</p>
      </div>
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
    </main>
  );
};

export default Record;
