export type Result = {
    winnerIsPlayer: boolean
    playerItem: string
    winnerIsComputer: boolean
    computerItem: string,
    winnerItem: string,
    winningBet: number;
}
export interface Position {
    item: string;
    bet: number;
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
    positionData: {
        positions: Position[];
    };
    playerScore: number;
    balance: number;
    ongoingRound: boolean
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
    positions: Position[];
};

export interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    item: string;
    disabled: boolean;
}
