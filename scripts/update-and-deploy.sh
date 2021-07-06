#!/bin/bash

# access to .env
set -o allexport; source .env; set +o allexport

# check for vars before using
if [ -z "$APP_ID" ] || [ -z "$DIGITAL_OCEAN_API_TOKEN" ]; then
  echo ''
  echo 'Missing $APP_ID and $DIGITAL_OCEAN_API_TOKEN environment variables'
  exit 1
fi

echo 'Stashing current files and checking out main'
git stash
git checkout main

echo 'Installing latest version of'
echo '@atom-learning/components'
echo '@atom-learning/theme'
echo '@atom-learning/icons'

yarn add @atom-learning/components @atom-learning/theme @atom-learning/icons

echo 'Committing change and pushing to remote'
git add package.json yarn.lock
git commit -m "chore: release updated components, theme & icons"
git push

echo 'Triggering Digital Ocean App Platform build'
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $DIGITAL_OCEAN_API_TOKEN" "https://api.digitalocean.com/v2/apps/$APP_ID/deployments"
