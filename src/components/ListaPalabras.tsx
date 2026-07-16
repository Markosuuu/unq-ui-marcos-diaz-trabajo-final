import style from "../styles/scoreView.module.css";

interface ListaPalabrasProp {
  lista: string[];
}

const ListaPalabras = ({ lista }: ListaPalabrasProp) => {
  return (
    <aside className={style["lista-palabras"]}>
      <ul>
        {lista.map((palabra: string, index: number) => (
          <li key={index}>{palabra}</li>
        ))}
      </ul>
    </aside>
  );
};

export default ListaPalabras;
