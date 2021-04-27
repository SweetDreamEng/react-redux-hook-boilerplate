import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import * as cx from 'classnames'
import './Button.scss'

const ApolloButton = ({ className, ...props }) => {
  return (
    <Button className={cx('apollo-btn', className)} {...props}>
      {props.children}
    </Button>
  )
}

ApolloButton.propTypes = {
  className: PropTypes.string  // class names from parent component
}

export default ApolloButton
