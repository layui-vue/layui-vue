#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run commit:eslint
npx --no -- commitlint --edit $1
