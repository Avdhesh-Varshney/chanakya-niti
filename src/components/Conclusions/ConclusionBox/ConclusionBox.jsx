import styles from "../ConclusionBox/ConclusionBox.module.css";
import quotes from "../../../components/Quotes/quotes.json";

function ConclusionBox({ epNum }) {
    return(
        <>
        <div className={styles.box}>
            {quotes[epNum-1].quote}
        </div>
        </>
    )
}

export default ConclusionBox;