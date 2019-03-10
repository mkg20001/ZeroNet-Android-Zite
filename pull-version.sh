#!/bin/bash

REPO="HelloZeroNet/ZeroNet-kivy"
LATEST_APK=$(curl -s https://api.github.com/repos/$REPO/releases?pre_page=100 | jq -c ".[0].assets[] | [ .browser_download_url ]" | grep -o "https.*.apk")

rm -rf dl
mkdir dl
for arch in arm64-v8 armeabi-v7a x86 x86_64; do
  arch2=$(echo "$arch" | sed "s|_|-|g")
  DL_URL=$(echo "$LATEST_APK" | grep "$arch2" | head -n 1)
  wget "$DL_URL" -O "dl/zeronet-$arch.apk"
done
