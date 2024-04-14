import React from 'react';
import styles from './header.module.scss';
import { useSelector } from 'react-redux';
import { GameState } from '../../types/types';

export function Header() {
    const game: any = useSelector((state: GameState) => state?.gameElement);
    const { playerScore, balance } = game;
    const positions: any = useSelector(
        (state: GameState) => state?.gameElement?.positions
    );
    const totalBet = positions.reduce((total:any, pos:any) => total + pos.bet, 0);

    return (
        <header className={styles.header}>
            <div className="d-flex justify-center align-center">
                <h2 className={styles.header__item}>{`Balance: ${balance}`}</h2>
                <h2 className={styles.header__item}>{`BET: ${totalBet}`}</h2>
                <h2 className={styles.header__item}>{`WIN: ${playerScore}`}</h2>
            </div>
        </header>
    )
}
