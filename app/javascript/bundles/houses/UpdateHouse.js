import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import CurrencyInput from 'react-currency-input';

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
    fetch(`/api/v1/houses/${id}`).
      then((response) => response.json()).
      then((asset) => this.setState({ ...asset }));
  }

  handleInputChange = (event) => {
    console.log("Value", event.target.value, event.target.type != 'checkbox' ? event.target.value : event.target.checked);
    this.setState({ [event.target.name]: event.target.type != 'checkbox' ? event.target.value : event.target.checked });
  }

  updateAssetRequest = (event) => {
    fetch(`/api/v1/houses/${this.state.id}`, {
      method: 'put',
      body: JSON.stringify(this.state),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      location.href = '/';
      toast.success("Asset updated successfully!");
    });
  }

  render() {
    const { id, owner, address, sqmt, price, rooms, floors, air_cond } = this.state;
    return (
      <Container>

        <Form>
          <h3>Edit House {id}</h3>
          <FormGroup>
            <Label for="owner">Owner</Label>
            <Input type='text' name="owner" id="owner" placeholder="Owner..."
              defaultValue={owner}
              onChange={this.handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input type='textarea' name="address" id="address" placeholder="Address..."
              defaultValue={address}
              onChange={this.handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="sqmt">SQMT</Label>
            <Input type='number' name="sqmt" id="sqmt"
              defaultValue={sqmt}
              value={sqmt}
              onChange={this.handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="price">Price (€)</Label>
            <CurrencyInput name="price" id="price"
              decimalSeparator="," 
              thousandSeparator="."
              className="form-control"
              value={price} 
              onChangeEvent={this.handleInputChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="rooms">Rooms</Label>
            <Input type='number' name="rooms" id="rooms"
              defaultValue={rooms}
              onChange={this.handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="floors">Floors</Label>
            <Input type='number' name="floors" id="floors"
              defaultValue={floors}
              onChange={this.handleInputChange} />
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' name="air_cond" id="air_cond"
                defaultChecked={air_cond}
                checked={air_cond}
                onChange={this.handleInputChange}
              />{' '}
              Air Cond.
        </Label>
          </FormGroup>
          <FormGroup check row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Link className="btn btn-primary btn-sm" to="/">
                Back
              </Link>
              <Button size="sm" color="success" onClick={this.updateAssetRequest}>Update</Button>
            </Col>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}