import React from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

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

  createAssetRequest = () => {
    console.log('this.state', this.state);
    fetch('/api/v1/commecial_units', {
      method: 'post',
      body: JSON.stringify(this.state),
      headers: { 'Content-Type': 'application/json' },
    }).then(() => {
      this.props.history.push('/')
    });
  }


  render() {
    const {owner, address, sqmt, price, shops, parking } = this.state;
    return (
      <Container>
        <Row>
          <Col>
            <Form>
              <h3>Create new Commecial Unit</h3>
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
                <Label for="shops">Shops</Label>
                <Input type='number' name="shops" id="shops"
                  defaultValue={shops}
                  onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="parking">Parking</Label>
                <Input type='number' name="parking" id="parking"
                  defaultValue={parking}
                  onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup check row>
                <Col sm={{ size: 10, offset: 2 }}>
                  <Button size="sm" color="primary" onClick={() => { this.props.history.push('/') }}>Back</Button>
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