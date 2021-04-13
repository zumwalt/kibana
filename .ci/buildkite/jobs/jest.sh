#!/usr/bin/env bash

set -euo pipefail

export BUILD_TS_REFS_DISABLE=true

.ci/buildkite/bootstrap.sh

echo "--- Jest"
node --preserve-symlinks --preserve-symlinks-main --expose-gc ./node_modules/.bin/jest --logHeapUsage --runInBand --config $1
