import React, { Component } from 'react'
import { Row, Input } from 'reactstrap'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { setSearchText } from 'redux/modules/global/actions'

import 'font-awesome/css/font-awesome.min.css'
import './SearchBar.scss'

class SearchBar extends Component {
  handleSearch = (evt) => {
    const { setSearchText } = this.props

    setSearchText({ text: evt.target.value })
  }

  render() {
    return (
      <Row>
        <div className="search-bar">
          <Input
            type="text"
            className="fontAwesome"
            placeholder="&#xF002; Search call transcript"
            onChange={this.handleSearch}
          ></Input>
        </div>
      </Row>
    )
  }
}

const selector = createStructuredSelector({
})

const actions = {
  setSearchText
}

export default connect(selector, actions)(SearchBar)
