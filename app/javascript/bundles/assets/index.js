import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {map} from 'lodash';

import { Container, Row, Col, Table, Button, ButtonGroup, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class AssetsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { assets: [], dropdownOpen: false };

    this.toggle = this.toggle.bind(this)
  }

  componentDidMount() {
    this.fetchAssetsList();
  }

  fetchAssetsList = () => {
    fetch('/api/v1/assets').
      then((response) => response.json()).
      then((assets) => this.setState({ assets }));
  };

  handleDelete = (assetId, assetType) => {
    fetch(`/api/v1/${assetType}/${assetId}`, { method: 'delete' }).
      then((response) => {
        toast.success("Asset deleted successfully!");
        this.fetchAssetsList();
      });
  }

  toggle() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  }

  render() {
    const { assets, dropdownOpen } = this.state;
    const assetType = (type) => {
      switch (type) {
        case 'House':
          return 'houses'
        case 'ComplexBuilding':
          return 'complex_buildings'
        case 'CommecialUnit':
          return 'commecial_units'
        default:
          break;
      }
    }
    return (
      <Container>
        <span className="clearfix">
          <h3 className="float-left">All Assets</h3>
          <ButtonDropdown isOpen={dropdownOpen} toggle={this.toggle} direction="left" className="float-right">
            <DropdownToggle caret size="sm" color="success">
              New
          </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Create new...</DropdownItem>
              <Link className="btn btn-secondary dropdown-item" onClick={this.toggle} to="/houses/new">... House</Link>
              <Link className="btn btn-secondary dropdown-item" onClick={this.toggle} to="/complex_buildings/new">... Complex Buildings</Link>
              <Link className="btn btn-secondary dropdown-item" onClick={this.toggle} to="/commecial_units/new">... Commecial Units</Link>
            </DropdownMenu>
          </ButtonDropdown>
        </span>
        <Table responsive striped hover size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Owner</th>
              <th>Address</th>
              <th>SQMT</th>
              <th>Price (€)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              map(_.orderBy(assets, ['created_at'], ['asc']), (asset) => {
                return (
                  <tr key={asset.id}>
                    <td>
                      <Link className="btn btn-primary btn-sm" to={`/${assetType(asset.type)}/${asset.id}`}>
                        {asset.id}
                      </Link>
                    </td>
                    <td>{asset.type}</td>
                    <td>{asset.owner}</td>
                    <td>{asset.address}</td>
                    <td>{asset.sqmt}</td>
                    <td>{asset.price}</td>
                    <td>
                      <ButtonGroup>
                        <Link className="btn btn-warning btn-sm" to={`/${assetType(asset.type)}/${asset.id}/edit`}>
                          Edit
                        </Link>
                        <Button size="sm" color="danger" onClick={() => this.handleDelete(asset.id, assetType(asset.type))}>
                          Delete
                      </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </Container>
    );
  }
}