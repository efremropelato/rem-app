// app/javascript/routes.js
import React from 'react';
import {
    Switch,
    Route,
    useLocation
} from "react-router-dom";
import Assets from './bundles/assets/index';
// Houses
import HouseDetails from './bundles/houses/HouseDetails';
import CreateHouse from './bundles/houses/CreateHouse';
import UpdateHouse from './bundles/houses/UpdateHouse';
// ComplexBuildings
import ComplexBuildingDetails from './bundles/complexBuildings/ComplexBuildingDetails';
import CreateComplexBuilding from './bundles/complexBuildings/CreateComplexBuilding';
import UpdateComplexBuilding from './bundles/complexBuildings/UpdateComplexBuilding';
// CommecialUnits
import CommecialUnitDetails from './bundles/commecialUnits/CommecialUnitDetails';
import CreateCommecialUnit from './bundles/commecialUnits/CreateCommecialUnit';
import UpdateCommecialUnit from './bundles/commecialUnits/UpdateCommecialUnit';

const NoMatch = () => {
    let location = useLocation();
    return (
      <div>
        <h3>
          No match for <code>{location.pathname}</code>
        </h3>
      </div>
    );
  }


export default (props) => {
    return (
        <Switch>
            <Route exact path="/">
                <Assets />
            </Route>
            <Route
                path="/houses/new"
                exact
                component={CreateHouse}
            />
            <Route
                path="/houses/:id"
                exact
                component={HouseDetails}
            />
            <Route
                path="/houses/:id/edit"
                exact
                component={UpdateHouse}
            />
            <Route
                path="/complex_buildings/new"
                exact
                component={CreateComplexBuilding}
            />
            <Route
                path="/complex_buildings/:id"
                exact
                component={ComplexBuildingDetails}
            />
            <Route
                path="/complex_buildings/:id/edit"
                exact
                component={UpdateComplexBuilding}
            />

            <Route
                path="/commecial_units/new"
                exact
                component={CreateCommecialUnit}
            />
            <Route
                path="/commecial_units/:id"
                exact
                component={CommecialUnitDetails}
            />
            <Route
                path="/commecial_units/:id/edit"
                exact
                component={UpdateCommecialUnit}
            />
            <Route path="*">
                <NoMatch />
            </Route>
        </Switch>
    );
}
