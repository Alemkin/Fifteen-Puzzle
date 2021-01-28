import React, { useState, useEffect } from 'react'
import Puzzle from './component'
import { cloneDeep } from 'lodash'

const puzzle = [1, 2, 3, 0, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
const sortRandomPuzzle = () => Math.random() - Math.random()

const PuzzleContainer = () => {
  const [gameStarted, setGameStarted] = useState(false)
  const [randomizedPuzzle, setRandomizedPuzzle] = useState([])

  useEffect(() => {
    if (!gameStarted) {
      const puzzleSorted = cloneDeep(puzzle)
      puzzleSorted.sort(sortRandomPuzzle)
      setRandomizedPuzzle(puzzleSorted)
      setGameStarted(true)
    }
  }, [gameStarted])

  const checkValidAndMove = selectedNumber => ev => {
    const puzzleCopy = cloneDeep(randomizedPuzzle)
    const currentIndex = puzzleCopy.findIndex(e => e === selectedNumber)

    // This code is ugly, please don't look, I would want to optimize this with more time
    if (currentIndex > 0 && currentIndex % 4 !== 0 && puzzleCopy[currentIndex - 1] === 0) {
      puzzleCopy[currentIndex] = 0
      puzzleCopy[currentIndex - 1] = selectedNumber
      setRandomizedPuzzle(puzzleCopy)
    } else if (currentIndex + 1 < puzzleCopy.length && (currentIndex + 1) % 4 !== 0 && puzzleCopy[currentIndex + 1] === 0) {
      puzzleCopy[currentIndex] = 0
      puzzleCopy[currentIndex + 1] = selectedNumber
      setRandomizedPuzzle(puzzleCopy)
    } else if (currentIndex - 4 >= 0 && puzzleCopy[currentIndex - 4] === 0) {
      puzzleCopy[currentIndex] = 0
      puzzleCopy[currentIndex - 4] = selectedNumber
      setRandomizedPuzzle(puzzleCopy)
    } else if (currentIndex + 4 < puzzleCopy.length && puzzleCopy[currentIndex + 4] === 0) {
      puzzleCopy[currentIndex] = 0
      puzzleCopy[currentIndex + 4] = selectedNumber
      setRandomizedPuzzle(puzzleCopy)
    } else if (currentIndex - 8 >= 0 && puzzleCopy[currentIndex - 8] === 0) {
      puzzleCopy[currentIndex] = 0
      puzzleCopy[currentIndex - 8] = puzzleCopy[currentIndex - 4]
      puzzleCopy[currentIndex - 4] = selectedNumber
      setRandomizedPuzzle(puzzleCopy)
    } else if (currentIndex - 12 >= 0 && puzzleCopy[currentIndex - 12] === 0) {
      puzzleCopy[currentIndex] = 0
      puzzleCopy[currentIndex - 12] = puzzleCopy[currentIndex - 8]
      puzzleCopy[currentIndex - 8] = puzzleCopy[currentIndex - 4]
      puzzleCopy[currentIndex - 4] = selectedNumber
      setRandomizedPuzzle(puzzleCopy)
    } else if (currentIndex + 8 < puzzleCopy.length && puzzleCopy[currentIndex + 8] === 0) {
      puzzleCopy[currentIndex] = 0
      puzzleCopy[currentIndex + 8] = puzzleCopy[currentIndex + 4]
      puzzleCopy[currentIndex + 4] = selectedNumber
      setRandomizedPuzzle(puzzleCopy)
    } else if (currentIndex + 12 < puzzleCopy.length && puzzleCopy[currentIndex + 12] === 0) {
      puzzleCopy[currentIndex] = 0
      puzzleCopy[currentIndex + 12] = puzzleCopy[currentIndex + 8]
      puzzleCopy[currentIndex + 8] = puzzleCopy[currentIndex + 4]
      puzzleCopy[currentIndex + 4] = selectedNumber
      setRandomizedPuzzle(puzzleCopy)
    } else if ((currentIndex - 1) > 0 && currentIndex % 4 !== 0 && (currentIndex - 1) % 4 !== 0 && puzzleCopy[currentIndex - 2] === 0) {
      puzzleCopy[currentIndex] = 0
      puzzleCopy[currentIndex - 2] = puzzleCopy[currentIndex - 1]
      puzzleCopy[currentIndex - 1] = selectedNumber
      setRandomizedPuzzle(puzzleCopy)
    } else if ((currentIndex - 2) > 0 && (currentIndex - 1) % 4 !== 0 && (currentIndex - 2) % 4 !== 0 && puzzleCopy[currentIndex - 3] === 0) {
      puzzleCopy[currentIndex] = 0
      puzzleCopy[currentIndex - 3] = puzzleCopy[currentIndex - 2]
      puzzleCopy[currentIndex - 2] = puzzleCopy[currentIndex - 1]
      puzzleCopy[currentIndex - 1] = selectedNumber
      setRandomizedPuzzle(puzzleCopy)
    } else if ((currentIndex + 2) < puzzleCopy.length && (currentIndex + 1) % 4 !== 0 && (currentIndex + 2) % 4 !== 0 && puzzleCopy[currentIndex + 2] === 0) {
      puzzleCopy[currentIndex] = 0
      puzzleCopy[currentIndex + 2] = puzzleCopy[currentIndex + 1]
      puzzleCopy[currentIndex + 1] = selectedNumber
      setRandomizedPuzzle(puzzleCopy)
    } else if ((currentIndex + 3) < puzzleCopy.length && (currentIndex + 1) % 4 !== 0 && (currentIndex + 2) % 4 !== 0 && (currentIndex + 3) % 4 !== 0 && puzzleCopy[currentIndex + 3] === 0) {
      puzzleCopy[currentIndex] = 0
      puzzleCopy[currentIndex + 3] = puzzleCopy[currentIndex + 2]
      puzzleCopy[currentIndex + 2] = puzzleCopy[currentIndex + 1]
      puzzleCopy[currentIndex + 1] = selectedNumber
      setRandomizedPuzzle(puzzleCopy)
    }
  }

  const restartGame = ev => {
    setGameStarted(false)
  }

  return (
    <Puzzle puzzle={randomizedPuzzle} gameStarted={gameStarted} checkValidAndMove={checkValidAndMove} restartGame={restartGame} />
  )
}

export default PuzzleContainer
