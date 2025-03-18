#!/usr/bin/env node
import { Server } from './mcp.js';
import { StdioServerTransport } from './stdio.js';
import axios from 'axios';
import type { Tool, ToolResult } from './mcp.js';

const JIRA_HOST = process.env.JIRA_HOST as string;
const JIRA_EMAIL = process.env.JIRA_EMAIL as string;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN as string;

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
const getIssueTool: Tool = {
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
  handler: async (args: unknown): Promise<ToolResult> => {
    // 引数の型チェック
    if (!args || typeof args !== 'object' || !('issueKey' in args) || typeof (args as any).issueKey !== 'string') {
      throw new Error('Invalid arguments: issueKey (string) is required');
    }

    try {
      const issueKey = (args as { issueKey: string }).issueKey;
      const response = await jiraClient.get(`/issue/${issueKey}`);
      return {
        content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
      };
    } catch (error) {
      let message = 'Unknown error occurred';
      if (error && typeof error === 'object') {
        const axiosError = error as any;
        if (axiosError.isAxiosError && axiosError.response?.data?.errorMessages) {
          message = `JIRA API error: ${axiosError.response.data.errorMessages.join(', ')}`;
        } else if (error instanceof Error) {
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
server.listen(transport).catch((error: Error) => {
  console.error('Server error:', error.message);
  process.exit(1);
});
