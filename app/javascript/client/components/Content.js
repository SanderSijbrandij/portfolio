import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import fetchPages from '../../shared/actions/pages/fetch'
import getCurrentPage from '../../shared/actions/pages/set-current'

import Title from '../../shared/components/Title'

class Content extends PureComponent {
  componentWillMount() {
    this.props.fetchPages()
  }

  render() {
    const { currentPage } = this.props
    return (
      <section className='section'>
        <div className='container'>
        { !currentPage && 'Loading content...' }
        { !!currentPage && <Title text={currentPage.title} level='1' size='3' type='title' /> }
        { !!currentPage && currentPage.content}
        </div>
      </section>
    )
  }
}

const mapStateToProps = ({pages, currentPage}) => ({pages, currentPage})
export default connect(mapStateToProps, { fetchPages, getCurrentPage })(Content)