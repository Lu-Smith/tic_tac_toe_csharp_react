using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/game")]
    public class GameControllers : ControllerBase
    {
        private static TicTacToe _game = new TicTacToe();

        [HttpGet("board")]
        public IActionResult GetBoard()
        {
            return Ok(new
            {
                Board = _game.Board,
                CurrentPlayer = _game.CurrentPlayer,
                IsGameOver = _game.IsGameOver,
                Result = _game.Result
            });
        }

        [HttpPost("move")]
        public IActionResult MakeMove([FromQuery] int index)
        {
             Console.WriteLine($"Received move at index: {index}");
            if (_game.IsGameOver)
                return BadRequest("The game is already over!");

            var result = _game.MakeMove(index);

            return Ok(new
            {
                Board = _game.Board,
                CurrentPlayer = _game.CurrentPlayer,
                IsGameOver = _game.IsGameOver,
                Result = result
            });
        }

        [HttpPost("reset")]
        public IActionResult ResetGame()
        {
            _game = new TicTacToe();  // Reset the game state
            return Ok(new
            {
                Board = _game.Board,
                CurrentPlayer = _game.CurrentPlayer,
                IsGameOver = _game.IsGameOver,
                Result = _game.Result
            });
        }
    }
}