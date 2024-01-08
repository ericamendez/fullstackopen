import { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = ({ children, buttonLabel }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div>
        <div style={hideWhenVisible}>
          <button
            onClick={toggleVisibility}
            className={buttonLabel === 'add blog' ? 'add-blog' : ''}
          >
            {buttonLabel}
          </button>
        </div>
        <div style={showWhenVisible} className="togglableContent">
          {children}
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
