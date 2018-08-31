import React, { Component } from 'react';

export default class Task extends Component {
	constructor (props){
		super(props);
	}

	onChange(event){
		const newDescription = event.target.value;
		this.props.setDescription(newDescription);
	}

	render() {
    return (
      <input
        className="input-reset ba b--black-20 pa2 mh3 db w-80"
        placeholder="Description"
        type="text"
        onChange = {this.onChange.bind(this)}
      />
    );
  }
}
