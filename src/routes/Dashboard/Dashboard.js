import React, { Fragment } from 'react'
import SearchBar from 'components/SearchBar'
import Transcript from 'containers/Transcript'

import './Dashboard.scss'

const Dashboard = () => (
  <Fragment>
    <SearchBar />
    <Transcript />
  </Fragment>
)

export default Dashboard
