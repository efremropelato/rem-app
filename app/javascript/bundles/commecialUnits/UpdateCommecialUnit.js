import React from 'react';

export default class UpdateAsset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        id: null,
        owner: '',
        address: '',
        sqmt: 0, 
        price: 0
    }
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    fetch(`/api/v1/commecial_units/${id}`).
      then((response) => response.json()).
      then((asset) => this.setState({ ...asset }));
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  updateAssetRequest = (event) => {
    fetch(`/api/v1/commecial_units/${this.state.id}`, {
      method: 'put',
      body: JSON.stringify(this.state),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      alert('Asset updated successfully');
      location.href = '/';
    });
  }

  render() {
    const {id, owner, address, sqmt, price, shops, parking } = this.state;
    return (
      <div>
        <h3>Edit Asset {id}</h3>
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
        <button onClick={this.updateAssetRequest}>Update</button>
      </div>
    );
  }
}