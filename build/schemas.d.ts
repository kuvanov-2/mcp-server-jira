import { z } from 'zod';
export declare const GetIssueSchema: z.ZodObject<{
    issueKey: z.ZodString;
}, "strip", z.ZodTypeAny, {
    issueKey: string;
}, {
    issueKey: string;
}>;
export declare const JsonRpcResponseSchema: z.ZodObject<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    id?: number | undefined;
}, {
    jsonrpc: "2.0";
    id?: number | undefined;
}>;
export declare const InitializeRequestSchema: z.ZodObject<z.objectUtil.extendShape<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodNumber>;
}, {
    method: z.ZodLiteral<"initialize">;
    params: z.ZodObject<{
        protocolVersion: z.ZodString;
        capabilities: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        clientInfo: z.ZodObject<{
            name: z.ZodString;
            version: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            version: string;
        }, {
            name: string;
            version: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        protocolVersion: string;
        capabilities: Record<string, unknown>;
        clientInfo: {
            name: string;
            version: string;
        };
    }, {
        protocolVersion: string;
        clientInfo: {
            name: string;
            version: string;
        };
        capabilities?: Record<string, unknown> | undefined;
    }>;
}>, "strip", z.ZodTypeAny, {
    params: {
        protocolVersion: string;
        capabilities: Record<string, unknown>;
        clientInfo: {
            name: string;
            version: string;
        };
    };
    jsonrpc: "2.0";
    method: "initialize";
    id?: number | undefined;
}, {
    params: {
        protocolVersion: string;
        clientInfo: {
            name: string;
            version: string;
        };
        capabilities?: Record<string, unknown> | undefined;
    };
    jsonrpc: "2.0";
    method: "initialize";
    id?: number | undefined;
}>;
export declare const ListToolsRequestSchema: z.ZodObject<z.objectUtil.extendShape<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodNumber>;
}, {
    method: z.ZodLiteral<"tools/list">;
}>, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    method: "tools/list";
    id?: number | undefined;
}, {
    jsonrpc: "2.0";
    method: "tools/list";
    id?: number | undefined;
}>;
export declare const ListResourcesRequestSchema: z.ZodObject<z.objectUtil.extendShape<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodNumber>;
}, {
    method: z.ZodLiteral<"resources/list">;
}>, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    method: "resources/list";
    id?: number | undefined;
}, {
    jsonrpc: "2.0";
    method: "resources/list";
    id?: number | undefined;
}>;
export declare const ListResourceTemplatesRequestSchema: z.ZodObject<z.objectUtil.extendShape<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodNumber>;
}, {
    method: z.ZodLiteral<"resources/templates/list">;
}>, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    method: "resources/templates/list";
    id?: number | undefined;
}, {
    jsonrpc: "2.0";
    method: "resources/templates/list";
    id?: number | undefined;
}>;
export declare const CallToolRequestSchema: z.ZodObject<z.objectUtil.extendShape<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodNumber>;
}, {
    method: z.ZodLiteral<"tools/call">;
    params: z.ZodObject<{
        name: z.ZodString;
        arguments: z.ZodUnknown;
    }, "strip", z.ZodTypeAny, {
        name: string;
        arguments?: unknown;
    }, {
        name: string;
        arguments?: unknown;
    }>;
}>, "strip", z.ZodTypeAny, {
    params: {
        name: string;
        arguments?: unknown;
    };
    jsonrpc: "2.0";
    method: "tools/call";
    id?: number | undefined;
}, {
    params: {
        name: string;
        arguments?: unknown;
    };
    jsonrpc: "2.0";
    method: "tools/call";
    id?: number | undefined;
}>;
export declare const NotificationsInitializedRequestSchema: z.ZodObject<z.objectUtil.extendShape<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodNumber>;
}, {
    method: z.ZodLiteral<"notifications/initialized">;
}>, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    method: "notifications/initialized";
    id?: number | undefined;
}, {
    jsonrpc: "2.0";
    method: "notifications/initialized";
    id?: number | undefined;
}>;
export declare const ErrorResponseSchema: z.ZodObject<z.objectUtil.extendShape<{
    jsonrpc: z.ZodLiteral<"2.0">;
    id: z.ZodOptional<z.ZodNumber>;
}, {
    error: z.ZodObject<{
        code: z.ZodNumber;
        message: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        code: number;
        message: string;
    }, {
        code: number;
        message: string;
    }>;
}>, "strip", z.ZodTypeAny, {
    jsonrpc: "2.0";
    error: {
        code: number;
        message: string;
    };
    id?: number | undefined;
}, {
    jsonrpc: "2.0";
    error: {
        code: number;
        message: string;
    };
    id?: number | undefined;
}>;
export declare const ContentSchema: z.ZodObject<{
    type: z.ZodString;
    text: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: string;
    text: string;
}, {
    type: string;
    text: string;
}>;
export declare const ToolResultSchema: z.ZodObject<{
    content: z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        text: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        text: string;
    }, {
        type: string;
        text: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    content: {
        type: string;
        text: string;
    }[];
}, {
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare const PropertySchema: z.ZodObject<{
    type: z.ZodString;
    description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: string;
    description: string;
}, {
    type: string;
    description: string;
}>;
export declare const InputSchema: z.ZodObject<{
    type: z.ZodLiteral<"object">;
    properties: z.ZodRecord<z.ZodString, z.ZodObject<{
        type: z.ZodString;
        description: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        description: string;
    }, {
        type: string;
        description: string;
    }>>;
    required: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    type: "object";
    properties: Record<string, {
        type: string;
        description: string;
    }>;
    required?: string[] | undefined;
}, {
    type: "object";
    properties: Record<string, {
        type: string;
        description: string;
    }>;
    required?: string[] | undefined;
}>;
export declare const ToolSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    inputSchema: z.ZodObject<{
        type: z.ZodLiteral<"object">;
        properties: z.ZodRecord<z.ZodString, z.ZodObject<{
            type: z.ZodString;
            description: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
            description: string;
        }, {
            type: string;
            description: string;
        }>>;
        required: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        type: "object";
        properties: Record<string, {
            type: string;
            description: string;
        }>;
        required?: string[] | undefined;
    }, {
        type: "object";
        properties: Record<string, {
            type: string;
            description: string;
        }>;
        required?: string[] | undefined;
    }>;
    handler: z.ZodFunction<z.ZodTuple<[z.ZodUnknown], z.ZodUnknown>, z.ZodPromise<z.ZodObject<{
        content: z.ZodArray<z.ZodObject<{
            type: z.ZodString;
            text: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
            text: string;
        }, {
            type: string;
            text: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        content: {
            type: string;
            text: string;
        }[];
    }, {
        content: {
            type: string;
            text: string;
        }[];
    }>>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: Record<string, {
            type: string;
            description: string;
        }>;
        required?: string[] | undefined;
    };
    handler: (args_0: unknown, ...args: unknown[]) => Promise<{
        content: {
            type: string;
            text: string;
        }[];
    }>;
}, {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: Record<string, {
            type: string;
            description: string;
        }>;
        required?: string[] | undefined;
    };
    handler: (args_0: unknown, ...args: unknown[]) => Promise<{
        content: {
            type: string;
            text: string;
        }[];
    }>;
}>;
