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

import { ROOT_PATH, COLLECTIONS_PATH, COLLECTION_PATH, COLLECTION_SETTINGS_PATH } from '../../routes';
import { EuiButtonIcon, EuiCodeBlock, EuiCopy, EuiDescriptionList, EuiIcon, EuiPanel, EuiSpacer, EuiText, EuiTitle } from '@elastic/eui';
import { ANALYTICS_PLUGIN } from '@kbn/enterprise-search-plugin/common/constants';

export const AnalyticsCollectionIntegrate: React.FC = () => {
  const { http } = useValues(HttpLogic)

  const credentials = [
    {
      title: 'Collection name',
      description: (
        <EuiCopy textToCopy='my-website'>
          {(copy) => <><EuiButtonIcon iconType="copy" onClick={copy} /> <span>my-website</span></>}
        </EuiCopy>
      )
    },
    {
      title: 'DSN URL',
      description: (
        <EuiCopy textToCopy={`https://<enterprise-search-url>/analytics/my-website`}>
          {(copy) => <><EuiButtonIcon iconType="copy" onClick={copy} /> <span>{`https://<enterprise-search-url>/analytics/my-website`}</span></>}
        </EuiCopy>
      )
    },
  ]

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
            href: http.basePath.prepend(ANALYTICS_PLUGIN.URL + COLLECTION_PATH),
          },
          {
            id: 'integrate',
            label: 'Integrate',
            prepend: <EuiIcon type="editorCodeBlock" size="l" />,
            isSelected: true,
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

      <div className="entSearch__collectionIntegrateLayout">
        <EuiTitle>
          <h4>Credentials</h4>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiPanel hasShadow={false} color="subdued">
          <EuiDescriptionList
            listItems={credentials}
            type="column"
            align="center"
            titleProps={{ className: 'entSearch__collectionCredentialTitle' }}
            // descriptionProps={{ className: 'eui-textTruncate' }}
          />
        </EuiPanel>

        <EuiSpacer size="l" />

        <EuiTitle>
          <h4>Start tracking events</h4>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiText size="s">
          <p>Embed the JS snippet below on every page of the website or application you’d like to track.</p>
        </EuiText>
        <EuiSpacer size="s" />
        <EuiCodeBlock language="html" isCopyable>
          {`<script src="https://<enterprise-search-url>/analytics.js" data-dsn="https://<enterprise-search-url>/analytics/<collection_name>" defer></script>`}
        </EuiCodeBlock>

        <EuiSpacer size="l" />
        <EuiText size="s">
          <p>Track individual events, like clicks, by calling the <strong>trackEvent</strong> method.</p>
        </EuiText>
        <EuiSpacer size="s" />
        <EuiCodeBlock language="js" isCopyable>
          {`window.elasticAnalytics.trackEvent("ResultClick", {
   title: "Website Analytics",
   url: "www.elasitc.co/analytics/website"
})`}
        </EuiCodeBlock>
      </div>

    </EnterpriseSearchAnalyticsPageTemplate>
  );
};
