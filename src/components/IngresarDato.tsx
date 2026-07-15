import style from "../styles/game.module.css";

interface IngresarDatoProp {
  handleFunc: (valor: string) => void;
  valorString: string;
  setString: (valor: string) => void;
}

const IngresarDato = ({
  valorString,
  handleFunc,
  setString,
}: IngresarDatoProp) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleFunc(valorString);
      }}
      className={style["form-palabra"]}
    >
      <input
        type="text"
        placeholder="Ingrese una palabra..."
        className={style["ingresar-palabra"]}
        value={valorString}
        onChange={(e) => setString(e.target.value)}
      />
      <button type="submit" className={style["btn-palabra"]}>
        Enviar
      </button>
    </form>
  );
};

export default IngresarDato;
