#!/bin/bash

set -eu

echo "steps:"

find ./src ./packages ./x-pack -name '__fixtures__' -prune -false -o -name jest.config.js | while read file; do
cat << EOF
  - label: ":jest: $file"
    command: ".ci/buildkite/jobs/jest.sh $file"
    agents:
      queue: jest
    artifact_paths: target/junit/**/*.xml
    timeout_in_minutes: 60
EOF
done