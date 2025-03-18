#!/bin/bash

# カレントディレクトリをスクリプトの場所に変更
cd "$(dirname "$0")"

# 環境変数を設定
export JIRA_HOST="https://smarthr.atlassian.net"
export JIRA_EMAIL="yu.kuwano@smarthr.co.jp"
export JIRA_API_TOKEN="op://Employee/JIRA API Token/info/access token"

# 環境変数を1Password CLIで解決
for var in $(env | cut -d= -f1); do
  value=$(eval echo \$$var)
  if [[ $value == op://* ]]; then
    echo "Resolving 1Password secret for $var"
    resolved_value=$(op read "$value")
    if [ $? -eq 0 ]; then
      export $var="$resolved_value"
      echo "Successfully resolved secret for $var"
    else
      echo "Error: Failed to read secret for $var from 1Password" >&2
      exit 1
    fi
  fi
done

# 環境変数の検証
if [ -z "$JIRA_API_TOKEN" ]; then
  echo "Error: JIRA_API_TOKEN is not set" >&2
  exit 1
fi

echo "Starting JIRA MCP server..."

# サーバー起動
node build/index.js
