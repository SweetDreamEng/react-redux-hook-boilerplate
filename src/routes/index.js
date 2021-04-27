import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Login, Signup } from './Auth'
import 'styles/core.scss'

const routes = () => (
  <Router>
    <div>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </div>
  </Router>
)

export default routes
