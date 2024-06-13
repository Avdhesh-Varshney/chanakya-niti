import styles from "../Conclusions/Conclusion.module.css";
import ConclusionBox from "./ConclusionBox/ConclusionBox";

function Conclusion({ handleOnClick, conclusionbox, getEpNum }) {

  return (
    <>
      <button className={styles.button} onClick={handleOnClick}>Conclusion</button>
      {conclusionbox ? <ConclusionBox epNum={getEpNum()} /> : ""}
    </>
  );
}

export default Conclusion;