#!/usr/bin/env bash

# Run from root project folder

STYLE="$(<src/inject.css)"
JAVASCRIPT="$(<src/inject.js)"
OUTPUT="${JAVASCRIPT/!StylePlaceholder/$STYLE}"

if [ ! -d "build/" ]; then
    mkdir build
fi

#echo "Building Firefox Extension"

echo "Building Safari Extension"
cp -r src/safari-extension build/safari-extension
echo "${OUTPUT}" > build/safari-extension/almaweb.safariextension/inject.js

echo "Building Chrome Extension"
cp -r src/chrome-extension build/chrome-extension
echo "${OUTPUT}" > build/chrome-extension/inject.js

echo "Done"