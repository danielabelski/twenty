import { McpToolExecutorService } from 'src/engine/api/mcp/services/mcp-tool-executor.service';

describe('McpToolExecutorService', () => {
  let service: McpToolExecutorService;

  beforeEach(() => {
    service = new McpToolExecutorService();
  });

  describe('handleToolsListing', () => {
    it('should return only tools for tools/list responses', () => {
      const toolSet = {
        test_tool: {
          description: 'A test tool',
          inputSchema: {
            jsonSchema: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                },
              },
              required: ['query'],
            },
          },
        },
      } as any;

      const result = service.handleToolsListing('123', toolSet);

      expect(result).toMatchObject({
        id: '123',
        jsonrpc: '2.0',
        result: {
          tools: [
            {
              name: 'test_tool',
              description: 'A test tool',
              inputSchema: {
                type: 'object',
                properties: {
                  query: {
                    type: 'string',
                  },
                },
                required: ['query'],
              },
            },
          ],
        },
      });

      expect(
        (result as { result: Record<string, unknown> }).result,
      ).not.toHaveProperty('capabilities');
      expect(
        (result as { result: Record<string, unknown> }).result,
      ).not.toHaveProperty('resources');
      expect(
        (result as { result: Record<string, unknown> }).result,
      ).not.toHaveProperty('prompts');
    });

    it('should keep inputSchema unchanged when it is already a plain schema', () => {
      const toolSet = {
        plain_tool: {
          description: 'A plain schema tool',
          inputSchema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
            },
          },
        },
      } as any;

      const result = service.handleToolsListing('456', toolSet);

      expect(result).toMatchObject({
        id: '456',
        jsonrpc: '2.0',
        result: {
          tools: [
            {
              name: 'plain_tool',
              description: 'A plain schema tool',
              inputSchema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                  },
                },
              },
            },
          ],
        },
      });

      expect(
        (result as { result: Record<string, unknown> }).result,
      ).not.toHaveProperty('capabilities');
      expect(
        (result as { result: Record<string, unknown> }).result,
      ).not.toHaveProperty('resources');
      expect(
        (result as { result: Record<string, unknown> }).result,
      ).not.toHaveProperty('prompts');
    });
  });
});
