#!/bin/sh

BOT_TOKEN="$1"

curl -X GET "https://api.telegram.org/bot$BOT_TOKEN/getUpdates" > logs/get_updates_$BOT_TOKEN.json