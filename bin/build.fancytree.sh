#!/usr/bin/env sh
# SPDX-License-Identifier: EPL-2.0 OR GPL-2.0-or-later
# SPDX-FileCopyrightText: Contributors To The `net.splitcells.*` Projects
#
# This will be build rarely,
# so its best to clean everything in order to avoid errors based on old cached packages.
rm -rf node_modules
rm package.json
rm package-lock.json
npm install jquery-ui jquery.fancytree
npm install --save-dev rollup @rollup/plugin-node-resolve
mkdir -p src/main/resources/html/net/splitcells/website/js
node_modules/.bin/rollup bin/build.fancytree.mjs \
  -f iife \
  -o src/main/resources/html/net/splitcells/website/js/jquery-fancytree-all-deps.min.js \
  -p @rollup/plugin-node-resolve