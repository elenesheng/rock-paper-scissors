import styles from "./BetOption.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { updatePositionBet } from "@/redux/reducers/gameSlice";
import { GameState, ButtonProps, Position } from "@/types/types";
import { BET_UPDATE_AMOUNT } from "@/constants/constants";

export const BetOption = ({ onClick, children, item, disabled }: ButtonProps) => {
    const dispatch = useDispatch();
    const balance: any = useSelector(
        (state: GameState) => state?.gameElement?.balance
    );
    const positionData: any = useSelector(
        (state: GameState) => state?.gameElement?.positionData.positions
    );
    const position = positionData.find((pos: Position) => pos.item === item);

    const handleBetIncrease = () => {
        if (balance % BET_UPDATE_AMOUNT === 0) {
            dispatch(updatePositionBet({ item, betChange: BET_UPDATE_AMOUNT }));
        }
    };

    const handleBetDecrease = () => {
        if (balance > BET_UPDATE_AMOUNT) {
            dispatch(updatePositionBet({ item, betChange: -BET_UPDATE_AMOUNT }));
        }
    };

    return (
        <button
            className={`${styles.betOption} ${styles[`betOption__${item}`]
                } d-flex d-flex-column align-center`}
            onClick={onClick}
            disabled={disabled}
        >
            <div>
                <span className={styles.betOption__betCircle}>
                    {position?.bet ? position.bet : BET_UPDATE_AMOUNT}
                </span>
                <span onClick={handleBetDecrease} className={styles.betOption__decrease}>-</span>
                <span onClick={handleBetIncrease} className={styles.betOption__increase}>+</span>
            </div>
            <div>{children}</div>
        </button>
    );
};
