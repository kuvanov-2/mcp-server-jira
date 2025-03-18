#!/usr/bin/env node
import { Server } from './mcp.js';
import { StdioServerTransport } from './stdio.js';
import axios from 'axios';
const JIRA_HOST = process.env.JIRA_HOST;
const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
if (!JIRA_HOST || !JIRA_EMAIL || !JIRA_API_TOKEN) {
    console.error('Required environment variables are missing');
    process.exit(1);
}
// JIRAクライアントの設定
const authToken = Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString('base64');
const jiraClient = axios.create({
    baseURL: `${JIRA_HOST}/rest/api/2`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Basic ${authToken}`
    }
});
// ツールの定義
const getIssueTool = {
    name: 'get_issue',
    description: 'Get a JIRA issue by key',
    inputSchema: {
        type: 'object',
        properties: {
            issueKey: {
                type: 'string',
                description: 'JIRA issue key (e.g., PROJ-123)'
            }
        },
        required: ['issueKey']
    },
    handler: async (args) => {
        var _a, _b;
        // 引数の型チェック
        if (!args || typeof args !== 'object' || !('issueKey' in args) || typeof args.issueKey !== 'string') {
            throw new Error('Invalid arguments: issueKey (string) is required');
        }
        try {
            const issueKey = args.issueKey;
            const response = await jiraClient.get(`/issue/${issueKey}`);
            return {
                content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
            };
        }
        catch (error) {
            let message = 'Unknown error occurred';
            if (error && typeof error === 'object') {
                const axiosError = error;
                if (axiosError.isAxiosError && ((_b = (_a = axiosError.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.errorMessages)) {
                    message = `JIRA API error: ${axiosError.response.data.errorMessages.join(', ')}`;
                }
                else if (error instanceof Error) {
                    message = error.message;
                }
            }
            throw new Error(message);
        }
    }
};
// サーバーの設定と起動
const server = new Server({
    tools: [getIssueTool],
    serverInfo: {
        name: 'mcp-server-jira',
        version: '0.1.0'
    },
    capabilities: {}
});
const transport = new StdioServerTransport();
console.error('Starting JIRA MCP server...');
server.listen(transport).catch((error) => {
    console.error('Server error:', error.message);
    process.exit(1);
});
//# sourceMappingURL=index.js.map