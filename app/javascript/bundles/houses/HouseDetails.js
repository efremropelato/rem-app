import React from 'react';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import { Container, Row, Col, Button, ButtonGroup, Form, FormGroup, Label, Input, Card, CardHeader, CardBody, CardTitle, CardText } from 'reactstrap';
import { Carousel } from 'react-responsive-carousel';
import ViewerImages from '../support/ViewerImages'

export default class AssetDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { asset: {}, images: [] };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const a = fetch(`/api/v1/houses/${id}`).then((response) => response.json())
    const i = fetch(`/api/v1/assets/House/${id}/images`).then((response) => response.json())
    Promise.all([a, i]).then((data) => {
      this.setState({ asset: data[0], images: data[1] })
    });
  }

  render() {
    const { asset, images } = this.state;
    return (
      <Container>
        <Row>
          <Col>
            <Card>
              <CardHeader>House {asset.id}</CardHeader>
              <CardBody>
                <CardText>
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
                    <p> {asset.air_cond ? 'true' : 'false'} </p>
                  </div>
                </CardText>
                <FormGroup check row>
                  <ButtonGroup size="sm">
                    <Link className="btn btn-primary btn-sm" to="/">Back</Link>
                    <Button size="sm" color="success" onClick={()=>{}}>Buy</Button>
                  </ButtonGroup>
                </FormGroup>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardHeader>Images {asset.id}</CardHeader>
              <CardBody>
                <CardText>
                  <ViewerImages images={images}/>
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}