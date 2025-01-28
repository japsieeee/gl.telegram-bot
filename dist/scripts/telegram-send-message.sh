#!/bin/sh

BOT_TOKEN="$1"
MESSAGE="$2"
CHAT_ID="$3"

curl -X POST "https://api.telegram.org/bot$BOT_TOKEN/sendMessage" \
     -d "chat_id=$CHAT_ID" \
     -d "text=$MESSAGE"