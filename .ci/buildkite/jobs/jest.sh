#!/usr/bin/env bash

set -euo pipefail

export BUILD_TS_REFS_DISABLE=true

.ci/buildkite/bootstrap.sh

echo "--- Jest"
node --expose-gc ./node_modules/.bin/jest --logHeapUsage --runInBand --config $1
