#!/bin/bash
rm -rf smali-src && ./gradlew assemble &&  apktool d app/build/outputs/apk/release/app-release-unsigned.apk -o smali-src
