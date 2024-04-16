import { InitialStateType } from '@/types/types';

export const initialState: InitialStateType = {
    gameResult: {
        winnerIsPlayer: false,
        playerItem: "",
        winnerIsComputer: false,
        computerItem: "",
        winnerItem: "",
        winningBet: 0
    },
    positionData: { positions: [] },
    playerScore: 0,
    balance: 5000,
    ongoingRound: false
};
