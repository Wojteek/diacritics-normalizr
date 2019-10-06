#!/usr/bin/env bash
set -e

if [ -z "${GH_TOKEN}" ]; then
  echo "\$GH_TOKEN environment variable doesn't exist!"
  exit 1
fi

echo "Building the package..."

if ! yarn build; then
  echo "Build process was failed!"
  exit 1
fi

if ! nextVersion=$(node ./node_modules/conventional-recommended-bump/cli.js -p angular); then
  echo "Check a new version was failed!"
  exit 1
fi

echo "Updating the version of this package (to $nextVersion)"

if ! yarn version --${nextVersion}; then
  exit 1
fi

newVersionOfPackage=$(node -p "require('./package.json').version")

git push --tags
git push
yarn publish . --tag $newVersionOfPackage

read -p "Do you want to make a release? (y/n) " isRelease

if [ "$isRelease" = "y" ]; then
  if ! node ./node_modules/conventional-github-releaser/src/cli.js -p angular -t $GH_TOKEN; then
    echo "Creating release was failed!"
    exit 1
  fi
fi
