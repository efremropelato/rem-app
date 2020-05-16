import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

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
    fetch('/api/v1/houses', {
      method: 'post',
      body: JSON.stringify(this.state),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      location.href = '/';
      toast.success("Asset created successfully!");
    });
  }

  render() {
    const { owner, address, sqmt, price, rooms, floors, air_cond } = this.state;
    return (
      <Container>
        <Row>
          <Col>
            <Form>
              <h3>Create new House</h3>
              <FormGroup>
                <Label for="owner">Owner</Label>
                <Input type='text' name="owner" id="owner" placeholder="Owner..."
                  defaultValue={owner}
                  onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="address">Address</Label>
                <Input type='text' name="address" id="address" placeholder="Address..."
                  defaultValue={address}
                  onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="sqmt">SQMT</Label>
                <Input type='number' name="sqmt" id="sqmt"
                  defaultValue={sqmt}
                  onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="price">Price (€)</Label>
                <Input type='number' name="price" id="price"
                  defaultValue={price}
                  onChange={this.handleInputChange} />
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
                  <Button size="sm" color="success" onClick={this.createAssetRequest}>Create</Button>
                </Col>
              </FormGroup>
            </Form>
          </Col>
          <Col>

          </Col>
        </Row>
      </Container>
    );
  }
}