import React from "react";
import styles from "./button.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { updatePositionBet } from "../../redux/reducers/gameSlice";
import { GameState, ButtonProps } from "../../types/types";

export const Button = ({ disabled, onClick, children, item }: ButtonProps) => {
    const dispatch = useDispatch();
    const balance: any = useSelector(
        (state: GameState) => state?.gameElement?.balance
    );
    const positions: any = useSelector(
        (state: GameState) => state?.gameElement?.positions
    );
    const position = positions.find((pos: any) => pos.item === item);

    const handleBetIncrease = (e: React.MouseEvent<HTMLSpanElement>) => {
        console.log(positions);
        if (balance % 500 === 0) {
            dispatch(updatePositionBet({ item, betChange: 500 }));
        }
    };

    const handleBetDecrease = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        if (balance > 500) {
            dispatch(updatePositionBet({ item, betChange: -500 }));
        }
    };

    return (
        <button
            className={`${styles.button} ${styles[`button__${item}`]
                } d-flex d-flex-column align-center`}
            disabled={disabled}
            onClick={onClick}
        >
            <div>
                <span className={styles.button__betCircle}>
                    {position ? position.bet : 500}
                </span>
                <span onClick={handleBetIncrease}>+</span>
                <span onClick={handleBetDecrease}>-</span>
            </div>
            <div>{children}</div>
        </button>
    );
};
