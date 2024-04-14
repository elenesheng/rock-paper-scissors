import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { play } from "../lib/game-logic";
import {
    reset,
    incrementPlayerScore,
    incrementComputerScore,
    gameStats,
    updateBalance,
    updatePosition,
    resetGame
} from "../redux/reducers/gameSlice";
import { Header } from "../components/header";
import { Button } from "../components/position-buttons";
import { Result } from "../types/types";
import styles from "./game.module.scss";
import { GameHeader } from "../components/game-heading";
import { GameState } from "../types/types";
import {
    GAME_ITEMS,
    BET_MULTIPLIER_TWO_POSITIONS,
    BET_MULTIPLIER_SINGLE_POSITION,
} from "../constants/constants";

const GameComponent: React.FC = () => {
    const dispatch = useDispatch();
    const [chosenButtons, setChosenButtons] = useState<string[]>([]);
    const balance: any = useSelector(
        (state: GameState) => state?.gameElement?.balance
    );
    const [winner, setWinner] = useState<Result | null>(null);
    const positions: any = useSelector(
        (state: GameState) => state?.gameElement?.positions
    );
    const shouldReset: any = useSelector(
        (state: GameState) => state?.gameElement?.isReseted
    );

    const handlePlay = async () => {
        dispatch(reset(true));
        const totalBet = positions.reduce((total:any, pos:any) => total + pos.bet, 0);
        dispatch(updateBalance(-totalBet));
    

        try {
            const gameResult = await play({ positions });
            setWinner(gameResult);

            if (gameResult?.winnerIsPlayer) {
                dispatch(incrementPlayerScore());
            } else {
                dispatch(incrementComputerScore());
            }

            //if user chose two positions bet should multiplied to 3, else 14
            const betMultiplier =
                gameResult?.winnerIsPlayer && positions.length>1
                    ? BET_MULTIPLIER_TWO_POSITIONS
                    : gameResult?.winnerIsPlayer && positions.length===1
                        ? BET_MULTIPLIER_SINGLE_POSITION
                        : 0;
                        // const totalBet = positions.reduce((total:any, pos:any) => total + pos.bet, 0);

            //if its tie then return bet to player
            if (!gameResult?.winnerIsComputer && !gameResult?.winnerIsPlayer) {
                dispatch(updateBalance(gameResult?.winningBet));
            }
            if(gameResult?.winnerIsPlayer) {
                dispatch(updateBalance(betMultiplier * gameResult?.winningBet));
            }
            dispatch(gameStats({ gameResult }));
        } catch (error) {
        console.error("Error playing the game:", error);
        }
    };

    const handleReset = () => {
        dispatch(resetGame())
        setWinner(null);
        setChosenButtons([]);
    };

    const handleChoice = (choice: string, index: number) => {
        if (chosenButtons.includes(choice)) {
            return;
        }
        console.log(positions);
        dispatch(updatePosition({ index, choice }));
    };
    

    const isButtonDisabled = (item: string) => {
        return (
            balance < 0 ||
            (positions.length>1 && !chosenButtons.includes(item))
        );
    };

    return (
        <>
            <Header />
            <div className={styles.game}>
                <div className="d-flex d-flex-column align-center">
                    <GameHeader />
                    <div className="d-flex justify-center">
                        {GAME_ITEMS.map((item, index) => (
                            <Button
                                key={index}
                                disabled={isButtonDisabled(item)}
                                onClick={() => {
                                    handleChoice(item, index);
                                    setChosenButtons([...chosenButtons, item]);
                                }}
                                item={item}
                            >
                                {item}
                            </Button>
                        ))}
                    </div>
                    <button
                        className="primary-button mt-100"
                        onClick={!shouldReset ? handlePlay : handleReset}
                    >
                        {!shouldReset ? "Play" : "Clear"}
                    </button>

                    {balance <= 0 && <p>Game Over</p>}
                </div>
                {winner && (
                    <div>
                        <div>
                            <h2>Player 1 choice: {winner?.playerItem}</h2>
                            <h2>Computer choice: {winner?.computerItem}</h2>
                            {winner.winnerIsPlayer && <h2>Player 1 wins!</h2>}
                            {winner.winnerIsComputer && <h2>Computer wins!</h2>}
                            {!winner.winnerIsPlayer && !winner.winnerIsComputer && (
                                <h2>It's a tie!</h2>
                            )}
                        </div>
                        {balance}
                    </div>
                )}
            </div>
        </>
    );
};

export default GameComponent;
