import React from 'react';
import { toast } from 'react-toastify';
import { Container, Row, Col, Button, ButtonGroup, Form, FormGroup, Label, Input, Card, CardHeader, CardBody, CardTitle, CardText } from 'reactstrap';
import { map, forEach, concat } from 'lodash';

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedImages: [],
      files: []
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    forEach(this.state.files, (f) => {
      formData.append('files[]', f.file);
    })
    fetch(this.props.url, {
      method: 'post',
      body: formData
    }).then((response) => {
      this.props.history.push('/')
      toast.success("Asset updated successfully!");
    });
  }

  handleImageChange(e) {
    e.preventDefault();
    const rf = []
    forEach(e.target.files, (file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        rf.push({
          file: file,
          imagePreviewUrl: reader.result
        })
        this.setState({ files: rf });
      }
      reader.readAsDataURL(file)
    });
  }

  render() {
    const { imagePreviewUrl } = this.state;
    const imagePreview = imagePreviewUrl ? <img src={imagePreviewUrl} height="100" width="100" /> : null;

    const images = map(this.state.files, (file) => {
      return <img src={file.imagePreviewUrl} height="100" width="100" />
    });

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Card>
            <CardHeader>Images {this.props.assetId}</CardHeader>
            <CardBody>
              <CardText>
                <Input type="file" multiple onChange={this.handleImageChange} />
              </CardText>
              <Button type="submit" onClick={this.handleSubmit}>Upload Image</Button>
            </CardBody>
          </Card>
        </Form>
        {images}
        {imagePreview}
      </div>
    )
  }

}

export default ImageUpload;