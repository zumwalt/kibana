/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { InitialAppData } from '../../../common/types';

import { AnalyticsOverview } from './components/analytics_overview'
import { AnalyticsCollectionEvents } from './components/collection_events';
import { AnalyticsCollectionCreation } from './components/collection_creation';

import {
  ROOT_PATH,
  COLLECTIONS_PATH,
  COLLECTION_CREATION_PATH,
  COLLECTION_PATH,
  COLLECTION_INTEGRATE_PATH,
  COLLECTION_SETTINGS_PATH,
} from './routes';
import { AnalyticsCollectionIntegrate } from './components/collection_integrate';
import { AnalyticsCollectionSettings } from './components/collection_settings/collection_settings';

export const Analytics: React.FC<InitialAppData> = (props) => {

  return (
    <Switch>
      <Route exact path={ROOT_PATH}>
        <Redirect to={COLLECTIONS_PATH} />
      </Route>
      <Route exact path={COLLECTIONS_PATH}>
        <AnalyticsOverview />
      </Route>
      <Route exact path={COLLECTION_CREATION_PATH}>
        <AnalyticsCollectionCreation />
      </Route>
      <Route exact path={COLLECTION_PATH}>
        <AnalyticsCollectionEvents />
      </Route>
      <Route exact path={COLLECTION_INTEGRATE_PATH}>
        <AnalyticsCollectionIntegrate />
      </Route>
      <Route exact path={COLLECTION_SETTINGS_PATH}>
        <AnalyticsCollectionSettings />
      </Route>
    </Switch>
  );
};
