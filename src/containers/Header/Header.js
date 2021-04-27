import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as cx from 'classnames'
import Duration from 'components/Duration'
import AudioToolbar from 'containers/AudioToolbar'
import { audioDurationSelector, audioPositionSelector } from 'redux/modules/global/selectors'
import './Header.scss'

const Header = ({ className, position, duration }) => {
  return (
    <div className={cx('apollo-header', className)}>
      <AudioToolbar />
      <Duration position={position} duration={duration} />
    </div>
  )
}

Header.propTypes = {
  className: PropTypes.string,                // class names from parent component
  position: PropTypes.number.isRequired,      // get audio position
  duration: PropTypes.number.isRequired,      // get audio duration
}

const selector = createStructuredSelector({
  position: audioPositionSelector,
  duration: audioDurationSelector
})

export default connect(selector)(Header)
