import { z } from 'zod';

export const GetIssueSchema = z.object({
  issueKey: z.string().describe('JIRA issue key (e.g., PROJ-123)')
});

// 基本的なレスポンス構造
export const JsonRpcResponseSchema = z.object({
  jsonrpc: z.literal('2.0'),
  id: z.number().optional(),
});

// 初期化リクエスト
export const InitializeRequestSchema = JsonRpcResponseSchema.extend({
  method: z.literal('initialize'),
  params: z.object({
    protocolVersion: z.string(),
    capabilities: z.record(z.unknown()).default({}),
    clientInfo: z.object({
      name: z.string(),
      version: z.string(),
    }),
  }),
});

// ツール一覧リクエスト
export const ListToolsRequestSchema = JsonRpcResponseSchema.extend({
  method: z.literal('tools/list'),
});

// リソース一覧リクエスト
export const ListResourcesRequestSchema = JsonRpcResponseSchema.extend({
  method: z.literal('resources/list'),
});

// リソーステンプレート一覧リクエスト
export const ListResourceTemplatesRequestSchema = JsonRpcResponseSchema.extend({
  method: z.literal('resources/templates/list'),
});

// ツール実行リクエスト
export const CallToolRequestSchema = JsonRpcResponseSchema.extend({
  method: z.literal('tools/call'),
  params: z.object({
    name: z.string(),
    arguments: z.unknown(),
  }),
});

// 通知初期化リクエスト
export const NotificationsInitializedRequestSchema = JsonRpcResponseSchema.extend({
  method: z.literal('notifications/initialized'),
});

// エラーレスポンス
export const ErrorResponseSchema = JsonRpcResponseSchema.extend({
  error: z.object({
    code: z.number(),
    message: z.string(),
  }),
});

// コンテンツ型の定義
export const ContentSchema = z.object({
  type: z.string(),
  text: z.string(),
});

// ツール実行結果の定義
export const ToolResultSchema = z.object({
  content: z.array(ContentSchema),
});

// プロパティスキーマの定義
export const PropertySchema = z.object({
  type: z.string(),
  description: z.string(),
});

// 入力スキーマの定義
export const InputSchema = z.object({
  type: z.literal('object'),
  properties: z.record(PropertySchema),
  required: z.array(z.string()).optional(),
});

// ツールの定義
export const ToolSchema = z.object({
  name: z.string(),
  description: z.string(),
  inputSchema: InputSchema,
  handler: z.function()
    .args(z.unknown())
    .returns(z.promise(ToolResultSchema))
});
