#!/bin/bash
set -a
source .env.local
set +a
node check-db.mjs
