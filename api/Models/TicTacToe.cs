using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class TicTacToe
    {
        public char[] Board { get; set; }
        public char CurrentPlayer { get; set; }
        public bool IsGameOver { get; set; }
        public string Result { get; set; }

        // initial board
        public TicTacToe()
        {
            Board = Enumerable.Repeat('-', 9).ToArray();
            CurrentPlayer = 'X';
            IsGameOver = false;
            Result = "Game in progress";
        }

        // game logic
        public string MakeMove(int index)
        {
            if (index < 0 || index > 8 || Board[index] != '-' || IsGameOver)
                return "Invalid move";

            Board[index] = CurrentPlayer;
            if (CheckWin())
            {
                IsGameOver = true;
                Result = $"{CurrentPlayer} wins!";
            }
            else if (Array.IndexOf(Board, '-') == -1)
            {
                IsGameOver = true;
                Result = "It's a draw!";
            }
            else
            {
                CurrentPlayer = (CurrentPlayer == 'X') ? 'O' : 'X';  
            }

            return Result;
        }

        // Check if the current player has won.
        private bool CheckWin()
        {
            int[,] winningCombos = new int[8, 3] 
            {
                {0, 1, 2}, {3, 4, 5}, {6, 7, 8}, // Rows
                {0, 3, 6}, {1, 4, 7}, {2, 5, 8}, // Columns
                {0, 4, 8}, {2, 4, 6}             // Diagonals
            };

            for (int i = 0; i < 8; i++)
            {
                if (Board[winningCombos[i, 0]] == CurrentPlayer &&
                    Board[winningCombos[i, 1]] == CurrentPlayer &&
                    Board[winningCombos[i, 2]] == CurrentPlayer)
                {
                    return true;
                }
            }
            return false;
        }

    }
}