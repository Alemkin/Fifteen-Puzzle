import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button } from 'reactstrap'
import './index.scss'

import { translateComponent } from '../../utils/translate'
const t = translateComponent('Puzzle')

const handleKeyDown = checkValidAndMove => e => {
  if (e.keyCode === 13 || e.key === 'Enter' || e.keyCode === 32 || e.key === 'Space') {
    e.preventDefault()
    checkValidAndMove()
  }
}

const mapPuzzleCol = (puzzle, checkValidAndMove) => (col, i) => {
  const isZeroCol = col === 0
  return (
    <Col onKeyDown={isZeroCol ? null : handleKeyDown(checkValidAndMove(col))} onClick={isZeroCol ? null : checkValidAndMove(col)} tabIndex={isZeroCol ? -1 : 0} className={`puzzle-col text-center ${isZeroCol ? 'empty-col' : ''}`} xs={3} key={`puzzle-col-${i}`}>
      {isZeroCol ? '' : col}
    </Col>
  )
}

const mapPuzzleRow = (puzzle, checkValidAndMove) => (row, i) => {
  return (
    <Row className='puzzle-row' key={`puzzle-row-${i}`}>
      {row.map(mapPuzzleCol(puzzle, checkValidAndMove))}
    </Row>
  )
}

const PuzzleRows = ({ puzzle, checkValidAndMove }) => {
  let chunk = 4
  const puzzleSize = puzzle.length
  const rows = []

  while (chunk <= puzzleSize) {
    rows.push(puzzle.slice(chunk - 4, chunk))
    chunk += 4
  }
  return (
    rows.map(mapPuzzleRow(puzzle, checkValidAndMove))
  )
}

const Puzzle = ({ puzzle, gameStarted, checkValidAndMove, restartGame }) => {
  return (
    <Row className='puzzle mt-4 mr-2 ml-2 mb-2'>
      <Col xs={12} md={{ size: 6, offset: 3 }}>
        <Row>
          <Col xs={12} md={8}>
            <h4>{t('welcome')}</h4>
          </Col>
          <Col xs={12} md={4}>
            <Button type='button' color='primary' onClick={restartGame}>{t('restart')}</Button>
          </Col>
        </Row>
        <Row className='mt-4'>
          <Col xs={12}>
            <p>
              {t('directions')}
            </p>
          </Col>
        </Row>
      </Col>
      <Col className='mt-4' xs={12} md={{ size: 6, offset: 3 }}>
        {gameStarted && <PuzzleRows puzzle={puzzle} checkValidAndMove={checkValidAndMove} />}
      </Col>
    </Row>
  )
}

Puzzle.propTypes = {
  puzzle: PropTypes.array.isRequired,
  gameStarted: PropTypes.bool.isRequired,
  checkValidAndMove: PropTypes.func.isRequired,
  restartGame: PropTypes.func.isRequired
}

export default Puzzle
