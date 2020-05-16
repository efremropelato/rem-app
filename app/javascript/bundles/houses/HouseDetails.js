import React from 'react';
import { Container, Row, Col, Button, ButtonGroup, FormGroup, Card, CardHeader, CardBody, CardText } from 'reactstrap';
import ViewerImages from '../support/ViewerImages'

export default class AssetDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { asset: {}, images: [] };

    this.buyAsset = this.buyAsset.bind(this)
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const a = fetch(`/api/v1/houses/${id}`).then((response) => response.json())
    const i = fetch(`/api/v1/assets/House/${id}/images`).then((response) => response.json())
    Promise.all([a, i]).then((data) => {
      this.setState({ asset: data[0], images: data[1] })
    });
  }

  buyAsset(){
    const { match: { params: { id } } } = this.props;
    fetch(`/api/v1/assets/House/${id}/buy`, {
      method: 'post',
      body: null,
      headers: { 'Content-Type': 'application/json' },
    }).then(() => {
      this.props.history.push('/')
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
                { asset.buyed ? (
                    <ButtonGroup size="sm">
                      <Button size="sm" color="primary" onClick={()=>{this.props.history.push('/')}}>
                        <i class="fa fa-arrow-left"></i>
                      </Button>
                    </ButtonGroup>
                  ) : (
                    <ButtonGroup size="sm">
                      <Button size="sm" color="primary" onClick={()=>{this.props.history.push('/')}}>
                        <i class="fa fa-arrow-left"></i>
                      </Button>
                      <Button size="sm" color="success" onClick={this.buyAsset}>
                        <i class="fa fa-euro"></i>{' '}Buy
                      </Button>
                    </ButtonGroup>
                  )
                }
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