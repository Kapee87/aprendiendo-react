import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'

import './App.css'

import { Square } from './components/Square'
import { TURNS } from './constants'
import { checkEndGame, checkWinnerFrom } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import { saveGameToStorage, resetGameStorage } from './logic/storage'

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  }
  );

  const [turn, setTurn] = useState(() => {
    const turnsFromStorage = window.localStorage.getItem('turn')
    return turnsFromStorage ?? TURNS.x
  });

  const [winner, setWinner] = useState(null)


  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null)

    resetGameStorage()
  }

  const updateBoard = (index) => {
    //chequea si está vacío
    if (board[index] || winner) return
    //actualizar tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    //cambiamos el turno
    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;
    setTurn(newTurn)
    //guardar la partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })
    //revisamos si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }

  }

  useEffect(() => {
    console.log('useEFFE');
  }, [winner])


  return (
    <main className="board">
      <h1>Ta Te Ti</h1>
      <button onClick={resetGame}>resetear juego</button>
      <section className="game">
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.x}>{TURNS.x}</Square>
        <Square isSelected={turn === TURNS.o}>{TURNS.o}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />

    </main >

  )
}

export default App
