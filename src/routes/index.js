import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, /*Redirect,*/ Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Container } from 'reactstrap'
import Loader from 'components/Loader'
import Audio from 'components/Audio'
import Header from 'containers/Header'
import Dashboard from './Dashboard'
import { requestSuccess } from 'redux/api/request'
import { GET_TRANSCRIPT } from 'redux/modules/global/constants'
import { getTranscript } from 'redux/modules/global/actions'
import {
  loadingStatusSelector, audioLoadingSelector
} from 'redux/modules/global/selectors'
import 'styles/core.scss'

class Routes extends React.Component {
  static propTypes = {
    loadingStatus: PropTypes.string.isRequired,  // transcript loading status
    audioLoading: PropTypes.bool,                // audio loading status
    getTranscript: PropTypes.func.isRequired     // get transcript data
  }

  componentDidMount() {
    const { getTranscript } = this.props

    // get transcript data from /assets/js/transcript.json
    getTranscript({ fileName: 'transcript.json' })
  }

  render() {
    const { loadingStatus, audioLoading } = this.props
    const transcriptLoading = loadingStatus !== requestSuccess(GET_TRANSCRIPT)

    return (
      <Router>
        <Audio url='/audio/59e106639d79684277df770d.wav' />
        <Loader active={transcriptLoading || audioLoading} fluid>
          <Header />
          <Container className='main-content py-0'>
            <Route exact path='/' component={Dashboard} />
          </Container>
        </Loader>
      </Router>
    )
  }
}

const selector = createStructuredSelector({
  loadingStatus: loadingStatusSelector,
  audioLoading: audioLoadingSelector
})

const actions = {
  getTranscript
}

export default connect(selector, actions)(Routes)
