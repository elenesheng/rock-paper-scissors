import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initial-state';

const gameSlice = createSlice({
    name: 'gameSlice',
    initialState,
    reducers: {
        reset: (state = initialState, action) => {
            state.isReseted = action.payload;
        },
        gameStats: (state = initialState, action) => {
            state.gameResult = action.payload;
        },
        incrementPlayerScore: (state = initialState) => {
            state.playerScore += 1;
        },
        incrementComputerScore: (state = initialState) => {
            state.computerScore += 1;
        },
        updateBalance: (state, action) => {
            state.balance += action.payload;
        },
        updateBet: (state, action) => {
            state.bet += action.payload;
        },
        updatePosition: (state, action) => {
            const { index, choice } = action.payload;

            while (index >= state.positions.length) {
                state.positions.push({ item: "", bet: 500 });
            }
        
            state.positions[index].item = choice;
        },
        updatePositionBet: (state, action) => {
            const { item, betChange } = action.payload;
            const positionIndex = state.positions.findIndex(pos => pos.item === item);
            if (positionIndex !== -1) {
                state.positions[positionIndex].bet += betChange;
            }
        },
        resetGame: (state) => {
            state.gameResult = initialState.gameResult;
            state.positions = initialState.positions;
            state.bet = initialState.bet;
            state.isReseted = initialState.isReseted;
        }
    },
});

export const {
    reset,
    gameStats,
    incrementPlayerScore,
    incrementComputerScore,
    updateBalance,
    updateBet,
    updatePosition,
    updatePositionBet,
    resetGame
} = gameSlice.actions;

export default gameSlice.reducer;
