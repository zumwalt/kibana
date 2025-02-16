/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import datemath from '@kbn/datemath';
import { useEsSearch } from '@kbn/observability-plugin/public';
import { serviceNameQuery } from '../../../../services/data/service_name_query';
import { ServiceNameFilter } from '../url_filter/service_name_filter';
import { useLegacyUrlParams } from '../../../../context/url_params_context/use_url_params';
import { useDataView } from '../local_uifilters/use_data_view';

function callDateMath(value: unknown): number {
  const DEFAULT_RETURN_VALUE = 0;
  if (typeof value === 'string') {
    return datemath.parse(value)?.valueOf() ?? DEFAULT_RETURN_VALUE;
  }
  return DEFAULT_RETURN_VALUE;
}

export function WebApplicationSelect() {
  const {
    rangeId,
    urlParams: { start, end },
  } = useLegacyUrlParams();
  const { dataViewTitle } = useDataView();

  const { data, loading } = useEsSearch(
    {
      index: dataViewTitle,
      ...serviceNameQuery(callDateMath(start), callDateMath(end)),
    },
    // `rangeId` works as a cache buster for ranges that never change, like `Today`
    [start, end, rangeId, dataViewTitle],
    { name: 'UxApplicationServices' }
  );

  const rumServiceNames =
    data?.aggregations?.services?.buckets.map(({ key }) => key as string) ?? [];

  return (
    <ServiceNameFilter loading={!!loading} serviceNames={rumServiceNames} />
  );
}
