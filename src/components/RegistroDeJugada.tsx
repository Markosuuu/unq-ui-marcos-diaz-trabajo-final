import style from "../styles/game.module.css";

interface RegistroProp {
  palabra: string;
  puntaje: number;
}

const RegistroDeJugada = ({ palabra, puntaje }: RegistroProp) => {
  return (
    <aside className={style["lista-palabras"]}>
      <p>
        Última palabra ingresada: {palabra.slice(0, -1)}
        <span className={style["pista"]}>{palabra.slice(-1)}</span>
      </p>
      <p>
        Puntaje actual: <span>{puntaje}</span>
      </p>
    </aside>
  );
};

export default RegistroDeJugada;
