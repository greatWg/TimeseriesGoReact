import React from 'react'
import PropTypes from 'prop-types'
import "../index.css"

const Picker = ({ value, onChange, options }) => (
  <p>
    <b>Select Timeseries - </b>
      <select onChange={e => onChange(e.target.value)}
              value={value}>
        {options.map(option =>
          <option value={option} key={option}>
            {option}
          </option>)
        }
      </select>
  </p>
)

Picker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Picker
