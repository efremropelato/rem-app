import React from 'react';
import {Redirect} from 'react-router-dom';

export default class CreateAsset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        owner: '',
        address: '',
        sqmt: 0, 
        price: 0
    }
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  createAssetRequest = (event) => {
    console.log('this.state', this.state);
    fetch('/api/v1/commecial_units', {
      method: 'asset',
      body: JSON.stringify(this.state),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      alert('Asset created successfully');
      location.href = '/';
    });
  }

  render() {
    const {owner, address, sqmt, price, shops, parking } = this.state;
    return (
      <div>
        <h3>New Asset</h3>
        <div>
          <label>Owner: </label>
          <input
            type='text'
            name='owner'
            value={owner}
            onChange={this.handleInputChange}
            />
        </div>
        <div>
          <label>Address: </label>
          <input
            type='text'
            name='address'
            value={address}
            onChange={this.handleInputChange}
            />
        </div>
        <div>
          <label>SQMT: </label>
          <input
            type='text'
            name='sqmt'
            value={sqmt}
            onChange={this.handleInputChange}
            />
        </div>
        <div>
          <label>Price (€): </label>
          <input
            type='text'
            name='price'
            value={price}
            onChange={this.handleInputChange}
            />
        </div>
        <div>
          <label>Shops: </label>
          <input
            type='text'
            name='shops'
            value={shops}
            onChange={this.handleInputChange}
            />
        </div>
        <div>
          <label>Parking: </label>
          <input
            type='text'
            name='parking'
            value={parking}
            onChange={this.handleInputChange}
            />
        </div>
        <button onClick={this.createAssetRequest}>Create</button>
      </div>
    );
  }
}