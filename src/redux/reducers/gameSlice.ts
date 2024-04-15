import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./initial-state";
import { Position } from "../../types/types";

const gameSlice = createSlice({
    name: "gameSlice",
    initialState,
    reducers: {
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
        updatePosition: (state, action: PayloadAction<Position>) => {
            state.positionData.positions.push(action.payload);
        },
        updatePositionBet: (state, action) => {
            const { item, betChange } = action.payload;
            const positionIndex = state.positionData.positions.findIndex(
                (pos) => pos.item === item
            );
            if (positionIndex !== -1) {
                state.positionData.positions[positionIndex].bet += betChange;
            }
        },
        updateRound: (state = initialState, action) => {
            state.ongoingRound = action.payload;
        },
        resetGame: (state) => {
            state.gameResult = initialState.gameResult;
            state.positionData = initialState.positionData;
            state.ongoingRound = initialState.ongoingRound;
        },
    },
});

export const {
    gameStats,
    incrementPlayerScore,
    incrementComputerScore,
    updateBalance,
    updatePosition,
    updatePositionBet,
    updateRound,
    resetGame,
} = gameSlice.actions;

export default gameSlice.reducer;
