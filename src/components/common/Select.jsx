import React, { Component } from 'react';

class Select extends Component {
  componentDidMount() {
    const { id, onChange, name } = this.props;
    $(`#${id}`).material_select(() => {
      onChange({
        [name]: $(`#${id}`).val()
      });
    });
  }

  render() {
    const {
      id = '',
      name = '',
      className = '',
      label = 'Select an option',
      options,
      onChange,
      value = '',
      defaultOption,
      noOptions = 'No options to display'
    } = this.props;

    if (!options) return <div className={className}>{noOptions}</div>;
    return (
      <div className={className}>
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
        >
          {defaultOption && <option disabled value="">{defaultOption}</option>}
          {
            Array.isArray(options)
              ? options.map(option => <option key={option} value={option}>{option}</option>)
              : Object.keys(options).map(key => <option key={key} value={key}>{options[key]}</option>)
          }
        </select>
        <label htmlFor={id}>{label}</label>
      </div>
    );
  }
}

export default Select;
