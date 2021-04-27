import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Spinner } from 'reactstrap'
import * as cx from 'classnames'
import './Loader.scss'

const Loader = ({ className, active, fluid, children, ...props }) => {
  return (
    <Fragment>
      {active ? (
        <div className={cx('apollo-loader', { fluid })}>
          <Spinner {...props} />
        </div>
      ) : children}
    </Fragment>
  )
}

Loader.propTypes = {
  className: PropTypes.string,        // class names from parent component
  active: PropTypes.bool.isRequired,  // activate loader to be shown
  fluid: PropTypes.bool               // set full screen loader or not
}

export default Loader
