#!/bin/bash

set -euxo pipefail

# docker push "gcr.io/elastic-kibana-184716/buildkite/base"
docker push "tylersmalley/kibana-ci-base"
