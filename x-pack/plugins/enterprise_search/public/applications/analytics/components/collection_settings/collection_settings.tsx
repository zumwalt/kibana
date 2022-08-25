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

import { ROOT_PATH, COLLECTIONS_PATH, COLLECTION_PATH, COLLECTION_INTEGRATE_PATH } from '../../routes';
import { EuiButton, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiForm, EuiFormRow, EuiHorizontalRule, EuiIcon, EuiPanel, EuiSpacer, EuiText, EuiTitle } from '@elastic/eui';
import { ANALYTICS_PLUGIN } from '@kbn/enterprise-search-plugin/common/constants';


export const AnalyticsCollectionSettings: React.FC = () => {
  const { http } = useValues(HttpLogic)

  return (
    <EnterpriseSearchAnalyticsPageTemplate
      restrictWidth
      pageHeader={{
        breadcrumbs: [
          {
            text: 'Behavioral Analytics',
            href: http.basePath.prepend(ANALYTICS_PLUGIN.URL + ROOT_PATH)
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
            href: http.basePath.prepend(ANALYTICS_PLUGIN.URL + COLLECTION_PATH),
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
            isSelected: true,
          },
        ]
      }}
    >
      <SetPageChrome />

      <div className="entSearch__collectionIntegrateLayout">
        <EuiPanel hasShadow={false} hasBorder={true} paddingSize="l">
          <EuiTitle size="s">
            <h4>Collection settings</h4>
          </EuiTitle>
          <EuiSpacer size="l" />
          <EuiTitle size="xs">
            <h4>Collection name</h4>
          </EuiTitle>
          <EuiSpacer size="xs" />
          <EuiText size="s">
            <p>The collection name is used to identify individual events, among other things.</p>
          </EuiText>
          <EuiSpacer size="m" />
          <EuiForm>
            <EuiFormRow label="Collection name" fullWidth>
              <EuiFieldText placeholder="Enter collection name" value="My website" fullWidth />
            </EuiFormRow>
          </EuiForm>
          <EuiSpacer size="l" />
          <EuiFlexGroup justifyContent="flexEnd">
            <EuiFlexItem grow={false}>
              <EuiButton fill>Save</EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPanel>
        <EuiSpacer size="l" />
        <EuiPanel hasShadow={false} color="danger" paddingSize="l">
          <EuiTitle size="s">
            <h4>Delete this analytics collection</h4>
          </EuiTitle>
          <EuiSpacer size="s" />
          <EuiText size="s">
            <p>This action is irreversible</p>
          </EuiText>
          <EuiSpacer />
          <EuiButton fill color="danger">Delete this collection</EuiButton>
        </EuiPanel>
      </div>

    </EnterpriseSearchAnalyticsPageTemplate>
  );
};
