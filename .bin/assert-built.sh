#!bin/bash
if [ -n "$(yarn build && git status --porcelain)" ]; then
  echo "Error: Compiling typescript yielded a diff."
  echo "Please run `yarn build` locally, commit your files, and try again.";
  exit 1
else
  echo "✨ build looks good";
fi
