#!/bin/bash

set -eu

echo "steps:"

find src packages x-pack -name jest.config.js | while read file; do
cat << EOF
  - label: ":jest:"
    command: "docker run -it \"gcr.io/elastic-kibana-184716/buildkite/ci/base:$BUILDKITE_COMMIT\" node --expose-gc ./node_modules/.bin/jest --logHeapUsage --runInBand --config $file"
    agents:
      queue: jest
    artifact_paths: target/junit/**/*.xml
    timeout_in_minutes: 60
    plugins:
      - 'uber-workflow/run-without-clone':
EOF
done