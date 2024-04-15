import styles from './header.module.scss';
import { useSelector } from 'react-redux';
import { GameState } from '@/types/types';

export function Header() {
    const game: any = useSelector((state: GameState) => state?.gameElement);
    const { playerScore, balance } = game;
    const positionData: any = useSelector(
        (state: GameState) => state?.gameElement?.positionData
    );
    const totalBet = positionData.positions.length? positionData.positions.reduce((total:any, pos:any) => total + pos.bet, 0): 0;

    return (
        <header className={styles.header}>
            <div className="d-flex-responsive justify-center align-center">
                <h2 className={styles.header__item}>{`Balance: ${balance}`}</h2>
                <h2 className={styles.header__item}>{`BET: ${totalBet}`}</h2>
                <h2 className={styles.header__item}>{`WIN: ${playerScore}`}</h2>
            </div>
        </header>
    )
}
