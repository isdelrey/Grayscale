#!/bin/bash
echo "Redeploying..."

echo "Stash"
git stash

echo "Pull"
git pull origin master

echo "Build"
npm run build

echo "Restart"
npm run start