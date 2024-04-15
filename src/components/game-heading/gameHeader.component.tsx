import { useEffect, useState } from "react";
import styles from "./gameHeader.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { GameState } from "../../types/types";
import { updateRound } from "../../redux/reducers/gameSlice";

export function GameHeader({ totalWin }: { totalWin: number }) {
    const [headerContent, setHeaderContent] = useState("Choose your positions");
    const [showResult, setShowResult] = useState("");
    const dispatch = useDispatch();
    const gameResult: any = useSelector(
        (state: GameState) => state?.gameElement?.gameResult
    );

    useEffect(() => {
        setShowResult("");
        if (!gameResult || !gameResult.gameResult) {
            setHeaderContent("Choose your positions");
            return;
        }

        const {
            playerItem,
            computerItem,
            winnerItem,
            winnerIsPlayer,
            winnerIsComputer,
        } = gameResult.gameResult;

        if (playerItem && computerItem) {
            setHeaderContent(`${playerItem} vs ${computerItem}`);

            setTimeout(() => {
                setHeaderContent(winnerItem ? `${winnerItem} won` : "");
                if (winnerIsPlayer) {
                    setShowResult(`You won <span>${totalWin}</span>`);
                } else if (winnerIsComputer) {
                    setShowResult("Computer Win");
                } else {
                    setShowResult("its tie");
                }
                dispatch(updateRound(false));
            }, 2000);
        }
    }, [gameResult]);

    return (
        <div className={`${styles.gameHeader} mb-100`}>
            <h2 className={showResult ? styles.gameHeader__headingGreen : ""}>{headerContent}</h2>
            {showResult && <div dangerouslySetInnerHTML={{ __html: showResult }} className={styles.gameHeader__result} />}
        </div>
    );
}
