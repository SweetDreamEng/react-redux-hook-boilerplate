import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'reactstrap'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import * as cx from 'classnames'
import { AUDIO_PLAY_STATUS, ONE_THOUSAND_MILLISECONDS } from 'redux/constants'
import { audioPositionSelector, searchTextSelector } from 'redux/modules/global/selectors'
import { setAudioPosition, setAudioPlay } from 'redux/modules/global/actions'
import { getSecsFromStr, hhmmss } from 'helpers'

class TranscriptItem extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,              // unique id from parent component
    script: PropTypes.array.isRequired,           // transcript data of each person
    position: PropTypes.number.isRequired,        // get audio position
    searchText: PropTypes.string,                 // get search text
    setAudioPosition: PropTypes.func.isRequired,  // set audio position
    setAudioPlay: PropTypes.func.isRequired       // set audio loading status
  }

  handleTranscriptWordClick = (position) => () => {
    const { setAudioPosition, setAudioPlay } = this.props

    // update audio position continuously while playing the sound
    setAudioPosition({ position: getSecsFromStr(position) * ONE_THOUSAND_MILLISECONDS })
    // set audio play status to 'PLAYING'
    setAudioPlay({ play: AUDIO_PLAY_STATUS.PLAYING })
  }

  render() {
    const { id, script, position, searchText } = this.props
    // add 'odd' or 'even' class to each row of the transcript
    const className = id % 2 === 1 ? "transcript__row--odd" : "transcript__row--even"
    // start position of each row of the transcript
    const startTime = getSecsFromStr(script[0].startTime) * ONE_THOUSAND_MILLISECONDS
    // end position of each row of the transcript
    const endTime = getSecsFromStr(script[script.length - 1].endTime) * ONE_THOUSAND_MILLISECONDS
    // add 'active' class if the script is playing
    const hasActiveWord = startTime <= position && position < endTime ? true : false

    return (
      <Row className={cx('transcript__row', className, { active: hasActiveWord })}>
        <Col xs={'auto'} className="time">
          {hhmmss(script[0].startTime)}
        </Col>
        <Col className="text">
          <p className="text-content">
            {
              script.map(el => {
                // start position of the word
                const startTime = getSecsFromStr(el.startTime) * ONE_THOUSAND_MILLISECONDS
                // end position of the word
                const endTime = getSecsFromStr(el.endTime) * ONE_THOUSAND_MILLISECONDS
                //add 'active' class if the word is playing
                const isActive = startTime <= position && position < endTime ? true : false
                //add 'highlight' class if the word is matched with search text
                const isHighlight = el.word.toLowerCase().indexOf(searchText.toLowerCase()) === -1 || searchText === '' ? false : true  // eslint-disable-line

                return (
                  <span
                    key={`${el.startTime}${el.word}`}
                    className={cx('word', { active: isActive, highlight: isHighlight })}  // eslint-disable-next-line
                    onClick={this.handleTranscriptWordClick(el.startTime)}  // update audio position to clicked word and play audio from that position
                  >
                    {`${el.word} `}
                  </span>
                )
              })
            }
          </p>
        </Col>
      </Row>
    )
  }
}

const selector = createStructuredSelector({
  position: audioPositionSelector,
  searchText: searchTextSelector
})

const actions = {
  setAudioPosition,
  setAudioPlay
}

export default connect(selector, actions)(TranscriptItem)
