import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class AssetDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { asset: {} };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    fetch(`/api/v1/houses/${id}`).
      then((response) => response.json()).
      then((asset) => this.setState({ asset }));
  }

  render() {
    const { asset } = this.state;
    return (
      <Container>
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
          <label> Rooms </label>
          <p> {asset.rooms} </p>
        </div>
        <div>
          <label> Floors </label>
          <p> {asset.floors} </p>
        </div>
        <div>
          <label> Air Cond. </label>
          <p> {asset.air_cond ? 'true':'false'} </p>
        </div>
        <Link className="btn btn-primary btn-sm" to="/">
                Back
              </Link>
      </Container>
    );
  }
}