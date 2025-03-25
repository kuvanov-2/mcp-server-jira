# MCP Server for JIRA

このModel Context Protocol (MCP) サーバーは、JIRAとの連携機能を提供します。ChatGPTやその他のAIアシスタントがJIRAのイシューを直接操作できるようになります。

<a href="https://glama.ai/mcp/servers/@kuvanov-2/mcp-server-jira">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@kuvanov-2/mcp-server-jira/badge" alt="Server for JIRA MCP server" />
</a>

## 機能

このMCPサーバーは以下のツールを提供します：

- `get_issue`: JIRAイシューの詳細情報を取得

## インストール

```bash
# リポジトリをクローン
git clone https://github.com/kuvanov-2/mcp-server-jira.git
cd mcp-server-jira

# 依存関係をインストール
npm install

# ビルド
npm run build
```

## 設定

MCPサーバーを使用するには、以下の設定を行う必要があります：

### 1. 事前準備

### 1-1. 1Password CLIの設定

1Passwordのデスクトップアプリをインストールしておきます。

1Password CLIをインストールします。

```bash
brew install 1password-cli
```

1Password（デスクトップアプリ）の設定で、CLI連携を有効にします。

### 1-2. JIRAのAPIトークンの取得

[こちらからJIRA API TOKENを取得](https://id.atlassian.com/manage-profile/security/api-tokens)します。

JIRAのAPIトークンを1Passwordに保存

### 2. Visual Studio Codeの設定

設定ファイルを開きます：
- macOS: `~/Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`
- Windows: `%APPDATA%\Code\User\globalStorage\saoudrizwan.claude-dev\settings\cline_mcp_settings.json`

以下の設定を追加します：

```json
{
  "mcpServers": {
	"github.com/kuvanov-2/mcp-server-jira": {
	  "command": "/path/to/mcp-server-jira/start-server.sh",
	  "env": {
		"JIRA_HOST": "https://your-domain.atlassian.net",
		"JIRA_EMAIL": "your-email@example.com",
		"JIRA_API_TOKEN": "op://YOUR_VAULT_NAME/YOUR_ITEM_NAME/info/access token" 
	  },
	  "disabled": false,
	  "autoApprove": []
	}
  }
}
```

環境変数の説明：
- `JIRA_HOST`: JIRAのホストURL
- `JIRA_EMAIL`: JIRAのアカウントメールアドレス
- `JIRA_API_TOKEN`: 1Password内に保存されたJIRA APIトークンへの参照

JIRAのAPI TOKENは、1Passwordに保存する想定です。
`JIRA API Token`には、1Passwordの該当フィールドへのパスを指定します。パスはフィールド右クリックからコピーできます。

![](media/token.jpg)

`start-server.sh`スクリプトが自動的に1Password CLIを使用して環境変数を解決し、サーバーを起動します。

## 使用方法

### get_issue

JIRAのイシューの詳細情報を取得します。

```typescript
<use_mcp_tool>
<server_name>github.com/kuvanov-2/mcp-server-jira</server_name>
<tool_name>get_issue</tool_name>
<arguments>
{
  "issueKey": "PROJ-123"
}
</arguments>
</use_mcp_tool>
```

## ライセンス

MIT