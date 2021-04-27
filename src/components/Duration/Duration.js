import React from 'react'
import PropTypes from 'prop-types'
import * as cx from 'classnames'
import { hhmmss } from 'helpers'
import { ONE_THOUSAND_MILLISECONDS } from 'redux/constants'
import './Duration.scss'

const Duration = ({ className, position, duration }) => {
  return (
    <div className={cx('apollo-duration', className)}>
      <span className="audio-position">
        {hhmmss(position / ONE_THOUSAND_MILLISECONDS)}&nbsp;
      </span>
      <span className="audio-duration">
        / {hhmmss(duration / ONE_THOUSAND_MILLISECONDS)}
      </span>
    </div>
  )
}

Duration.propTypes = {
  className: PropTypes.string,                // class names from parent component,
  position: PropTypes.number.isRequired,      // get audio position
  duration: PropTypes.number.isRequired,      // get audio duration
}

export default Duration
