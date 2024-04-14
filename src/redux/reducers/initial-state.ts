import { InitialStateType } from '../../types/types';

export const initialState: InitialStateType = {
    gameResult: {
        winnerIsPlayer: false,
        playerItem: "",
        winnerIsComputer: false,
        computerItem: "",
        winnerItem: "",
        winningBet: 0
    },
    positions: [
        { item: "", bet: 500 }
        ],
    playerScore: 0,
    computerScore: 0,
    isReseted: false,
    balance: 5000,
    bet: 500,
    // chosenPositions: 0
};
