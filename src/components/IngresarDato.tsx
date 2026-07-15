import style from "../styles/form.module.css";

interface IngresarDatoProp {
  handleFunc: (valor: string) => void;
  valorString: string;
  setString: (valor: string) => void;
  placerholder: string;
}

const IngresarDato = ({
  valorString,
  handleFunc,
  setString,
  placerholder,
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
        placeholder={placerholder}
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
