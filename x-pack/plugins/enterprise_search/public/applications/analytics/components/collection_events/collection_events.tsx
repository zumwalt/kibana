/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { useValues } from 'kea';
import { HttpLogic } from '../../../shared/http';

import { EnterpriseSearchAnalyticsPageTemplate } from '../layout';

import { SetAnalyticsChrome as SetPageChrome } from '../../../shared/kibana_chrome';

import { ROOT_PATH, COLLECTIONS_PATH, COLLECTION_INTEGRATE_PATH, COLLECTION_SETTINGS_PATH } from '../../routes';
import { EuiIcon } from '@elastic/eui';
import { ANALYTICS_PLUGIN } from '@kbn/enterprise-search-plugin/common/constants';

export const AnalyticsCollectionEvents: React.FC = () => {
  const { http } = useValues(HttpLogic)

  return (
    <EnterpriseSearchAnalyticsPageTemplate
      restrictWidth
      pageHeader={{
        breadcrumbs: [
          {
            text: 'Behavioral Analytics',
            href: http.basePath.prepend(ANALYTICS_PLUGIN.URL + ROOT_PATH),
          },
          {
            text: 'Collections',
            href: http.basePath.prepend(ANALYTICS_PLUGIN.URL + COLLECTIONS_PATH)
          },
          {
            text: 'My Website',
          }
        ],
        pageTitle: 'My website',
        description: 'Dashboards and tools for visualizing end-user behavior and measuring the performance of your search applications. Track trends over time, identify and investigate anomalies, and make optimizations.',
        tabs: [
          {
            id: 'events',
            label: 'Events',
            isSelected: true,
          },
          {
            id: 'integrate',
            label: 'Integrate',
            prepend: <EuiIcon type="editorCodeBlock" size="l" />,
            href: http.basePath.prepend(ANALYTICS_PLUGIN.URL + COLLECTION_INTEGRATE_PATH),
          },
          {
            id: 'settings',
            label: 'Settings',
            href: http.basePath.prepend(ANALYTICS_PLUGIN.URL + COLLECTION_SETTINGS_PATH),
          },
        ]
      }}
    >
      <SetPageChrome />

      {`<LogStream /> component`}

    </EnterpriseSearchAnalyticsPageTemplate>
  );
};
