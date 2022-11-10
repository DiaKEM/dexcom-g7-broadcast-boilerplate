#!/bin/bash
echo "Removing old resources and trigger a new build"
rm -rf smali-src && ./gradlew assemble &&  apktool d app/build/outputs/apk/release/app-release-unsigned.apk -o smali-src
rm ./final-broadcasting.smali

echo "Prepare raw file with final changes..."
node prepare.js

echo "File was created successfully: final-broadcasting.smali"