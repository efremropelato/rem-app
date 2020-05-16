import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {map,orderBy} from 'lodash';
import NumberFormat from 'react-number-format';
import moment from 'moment';

import { Container, Table, Button, ButtonGroup, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class AssetsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { assets: [], dropdownOpen: false };

    this.toggle = this.toggle.bind(this);

    moment.locale(); 
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
      then(() => {
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
      <Container fluid={true}>
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
              <th>Created at</th>
              <th>Updated at</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              map(orderBy(assets, ['created_at'], ['asc']), (asset) => {
                return (
                  <tr key={asset.id}>
                    <td>
                        {asset.id}
                    </td>
                    <td>{asset.type}</td>
                    <td>{asset.owner}</td>
                    <td>{asset.address}</td>
                    <td>{asset.sqmt}</td>
                    <td><NumberFormat value={asset.price} displayType={'text'} fixedDecimalScale={true} thousandSeparator={'.'} decimalSeparator={','} suffix={' €'} /></td>
                    <td>{moment(asset.created_at).format('llll')}</td>
                    <td>{moment(asset.updated_at).format('llll')}</td>
                    <td>
                      <ButtonGroup>
                      <Link className="btn btn-primary btn-sm" to={`/${assetType(asset.type)}/${asset.id}`}>
                        Details
                      </Link>
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