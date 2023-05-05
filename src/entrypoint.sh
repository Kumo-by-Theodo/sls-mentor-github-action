#!/bin/sh

set -e

[ -f yarn.lock ] && yarn install
[ -f package-lock.json ] && npm install
[ -f pnpm.lock ] && pnpm install

NODE_PATH=node_modules GITHUB_TOKEN="${GITHUB_TOKEN:-${1:-.}}"  node /action/src/run.js

rm -rf node_modules # cleanup to prevent some weird permission errors later on 
