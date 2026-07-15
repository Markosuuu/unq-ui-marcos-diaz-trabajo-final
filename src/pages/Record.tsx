import { Navigate, useLocation, useNavigate } from "react-router";
import type { LeaderBoardItem } from "../types/types";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import style from "../styles/record.module.css";
import IngresarDato from "../components/IngresarDato";

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
      <article className={style["container"]}>
        <h1>Palabras encadenadas</h1>
        <section>
          <h2>Nuevo record!</h2>
          <div className={style["estadisticas"]}>
            <span>
              <img
                src="https://static.wikia.nocookie.net/terraria_gamepedia/images/3/3f/Large_world_icon.png/revision/latest?cb=20200921104250&format=original"
                alt=""
              />
              Puntaje: {puntaje}
            </span>
            <span>
              <img
                src="https://static.wikia.nocookie.net/terraria_gamepedia/images/2/25/World_seed_icon.png/revision/latest?cb=20200921104226&format=original"
                alt=""
              />
              Cantidad de palabras: {lista.length}
            </span>
          </div>
          <IngresarDato
            handleFunc={actualizarLeaderBoard}
            valorString={nombre}
            setString={setNombre}
            placerholder={"Ingrese su nick..."}
          />
        </section>
      </article>
    </main>
  );
};

export default Record;
