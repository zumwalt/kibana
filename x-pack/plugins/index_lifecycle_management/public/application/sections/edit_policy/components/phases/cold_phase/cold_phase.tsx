/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { FunctionComponent } from 'react';
import { FormattedMessage } from '@kbn/i18n/react';
import { i18n } from '@kbn/i18n';

import { EuiTextColor } from '@elastic/eui';

import { useConfigurationIssues } from '../../../form';

import { LearnMoreLink, ToggleFieldWithDescribedFormRow } from '../../';

import {
  DataTierAllocationField,
  SearchableSnapshotField,
  IndexPriorityField,
  ReplicasField,
  RollupField,
} from '../shared_fields';

import { Phase } from '../phase';

const i18nTexts = {
  dataTierAllocation: {
    description: i18n.translate('xpack.indexLifecycleMgmt.coldPhase.dataTier.description', {
      defaultMessage:
        'Move data to nodes optimized for less frequent, read-only access. Store data in the cold phase on less-expensive hardware.',
    }),
  },
};

export const ColdPhase: FunctionComponent = () => {
  const {
    isUsingSearchableSnapshotInHotPhase,
    isUsingSearchableSnapshotInColdPhase,
  } = useConfigurationIssues();

  return (
    <Phase phase="cold" topLevelSettings={<SearchableSnapshotField phase="cold" />}>
      <ReplicasField phase="cold" />

      {/* Freeze section */}
      {!isUsingSearchableSnapshotInHotPhase && (
        <ToggleFieldWithDescribedFormRow
          title={
            <h3>
              <FormattedMessage
                id="xpack.indexLifecycleMgmt.editPolicy.coldPhase.freezeText"
                defaultMessage="Freeze"
              />
            </h3>
          }
          description={
            <EuiTextColor color="subdued">
              <FormattedMessage
                id="xpack.indexLifecycleMgmt.editPolicy.coldPhase.freezeIndexExplanationText"
                defaultMessage="Make the index read-only and minimize its memory footprint."
              />{' '}
              <LearnMoreLink docPath="ilm-freeze.html" />
            </EuiTextColor>
          }
          fullWidth
          titleSize="xs"
          switchProps={{
            'data-test-subj': 'freezeSwitch',
            path: '_meta.cold.freezeEnabled',
          }}
        >
          <div />
        </ToggleFieldWithDescribedFormRow>
      )}

      {/* Data tier allocation section */}
      <DataTierAllocationField
        description={i18nTexts.dataTierAllocation.description}
        phase="cold"
      />

      {!isUsingSearchableSnapshotInColdPhase && !isUsingSearchableSnapshotInHotPhase && (
        <RollupField phase="cold" />
      )}

      <IndexPriorityField phase="cold" />
    </Phase>
  );
};
