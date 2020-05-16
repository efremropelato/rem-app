import React from 'react';
import {cloneDeep} from 'lodash';
import UploaderImage from '../support/UploaderImage';
import ViewerImages from '../support/ViewerImages';

import { Container, Row, Col, Button, ButtonGroup, Form, FormGroup, Label, Input, Card, CardHeader, CardBody, CardText } from 'reactstrap';
import CurrencyInput from 'react-currency-input';

export default class UpdateAsset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedImages: [],
      id: null,
      owner: '',
      address: '',
      sqmt: 0,
      price: 0
    }
    this.assetList = this.assetList.bind(this)
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    fetch(`/api/v1/commecial_units/${id}`).
      then((response) => response.json()).
      then((asset) => this.setState({ ...asset }));
    fetch(`/api/v1/assets/CommecialUnit/${id}/images`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ uploadedImages: data })
      });
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.type != 'checkbox' ? event.target.value : event.target.checked });
  }

  handleFileChange = (event) => {
    this.setState({ images: event.target.files });
  }

  updateAssetRequest = (event) => {
    fetch(`/api/v1/commecial_units/${this.state.id}`, {
      method: 'put',
      body: JSON.stringify(this.state),
      headers: { 'Content-Type': 'application/json' },
    }).then(() => {
      this.assetList()
    });
  }

  assetList(){
    this.props.history.push('/')
  }

  render() {
    const {id, owner, address, sqmt, price, shops, parking } = this.state;
    return (
      <Container>
        <Row>
          <Col>
            <Form>
              <Card>
                <CardHeader>Edit Commecial Unit {id}</CardHeader>
                <CardBody>
                  <CardText>
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
                        onChangeEvent={this.handleInputChange} />
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
                  </CardText>
                  <FormGroup check row>
                    <ButtonGroup size="sm">
                      <Button size="sm" color="primary" onClick={()=>{this.props.history.push('/')}}>Back</Button>
                      <Button size="sm" color="success" onClick={this.updateAssetRequest}>Update</Button>
                    </ButtonGroup>
                  </FormGroup>
                </CardBody>
              </Card>
            </Form>
          </Col>
          <Col>
            <ViewerImages images={this.state.uploadedImages} />
            <UploaderImage
              assetId={this.state.id}
              assetList={this.assetList}
              url={`/api/v1/assets/CommecialUnit/${this.state.id}/images`} />
          </Col>
        </Row>
      </Container>
    );
  }
}
