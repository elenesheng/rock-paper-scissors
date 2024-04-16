import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { play, calculateBetMultiplier } from "@/lib/game-logic";
import {
    incrementPlayerScore,
    gameStats,
    updateBalance,
    updatePosition,
    updateRound,
    resetGame
} from "@/redux/reducers/gameSlice";
import { Header } from "@/components/header";
import { BetOption } from "@/components/bet-option";
import styles from "./game.module.scss";
import { GameResultDisplay } from "@/components/game-result";
import { GameState } from "@/types/types";
import {
    GAME_ITEMS,
    BET_UPDATE_AMOUNT,
    RESULT_DISPLAY_DELAY
} from "@/constants/constants";

const GameComponent: React.FC = () => {
    const dispatch = useDispatch();
    const [chosenButtons, setChosenButtons] = useState<string[]>([]);
    const [shouldReset, setShouldReset] = useState(false);
    const balance: any = useSelector(
        (state: GameState) => state?.gameElement?.balance
    );
    const positionsData: any = useSelector(
        (state: GameState) => state?.gameElement?.positionData
    );
    const isRoundGoing: any = useSelector(
        (state: GameState) => state?.gameElement?.ongoingRound
    );
    const totalBet = positionsData.positions.length ? positionsData.positions.reduce(
        (total: any, pos: any) => total + pos.bet, 0) : 0;

    const handlePlay = async () => {
        dispatch(updateBalance(-totalBet));
        setShouldReset(true);
        dispatch(updateRound(true));

        try {
            const gameResult = await play({ positions: positionsData.positions });

            //if user chose two positions bet should multiplied to 3, else 14
            const betMultiplier = calculateBetMultiplier(gameResult, positionsData);

            //if its tie then return bet to player
            if (!gameResult?.winnerIsComputer && !gameResult?.winnerIsPlayer) {
                setTimeout(() => {
                    dispatch(updateBalance(gameResult?.winningBet));
                }, RESULT_DISPLAY_DELAY);
            }
            
            if (gameResult?.winnerIsPlayer) {
                setTimeout(() => {
                    dispatch(incrementPlayerScore());
                    dispatch(updateBalance(betMultiplier * gameResult?.winningBet));
                }, RESULT_DISPLAY_DELAY);
            }

            dispatch(gameStats(gameResult));
        } catch (error) {
            console.error("Error playing the game:", error);
        }
    };

    const handleReset = () => {
        dispatch(resetGame());
        setChosenButtons([]);
        setShouldReset(false);
    };

    const handleChoice = (choice: string) => {
        if (chosenButtons.includes(choice)) {
            return;
        }

        dispatch(updatePosition({ item: choice, bet: BET_UPDATE_AMOUNT }));
    };


    const isButtonDisabled = (item: string) => {
        return (
            balance < 0 ||
            (positionsData.positions.length === 2 && !chosenButtons.includes(item))
        );
    };

    return (
        <>
            <Header />
            <div className={styles.game}>
                <div className="d-flex d-flex-column align-center">
                    <GameResultDisplay />
                    <div className="d-flex-responsive justify-center">
                        {GAME_ITEMS.map((item, index) => (
                            <BetOption
                                key={index}
                                disabled={isButtonDisabled(item)}
                                onClick={() => {
                                    handleChoice(item);
                                    setChosenButtons([...chosenButtons, item]);
                                }}
                                item={item}
                            >
                                {item}
                            </BetOption>
                        ))}
                    </div>
                    <button
                        className={`primary-button mt-100 ${isRoundGoing ? 'disabled' : ''}`}
                        onClick={shouldReset ? handleReset : handlePlay}
                    >
                        {shouldReset && !isRoundGoing ? "Clear" : "Play"}
                    </button>

                    {balance <= 0 && <p>Game Over</p>}
                </div>
            </div>
        </>
    );
};

export default GameComponent;
