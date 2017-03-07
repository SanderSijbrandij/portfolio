import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Title from '../../shared/components/Title'
import updatePage from '../actions/pages/update'

class Page extends PureComponent {
  constructor() {
    super()
    this.state = {
      isEditing: false,
      hasChanged: false,
      newTitleValue: null,
      newContentValue: null
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.currentPage !== newProps.currentPage) {
      this.setState({
        isEditing: false,
        hasChanged: false,
        newTitleValue: null,
        newContentValue: null
      })
    }
  }

  changeTitleValue() {
    const changed = (this.props.currentPage.title !== this.refs.title.value)
    this.setState({ newTitleValue: this.refs.title.value, hasChanged: changed })
  }

  changeContentValue() {
    const changed = (this.props.currentPage.content !== this.refs.content.value)
    this.setState({ newContentValue: this.refs.content.value, hasChanged: changed })
  }

  toggleEditing() {
    const { isEditing, hasChanged, newTitleValue, newContentValue } = this.state
    const { title, content } = this.props.currentPage

    const changed = (
      (newTitleValue !== title || newContentValue !== content) &&
      (newTitleValue !== null || newContentValue !== null)
    )

    this.setState({ isEditing: !isEditing })
    this.setState({ hasChanged: changed })
  }

  saveChanges() {
    if (this.state.hasChanged) {
      const { link, title, content } = this.props.currentPage
      const { newTitleValue, newContentValue } = this.state

      const saveTitle = newTitleValue || title
      const saveContent = newContentValue || content
      this.props.updatePage(link, {
        title: saveTitle,
        content: saveContent
      })
    }
    
    this.setState({ isEditing: false })
  }

  renderTitleText() {
    const { title } = this.props.currentPage
    const { newTitleValue } = this.state
    if (title == newTitleValue || newTitleValue == null) {
      return title
    } else {
      return newTitleValue
    }
  }

  renderContentText() {
    const { content } = this.props.currentPage
    const { newContentValue } = this.state
    return newContentValue || content
  }

  renderTitleEdit() {
    const { title } = this.props.currentPage
    const { newTitleValue } = this.state

    return (
      <span className='control'>
        <input className='input' type='text' defaultValue={newTitleValue || title}
               onChange={this.changeTitleValue.bind(this)}
               ref='title' />
      </span>
    )
  }

  renderContentEdit() {
    const { content } = this.props.currentPage
    const { newContentValue } = this.state

    return (
      <div className='control'>
        <textarea className='textarea' defaultValue={newContentValue || content}
                  onChange={this.changeContentValue.bind(this)}
                  ref='content'>
        </textarea>
      </div>
    )
  }

  render() {
    const { link, title, content } = this.props.currentPage
    const { isEditing, hasChanged } = this.state

    return (
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            { !isEditing && this.renderTitleText() }
            { isEditing && this.renderTitleEdit() }
          </p>
          <p className='card-header-icon'>id: {link}</p>
        </header>
        <div className="card-content">
          <div className="content">
            { !isEditing && this.renderContentText() }
            { isEditing && this.renderContentEdit() }
          </div>
        </div>
        <footer className="card-footer">
          { !hasChanged &&
            <a className="card-footer-item is-disabled">No changes...</a>
          }
          { hasChanged &&
            <a className="card-footer-item"
               onClick={this.saveChanges.bind(this)}>Save changes</a>
          }
          <a className="card-footer-item" onClick={this.toggleEditing.bind(this)}>
            { !isEditing && 'Edit' }
            { isEditing && 'Preview' }
          </a>
          <a className="card-footer-item">Delete</a>
        </footer>
      </div>
    )
  }
}

const mapStateToProps = ({currentPage}) => ({currentPage})
export default connect(mapStateToProps, { updatePage })(Page)
