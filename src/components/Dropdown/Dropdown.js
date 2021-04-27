import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import * as cx from 'classnames'
import './Dropdown.scss'

const ApolloDropdown = ({ items, selected, postfix, onClick, className, ...props }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)  // React Hook

  const toggle = () => setDropdownOpen(prevState => !prevState)

  return (
    <Dropdown
      isOpen={dropdownOpen}
      toggle={toggle}
      className={cx('apollo-dropdown', className)}
      {...props}
    >
      <DropdownToggle>
        {selected || 'None Selected'}
      </DropdownToggle>
      <DropdownMenu>
        {items.map((item, idx) => {
          return (
            <DropdownItem
              onClick={onClick(item)}
              key={`speed_${idx}`}
            >
              {`${item}${postfix}`}
            </DropdownItem>
          )
        })}
      </DropdownMenu>
    </Dropdown>
  )
}

ApolloDropdown.propTypes = {
  className: PropTypes.string,        // class names from parent component
  items: PropTypes.array.isRequired,  // dropdown list items
  selected: PropTypes.string,         // text of the selected item in dropdown
  postfix: PropTypes.string,          // postfix to be shown in dropdown item
  onClick: PropTypes.func.isRequired  // onClick handler
}

export default ApolloDropdown
