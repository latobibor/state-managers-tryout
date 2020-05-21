import React from 'react';
import { Switch, Route } from 'react-router-dom';

export interface StateManagerSwitcherProps {
  // TODO: use a type here, now it does not matter
  reduxComponent: React.ReactNode;
  overmindComponent: React.ReactNode;
}

export function StateManagerSwitcher({ reduxComponent, overmindComponent }: StateManagerSwitcherProps) {
  return (
    <Switch>
      <Route path="/" exact>
        {reduxComponent}
      </Route>
      <Route path="/overmind" exact>
        {overmindComponent}
      </Route>
    </Switch>
  );
}
