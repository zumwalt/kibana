/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { safeLoad } from 'js-yaml';

import type { PackagePolicyConfigRecord, RegistryVarsEntry } from '../../../../../types';

import { validatePackagePolicyConfig } from '.';

export const hasInvalidButRequiredVar = (
  registryVars?: RegistryVarsEntry[],
  packagePolicyVars?: PackagePolicyConfigRecord
): boolean => {
  return (
    (registryVars && !packagePolicyVars) ||
    Boolean(
      registryVars &&
        registryVars.find(
          (registryVar) =>
            registryVar.required &&
            (!packagePolicyVars ||
              !packagePolicyVars[registryVar.name] ||
              validatePackagePolicyConfig(
                packagePolicyVars[registryVar.name],
                registryVar,
                registryVar.name,
                safeLoad
              )?.length)
        )
    )
  );
};
