import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import TranscriptItem from './TranscriptItem'
import { transcriptSelector, searchTextSelector } from 'redux/modules/global/selectors'

import './Transcript.scss'

class Transcript extends Component {
  static propTypes = {
    transcript: PropTypes.object, // transcript
    searchText: PropTypes.string  // get search text
  }

  render() {
    const { transcript, searchText } = this.props

    return (
      <div className="transcript">
        {
          transcript.transcript_text.map((script, index) => {
            if (script.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
              return <TranscriptItem id={index} script={transcript.word_timings[index]} key={index} />
            }
            return null
          })
        }
      </div>
    )
  }
}

const selector = createStructuredSelector({
  transcript: transcriptSelector,
  searchText: searchTextSelector
})

const actions = {
}

export default connect(selector, actions)(Transcript)
