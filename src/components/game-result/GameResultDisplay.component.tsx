import { useEffect, useState } from "react";
import styles from "./GameResultDisplay.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { GameState } from "@/types/types";
import { updateRound } from "@/redux/reducers/gameSlice";
import { RESULT_DISPLAY_DELAY } from "@/constants/constants";
import { calculateBetMultiplier } from "@/lib/game-logic";

export function GameResultDisplay() {
    const [headerContent, setHeaderContent] = useState("Choose your positions");
    const [showResult, setShowResult] = useState("");
    const dispatch = useDispatch();
    const gameResult: any = useSelector(
        (state: GameState) => state?.gameElement?.gameResult
    );
    const positionsData: any = useSelector(
        (state: GameState) => state?.gameElement?.positionData
    );

    useEffect(() => {
        setShowResult("");
        if (!gameResult.computerItem) {
            setHeaderContent("Choose your positions");
            return;
        }

        const {
            playerItem,
            computerItem,
            winnerItem,
            winnerIsPlayer,
            winnerIsComputer,
        } = gameResult;

        if (playerItem && computerItem) {
            setHeaderContent(`${playerItem} vs ${computerItem}`);
            const betMultiplier = calculateBetMultiplier(gameResult, positionsData);

            setTimeout(() => {
                setHeaderContent(winnerItem ? `${winnerItem} won` : "");
                if (winnerIsPlayer) {
                    const totalWin = betMultiplier * gameResult.winningBet;
                    setShowResult(`You won <span>${totalWin}</span>`);
                } else if (winnerIsComputer) {
                    setShowResult("Computer Win");
                } else {
                    setShowResult("Tie");
                }
                dispatch(updateRound(false));
            }, RESULT_DISPLAY_DELAY);
        }
        // eslint-disable-next-line
    }, [gameResult]);

    return (
        <div className={styles.gameHeader}>
            <h2 className={showResult ? styles.gameHeader__headingGreen : ""}>{headerContent}</h2>
            {showResult && <div dangerouslySetInnerHTML={{ __html: showResult }} className={styles.gameHeader__result} />}
        </div>
    );
}
