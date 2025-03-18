import { z } from 'zod';
import {
  InitializeRequestSchema,
  NotificationsInitializedRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ListResourceTemplatesRequestSchema,
  CallToolRequestSchema,
  ToolSchema,
  ToolResultSchema,
  GetIssueSchema,
} from './schemas.js';

export type ToolResult = z.infer<typeof ToolResultSchema>;
export type Tool = z.infer<typeof ToolSchema>;

export class Server {
  private tools: Tool[];
  private serverInfo: {
    name: string;
    version: string;
  };
  private capabilities: Record<string, unknown>;

  constructor(config: { 
    tools: Tool[],
    serverInfo: { name: string; version: string },
    capabilities?: Record<string, unknown>
  }) {
    this.tools = config.tools;
    this.serverInfo = config.serverInfo;
    this.capabilities = config.capabilities || {};
    console.error('[MCP Debug] Server initialized with tools:', this.tools.map(t => t.name));
  }

  private createJsonRpcResponse(id: number | undefined, result: unknown) {
    return {
      jsonrpc: '2.0' as const,
      id,
      result,
    };
  }

  private createJsonRpcError(id: number | undefined, code: number, message: string) {
    return {
      jsonrpc: '2.0' as const,
      id,
      error: {
        code,
        message,
      },
    };
  }

  async handleRequest(rawRequest: unknown) {
    console.error('[MCP Debug] Received request:', JSON.stringify(rawRequest));

    try {
      // 初期化リクエスト
      const initializeResult = InitializeRequestSchema.safeParse(rawRequest);
      if (initializeResult.success) {
        const response = this.createJsonRpcResponse(initializeResult.data.id, {
          protocolVersion: initializeResult.data.params.protocolVersion,
          serverInfo: this.serverInfo,
          capabilities: this.capabilities
        });
        console.error('[MCP Debug] Sending initialize response:', JSON.stringify(response));
        return response;
      }

      // 通知初期化リクエスト
      const notificationsInitializedResult = NotificationsInitializedRequestSchema.safeParse(rawRequest);
      if (notificationsInitializedResult.success) {
        // 通知には結果を含めない
        return { jsonrpc: '2.0' as const };
      }

      // ツール一覧リクエスト
      const listToolsResult = ListToolsRequestSchema.safeParse(rawRequest);
      if (listToolsResult.success) {
        const tools = this.tools.map(tool => ({
          name: tool.name,
          description: tool.description,
          inputSchema: {
            type: 'object',
            properties: {
              issueKey: {
                type: 'string',
                description: 'JIRA issue key (e.g., PROJ-123)'
              }
            },
            required: ['issueKey'],
            additionalProperties: false
          }
        }));
        
        const response = this.createJsonRpcResponse(listToolsResult.data.id, { tools });
        console.error('[MCP Debug] Sending tools/list response:', JSON.stringify(response));
        return response;
      }

      // リソース一覧リクエスト
      const listResourcesResult = ListResourcesRequestSchema.safeParse(rawRequest);
      if (listResourcesResult.success) {
        const response = this.createJsonRpcResponse(listResourcesResult.data.id, {
          resources: []
        });
        console.error('[MCP Debug] Sending resources/list response:', JSON.stringify(response));
        return response;
      }

      // リソーステンプレート一覧リクエスト
      const listResourceTemplatesResult = ListResourceTemplatesRequestSchema.safeParse(rawRequest);
      if (listResourceTemplatesResult.success) {
        const response = this.createJsonRpcResponse(listResourceTemplatesResult.data.id, {
          templates: []
        });
        console.error('[MCP Debug] Sending resources/templates/list response:', JSON.stringify(response));
        return response;
      }

      // ツール実行リクエスト
      const callToolResult = CallToolRequestSchema.safeParse(rawRequest);
      if (callToolResult.success) {
        const tool = this.tools.find(t => t.name === callToolResult.data.params.name);
        if (!tool) {
          return this.createJsonRpcError(
            callToolResult.data.id,
            -32601,
            `Unknown tool: ${callToolResult.data.params.name}`
          );
        }

        try {
          const result = await tool.handler(callToolResult.data.params.arguments);
          const response = this.createJsonRpcResponse(callToolResult.data.id, result);
          console.error('[MCP Debug] Tool execution successful:', JSON.stringify(response));
          return response;
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          const errorResponse = this.createJsonRpcError(callToolResult.data.id, -32603, message);
          console.error('[MCP Debug] Tool execution failed:', JSON.stringify(errorResponse));
          return errorResponse;
        }
      }

      // 未知のメソッド
      const request = z.object({ method: z.string(), id: z.number().optional() }).parse(rawRequest);
      const error = this.createJsonRpcError(request.id, -32601, `Unknown method: ${request.method}`);
      console.error('[MCP Debug] Unknown method:', JSON.stringify(error));
      return error;

    } catch (error) {
      console.error('[MCP Debug] Request handling error:', error);
      return this.createJsonRpcError(undefined, -32700, 'Parse error');
    }
  }

  async listen(transport: { onLine: (callback: (line: string) => void) => void }) {
    console.error('[MCP Debug] Server starting to listen');
    transport.onLine(async (line: string) => {
      try {
        console.error('[MCP Debug] Received line:', line);
        const request = JSON.parse(line);
        const response = await this.handleRequest(request);
        console.log(JSON.stringify(response));
      } catch (error) {
        console.error('[MCP Debug] Parse error:', error);
        console.log(JSON.stringify(this.createJsonRpcError(undefined, -32700, 'Parse error')));
      }
    });
  }
}
