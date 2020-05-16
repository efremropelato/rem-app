import React from 'react';
import { Link } from 'react-router-dom';
import { map, orderBy } from 'lodash';
import NumberFormat from 'react-number-format';
import moment from 'moment';

import { Container, Table, Button, ButtonGroup, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import currentUser from '../support/currentUser'

export default class AssetsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { assets: [], dropdownOpen: false };

    this.toggle = this.toggle.bind(this);
    this.fetchAssetsList = this.fetchAssetsList.bind(this);

  }

  componentDidMount() {
    this.fetchAssetsList();
    currentUser.on('change', this.fetchAssetsList);
  }

  componentWillUnmount(){
    currentUser.removeListener('change', this.fetchAssetsList);
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
    const assetIcon = (type) => {
      switch (type) {
        case 'House':
          return 'fa fa-home'
        case 'ComplexBuilding':
          return 'fa fa-building'
        case 'CommecialUnit':
          return 'fa fa-shopping-basket'
        default:
          break;
      }
    }
    return (
      <Container fluid={true}>
        <span className="clearfix">
          <h3 className="float-left">All Assets</h3>
          {currentUser.email == 'admin@rem.test' ? (
            <ButtonDropdown isOpen={dropdownOpen} toggle={this.toggle} direction="left" className="float-right">
              <DropdownToggle caret size="sm" color="success">
              <i class="fa fa-plus-square"></i>
            </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Create new...</DropdownItem>
                <Link className="btn btn-secondary dropdown-item" onClick={this.toggle} to="/houses/new">... House</Link>
                <Link className="btn btn-secondary dropdown-item" onClick={this.toggle} to="/complex_buildings/new">... Complex Buildings</Link>
                <Link className="btn btn-secondary dropdown-item" onClick={this.toggle} to="/commecial_units/new">... Commecial Units</Link>
              </DropdownMenu>
            </ButtonDropdown>
          ):null}
        </span>
        <Table responsive striped hover size="sm">
          <thead>
            <tr style={{textAlign:'center'}}>
              <th>ID</th>
              <th>Owner</th>
              <th>Type<br/>Address</th>
              <th>SQMT</th>
              <th>Price (€)</th>
              <th>Created at<br/>Updated at</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              map(orderBy(assets, ['created_at'], ['asc']), (asset) => {
                return (
                  <tr key={asset.id} style={{backgroundColor: asset.buyed ? '#EA6153' : null, textDecoration: asset.buyed ? 'line-through' : null}}>
                    <td>{asset.buyed ? <i class="fa fa-euro">{asset.id}</i> : asset.id }</td>
                    <td>{asset.owner}</td>
                    <td><i className={assetIcon(asset.type)}></i>{' '}{asset.type}<br/>{asset.address}</td>
                    <td style={{textAlign:'center'}}>{asset.sqmt}</td>
                    <td style={{textAlign:'center'}}><NumberFormat value={asset.price} displayType={'text'} fixedDecimalScale={true} thousandSeparator={'.'} decimalSeparator={','} suffix={' €'} /></td>
                    <td>{moment(asset.created_at).format('llll')}<br/>
                        {moment(asset.updated_at).format('llll')}</td>
                    <td>
                        {currentUser.email == 'admin@rem.test' ? (
                          <ButtonGroup>
                            <Link className="btn btn-primary btn-sm" to={`/${assetType(asset.type)}/${asset.id}`}>
                              <i class="fa fa-info-circle"></i>
                            </Link>
                            <Link className="btn btn-warning btn-sm" to={`/${assetType(asset.type)}/${asset.id}/edit`}>
                            <i class="fa fa-edit"></i>
                            </Link>
                            <Button size="sm" color="danger" onClick={() => this.handleDelete(asset.id, assetType(asset.type))}>
                              <i class="fa fa-trash"></i>
                            </Button>
                          </ButtonGroup>
                        )  : (
                          <ButtonGroup>
                            <Link className="btn btn-primary btn-sm" to={`/${assetType(asset.type)}/${asset.id}`}>
                              <i class="fa fa-info-circle"></i>
                            </Link>
                          </ButtonGroup>
                        )}
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