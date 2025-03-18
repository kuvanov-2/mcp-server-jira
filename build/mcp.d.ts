import { z } from 'zod';
import { ToolSchema, ToolResultSchema } from './schemas.js';
export type ToolResult = z.infer<typeof ToolResultSchema>;
export type Tool = z.infer<typeof ToolSchema>;
export declare class Server {
    private tools;
    private serverInfo;
    private capabilities;
    constructor(config: {
        tools: Tool[];
        serverInfo: {
            name: string;
            version: string;
        };
        capabilities?: Record<string, unknown>;
    });
    private createJsonRpcResponse;
    private createJsonRpcError;
    handleRequest(rawRequest: unknown): Promise<{
        jsonrpc: "2.0";
        id: number | undefined;
        result: unknown;
    } | {
        jsonrpc: "2.0";
        id: number | undefined;
        error: {
            code: number;
            message: string;
        };
    } | {
        jsonrpc: "2.0";
    }>;
    listen(transport: {
        onLine: (callback: (line: string) => void) => void;
    }): Promise<void>;
}
