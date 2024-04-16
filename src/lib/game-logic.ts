import {
    GAME_ITEMS,
    BET_MULTIPLIER_TWO_POSITIONS,
    BET_MULTIPLIER_SINGLE_POSITION,
} from "@/constants/constants";
import { Result } from "@/types/types";
import {
    Outcomes,
    CompareFunctionParams,
    PlayFunctionParams,
} from "@/types/types";

const compare = async ({
    computerItem,
    playerItem,
    bet,
}: CompareFunctionParams): Promise<Result> => {
    const outcomes: Outcomes = {
        scissors: { beats: ["paper"] },
        paper: { beats: ["rock"] },
        rock: { beats: ["scissors"] },
    };

    try {
        if (computerItem === playerItem) {
            return {
                winnerIsPlayer: false,
                playerItem,
                winnerIsComputer: false,
                computerItem,
                winnerItem: "",
                winningBet: bet,
            };
        }

        if (outcomes[playerItem].beats.includes(computerItem)) {
            return {
                winnerIsPlayer: true,
                playerItem,
                winnerItem: playerItem,
                winnerIsComputer: false,
                computerItem,
                winningBet: bet,
            };
        } else {
            return {
                winnerIsPlayer: false,
                playerItem,
                winnerItem: computerItem,
                winnerIsComputer: true,
                computerItem,
                winningBet: bet,
            };
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

const play = async ({
    positions,
}: PlayFunctionParams): Promise<Result | null> => {
    try {
        let gameResult: Result | null = null;
        for (const position of positions) {
            const pickedItem = position.item;
            const bet = position.bet;

            if (!gameResult?.winnerIsPlayer && pickedItem) {
                const randomItem =
                    GAME_ITEMS[Math.floor(Math.random() * GAME_ITEMS.length)];
                const winner = await compare({
                    playerItem: pickedItem,
                    computerItem: randomItem,
                    bet,
                });
                gameResult = winner;
            }
        }

        return gameResult;
    } catch (error) {
        console.error("Error playing the game:", error);
        throw error;
    }
};

function calculateBetMultiplier(
    gameResult: Result | null,
    positionsData: PlayFunctionParams
) {
    if (gameResult && gameResult?.winnerIsPlayer) {
        if (positionsData.positions.length > 1) {
            return BET_MULTIPLIER_TWO_POSITIONS;
        } else if (positionsData.positions.length === 1) {
            return BET_MULTIPLIER_SINGLE_POSITION;
        }
    }

    return 0;
}

export { play, calculateBetMultiplier };
