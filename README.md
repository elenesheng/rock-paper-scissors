# Rock Paper Scissors Betting Game

This application is built using React for the frontend interface, and Redux Toolkit for state management. The styling is done with SCSS.

## How to Play
- You start with a balance of 5000 coins.
- Each bet costs 500 coins. You can place multiple bets on one or two positions.
- After placing your bets, click the "Play" button to proceed.
- The computer randomly selects rock, paper, or scissors.
- If your chosen position wins, you'll receive a return based on your bet:
  - Betting on one position and winning rewards you with 14 times your bet.
  - Betting on two positions and winning rewards you with 3 times your bet.
- Losses are not refunded, but ties result in your bet being returned.
- Your winnings (if any) are added to your balance after each round.
