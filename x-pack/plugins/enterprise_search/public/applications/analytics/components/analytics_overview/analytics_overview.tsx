/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { useState } from 'react';

import { EnterpriseSearchAnalyticsPageTemplate } from '../layout';

import { SetAnalyticsChrome as SetPageChrome } from '../../../shared/kibana_chrome';

import { EuiBasicTable, EuiBottomBar, EuiButton, EuiButtonIcon, EuiCopy, EuiEmptyPrompt, EuiFlexGroup, EuiFlexItem, EuiIcon, EuiLink, EuiSpacer, EuiTitle, formatDate } from '@elastic/eui';
import { EuiButtonTo, EuiLinkTo } from '../../../shared/react_router_helpers';
import { COLLECTION_CREATION_PATH, COLLECTION_PATH } from '../../routes';
import { ANALYTICS_PLUGIN } from '@kbn/enterprise-search-plugin/common/constants';

export const AnalyticsOverview: React.FC = () => {
  const [showEmptyState, setShowEmptyState] = useState(false);

  function handleViewChange() {
    setShowEmptyState(!showEmptyState);
  }

  const tableItems = [
    {
      id: 1,
      name: 'My website',
      dsnUrl: 'https://<enterprise-search-url>/analytics/my-website',
      events: 11023,
      createdAt: new Date('2022-08-01'),
    },
    {
      id: 2,
      name: 'My other website',
      dsnUrl: 'https://<enterprise-search-url>/analytics/my-other-website',
      events: 1396,
      createdAt: new Date('2022-08-11'),
    },
  ];

  const tableColumns = [
    {
      field: 'name',
      name: 'Name',
      render: (name: string) => <EuiLinkTo to={COLLECTION_PATH}>{name}</EuiLinkTo>,
      width: '20%'
    },
    {
      field: 'dsnUrl',
      name: 'DSN URL',
      truncateText: true,
      width: '50%',
      render: (dsnUrl: string) => (
        <div>
          <EuiCopy
            textToCopy={dsnUrl}
          >
            {(copy) => <><EuiButtonIcon iconType="copy" onClick={copy} /> <span className="eui-textTruncate">{dsnUrl}</span></>}
          </EuiCopy>
        </div>
      ),
    },
    {
      field: 'events',
      name: 'Events',
      width: '10%',
    },
    {
      field: 'createdAt',
      name: 'Created at',
      width: '10%',
      render: (date: any) => formatDate(date, 'MMM D, YYYY'),
    },
    {
      width: '10%',
      align: 'right',
      render: () => (<EuiLinkTo to={COLLECTION_PATH}>Manage</EuiLinkTo>)
    },
  ];

  return (
    <EnterpriseSearchAnalyticsPageTemplate
      restrictWidth
      pageHeader={{
        pageTitle: 'Behavioral Analytics',
        description: 'Dashboards and tools for visualizing end-user behavior and measuring the performance of your search applications. Track trends over time, identify and investigate anomalies, and make optimizations.',
      }}
    >
      <SetPageChrome />

      {!showEmptyState && (
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiTitle>
              <h2>Collections</h2>
            </EuiTitle>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonTo
              fill={true}
              iconType="plusInCircle"
              to={COLLECTION_CREATION_PATH}
            >
              Create new collection
            </EuiButtonTo>
          </EuiFlexItem>
        </EuiFlexGroup>
      )}

      <EuiSpacer size="l" />
      {showEmptyState ? (
        <EuiEmptyPrompt
          iconType="search"
          title={<h2>You don't have any collections yet</h2>}
          body={<p>An analytics collection provides a place to store the analytics events for any given search application you are building. Create a new collection to get started.</p>}
          actions={[
            <EuiButtonTo
              fill={true}
              iconType="plusInCircle"
              to={COLLECTION_CREATION_PATH}
              >
              Create new collection
            </EuiButtonTo>
          ]}
        />
      ) : (
        <EuiBasicTable
          tableCaption="Collections"
          items={tableItems}
          rowHeader="name"
          columns={tableColumns}
        />
      )}

      <EuiBottomBar
        position='fixed'
        usePortal={true}
      >
        <EuiButton color='ghost' onClick={handleViewChange}>{showEmptyState ? 'Show collections table' : 'Show empty state'}</EuiButton>
      </EuiBottomBar>
    </EnterpriseSearchAnalyticsPageTemplate>
  );
};
