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
            Board = new char[9] { '-', '-', '-', '-', '-', '-', '-', '-', '-' };
            CurrentPlayer = 'X';
            IsGameOver = false;
            Result = "Game in progress";
        }
    }
}