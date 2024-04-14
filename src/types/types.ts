export type Result = {
    winnerIsPlayer: boolean
    playerItem: string
    winnerIsComputer: boolean
    computerItem: string,
    winnerItem: string,
    winningBet: number;
}

export interface InitialStateType {
    gameResult: {
        winnerIsPlayer: boolean;
        playerItem: string;
        winnerIsComputer: boolean;
        computerItem: string;
        winnerItem: string;
        winningBet: number;
    };
    positions: [
        {
            item: string,
            bet: number
        }
    ];
    playerScore: number;
    computerScore: number;
    isReseted: boolean;
    balance: number;
    bet: number;
}

export type GameState = {
    gameElement: InitialStateType
}

export type CompareFunctionParams = {
    playerItem: string;
    computerItem: string;
    bet: number;
};

export type Outcomes = {
    [key: string]: { beats: string[] };
};

export type PlayFunctionParams = {
    positions: { item: string; bet: number }[];
};

export interface ButtonProps {
    disabled: boolean;
    onClick: () => void;
    children: React.ReactNode;
    item: string;
}