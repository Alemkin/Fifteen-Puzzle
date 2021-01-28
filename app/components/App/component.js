import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'reactstrap'
import { Switch, Route, useLocation } from 'react-router-dom'
import Puzzle from '../Puzzle'
import './index.scss'

const App = ({ user }) => {
  const location = useLocation()

  return (
    <div className='puzzle-main'>
      <Container fluid>
        <Switch>
          {<Route exact path='/' component={Puzzle} key={location.pathname} />}
        </Switch>
      </Container>
    </div>
  )
}

App.propTypes = {
}

export default App
