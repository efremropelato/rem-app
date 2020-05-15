import React from 'react';

export default class AssetDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { asset: {} };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    fetch(`/api/v1/complex_buildings/${id}`).
      then((response) => response.json()).
      then((asset) => this.setState({ asset }));
  }

  render() {
    const { asset } = this.state;
    return (
      <div>
        <div>
          <label> Owner </label>
          <p> {asset.owner} </p>
        </div>
        <div>
          <label> Address </label>
          <p> {asset.address} </p>
        </div>
        <div>
          <label> SQMT </label>
          <p> {asset.sqmt} </p>
        </div>
        <div>
          <label> Price (€) </label>
          <p> {asset.price} </p>
        </div>
        <div>
          <label> Units </label>
          <p> {asset.units} </p>
        </div>
      </div>
    );
  }
}