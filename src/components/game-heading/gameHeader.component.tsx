import React, { useEffect, useState } from 'react';
import styles from './GameHeader.module.scss';
import { useSelector } from 'react-redux';
import { GameState } from '../../types/types';

export function GameHeader() {
    const gameResult: any = useSelector((state: GameState) => state?.gameElement?.gameResult);
    const [headerContent, setHeaderContent] = useState("Choose your positions");

    useEffect(() => {
        if (!gameResult || !gameResult.gameResult) {
            setHeaderContent("Choose your positions");
            return;
        }

        const { playerItem, computerItem, winnerItem } = gameResult.gameResult;

        if (playerItem && computerItem) {
            setHeaderContent(`${playerItem} vs ${computerItem}`);
            
            setTimeout(() => {
                setHeaderContent(`Winner is ${winnerItem}`);
            }, 2000);
        }
    }, [gameResult]);

    return (
        <div>
            <h2 className='mb-100'>{headerContent}</h2>
        </div>
    );
}
