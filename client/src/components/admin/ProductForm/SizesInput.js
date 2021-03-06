import React, { Component } from "react";

class SizesInputs extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.handleChange(e);
  }

  render() {
    const { sizes } = this.props;

    return (
      <div className='sizes-input'>
        <label htmlFor='sizes'>Mărimi:</label>
        <br />
        <input
          type='text'
          name='sizes'
          id='sizes'
          required
          pattern='.*\S+.*'
          defaultValue={sizes.join(",")}
          onChange={this.handleChange}
        />
        <br />
      </div>
    );
  }
}

export default SizesInputs;
