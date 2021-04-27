import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import Sound from 'react-sound'
import { AUDIO_SPEED_LIST, AUDIO_PLAY_STATUS } from 'redux/constants'
import {
  setAudioLoading, setAudioPlay, setAudioPosition, setAudioDuration
} from 'redux/modules/global/actions'
import {
  audioPlaySelector, audioSpeedSelector, audioPositionSelector
} from 'redux/modules/global/selectors'

class ApolloAudio extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,            // audio url being passed from parent component
    play: PropTypes.oneOf(Object.values(AUDIO_PLAY_STATUS)).isRequired,  // get audio play status
    speed: PropTypes.oneOf(AUDIO_SPEED_LIST).isRequired,  // get audio speed
    position: PropTypes.number.isRequired,       // get audio position
    setAudioLoading: PropTypes.func.isRequired,  // set audio loading status
    setAudioPlay: PropTypes.func.isRequired,     // set auido play status
    setAudioPosition: PropTypes.func.isRequired  // set audio position
  }

  handleAudioLoading = (loading) => (audio) => {
    const { setAudioLoading } = this.props

    // set audio loading status to true, it means that it is loading the audio file
    setAudioLoading({ loading: !audio.loaded })
  }

  handleAudioLoaded = (audio) => {
    const { setAudioLoading, setAudioDuration } = this.props

    // set audio loading status to false, it means that audio is ready to use
    setAudioLoading({ loading: !audio.loaded })
    // set audio duration to store
    setAudioDuration({ duration: audio.duration })
  }

  handleAudioFinishedPlaying = () => {
    const { setAudioPlay, setAudioPosition } = this.props

    // set audio play status to 'STOPPED'
    setAudioPlay({ play: AUDIO_PLAY_STATUS.STOPPED })
    // set audio position to 0
    setAudioPosition({ position: 0 })
  }

  handleAudioPlaying = (audio) => {
    const { setAudioPosition } = this.props

    // update audio position continuously while playing the sound
    setAudioPosition({ position: audio.position })
  }

  render() {
    const { url, play, speed, position } = this.props

    return (
      <Sound
        url={url}                                            // audio url
        autoLoad                                             // automatic load
        playStatus={play}                                    // audio play status
        position={position}                                  // audio position
        playbackRate={speed}                                 // audio play speed
        onLoading={this.handleAudioLoading(true)}            // loading handler
        onLoad={this.handleAudioLoaded}                      // onLoaded handler
        onPlaying={this.handleAudioPlaying}                  // onPlaying handler
        onFinishedPlaying={this.handleAudioFinishedPlaying}  // Finished playing handler
      />
    )
  }
}

const selector = createStructuredSelector({
  play: audioPlaySelector,
  speed: audioSpeedSelector,
  position: audioPositionSelector
})

const actions = {
  setAudioLoading,
  setAudioPlay,
  setAudioPosition,
  setAudioDuration
}

export default connect(selector, actions)(ApolloAudio)
