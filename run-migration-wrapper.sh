#!/bin/bash
set -a
source .env.local
set +a
node run-migration.mjs
