/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { useState } from 'react';

import { EnterpriseSearchAnalyticsPageTemplate } from '../layout';

import { SetAnalyticsChrome as SetPageChrome } from '../../../shared/kibana_chrome';

import { EuiBasicTable, EuiBottomBar, EuiButton, EuiButtonEmpty, EuiButtonIcon, EuiCopy, EuiEmptyPrompt, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiForm, EuiFormRow, EuiIcon, EuiPanel, EuiSpacer, EuiText, EuiTitle, formatDate } from '@elastic/eui';

import '../analytics.scss';

export const AnalyticsCollectionCreation: React.FC = () => {
  return (
    <EnterpriseSearchAnalyticsPageTemplate
      restrictWidth
      className="entSearch__collectionCreationPageTemplate"
    >
      <SetPageChrome />

      <EuiFlexGroup className="entSearch__collectionCreationLayout">
        <EuiFlexItem>
          <EuiPanel hasShadow={false} paddingSize="xl" grow={false} hasBorder={true}>
            <EuiTitle>
              <h2>Create an analytics collection</h2>
            </EuiTitle>
            <EuiSpacer size='s' />
            <EuiText size='s'>
              <p>An analytics collection provides a place to store the analytics events for any given search application you are building. Give it a memorable name below.</p>
            </EuiText>
            <EuiSpacer />
            <EuiForm>
              <EuiFormRow label="Collection name" fullWidth>
                <EuiFieldText name="collection-name" fullWidth autoFocus />
              </EuiFormRow>
            </EuiForm>
            <EuiSpacer />
            <EuiFlexGroup
              justifyContent="flexEnd"
              gutterSize='s'
            >
              <EuiFlexItem grow={false}>
                <EuiButtonEmpty>
                  Cancel
                </EuiButtonEmpty>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButton fill>
                  Continue
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>

    </EnterpriseSearchAnalyticsPageTemplate>
  );
};
