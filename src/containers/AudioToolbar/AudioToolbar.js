import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as cx from 'classnames'
import { Container, Row, Col } from 'reactstrap'
import { AUDIO_SPEED_LIST, AUDIO_PLAY_STATUS, TEN_THOUSAND_MILLISECONDS } from 'redux/constants'
import Dropdown from 'components/Dropdown'
import Button from 'components/Button'
import { setAudioPlay, setAudioSpeed, setAudioPosition } from 'redux/modules/global/actions'
import {
  audioPlaySelector, audioSpeedSelector, audioDurationSelector, audioPositionSelector
} from 'redux/modules/global/selectors'
import './AudioToolbar.scss'

class AudioToolbar extends React.Component {
  static propTypes = {
    play: PropTypes.oneOf(Object.values(AUDIO_PLAY_STATUS)).isRequired,  // get audio play status
    speed: PropTypes.oneOf(AUDIO_SPEED_LIST).isRequired,                 // get audio speed
    position: PropTypes.number.isRequired,                               // get audio position
    duration: PropTypes.number.isRequired,                               // get audio duration
    setAudioPlay: PropTypes.func.isRequired,                             // set audio loading status
    setAudioSpeed: PropTypes.func.isRequired,                            // set auido play status
    setAudioPosition: PropTypes.func.isRequired                          // set audio position
  }

  handleAudioPlay = () => {
    const { play, setAudioPlay } = this.props

    // set audio play status to 'PAUSED' if it is 'PLAYING', otherwise set to 'PLAYING'
    setAudioPlay({ play: play === AUDIO_PLAY_STATUS.PLAYING
      ? AUDIO_PLAY_STATUS.PAUSED
      : AUDIO_PLAY_STATUS.PLAYING
    })
  }

  handleAudioSpeed = (val) => () => {
    const { setAudioSpeed } = this.props

    // set audio speed on dropdown selection
    setAudioSpeed({ speed: val })
  }

  handleAudioBackward = () => {
    const { position, setAudioPosition, setAudioPlay } = this.props

    // set audio position backward to 10 seconds
    setAudioPosition({ position: Math.max(position - TEN_THOUSAND_MILLISECONDS, 0) })
    // set audio play status to 'PLAYING' for automatic play
    setAudioPlay({ play: AUDIO_PLAY_STATUS.PLAYING })
  }

  handleAudioForward = () => {
    const { position, duration, setAudioPosition, setAudioPlay } = this.props

    // set audio position forward to 10 seconds
    setAudioPosition({ position: Math.min(position + TEN_THOUSAND_MILLISECONDS, duration) })
    // set audio play status to 'PLAYING' for automatic play
    setAudioPlay({ play: AUDIO_PLAY_STATUS.PLAYING })
  }

  render() {
    const { play, speed } = this.props

    return (
      <Container fluid className="audio-toolbar">
        <Row>
          <Col xs={6} className="player-settings">
            <div
              className="player-settings__back"
              onClick={this.handleAudioBackward}
            />
            <div
              className={
                cx('player-settings__play', play === AUDIO_PLAY_STATUS.PLAYING && 'paused')
              }
              onClick={this.handleAudioPlay}
            />
            <div
              className="player-settings__forward"
              onClick={this.handleAudioForward}
            />
            <Dropdown
              items={AUDIO_SPEED_LIST}
              selected={`${speed}x`}
              postfix={'x'}
              className="player-settings__speed"
              onClick={this.handleAudioSpeed}
            />
          </Col>
          <Col xs={6} className="share">
            <Button className="float-right share">Share</Button>
          </Col>
        </Row>
      </Container>
    )
  }
}

const selector = createStructuredSelector({
  play: audioPlaySelector,
  speed: audioSpeedSelector,
  position: audioPositionSelector,
  duration: audioDurationSelector
})

const actions = {
  setAudioPlay,
  setAudioSpeed,
  setAudioPosition
}

export default connect(selector, actions)(AudioToolbar)
