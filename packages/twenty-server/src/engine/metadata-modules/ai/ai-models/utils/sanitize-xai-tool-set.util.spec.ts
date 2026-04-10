import { jsonSchema, type ToolSet } from 'ai';

import { sanitizeToolSetForXaiResponses } from './sanitize-xai-tool-set.util';

const containsAdditionalPropertiesFalse = (value: unknown): boolean => {
  if (Array.isArray(value)) {
    return value.some(containsAdditionalPropertiesFalse);
  }

  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const record = value as Record<string, unknown>;

  if (record.additionalProperties === false) {
    return true;
  }

  return Object.values(record).some(containsAdditionalPropertiesFalse);
};

const getJsonSchema = (inputSchema: unknown): Record<string, unknown> => {
  if (
    typeof inputSchema === 'object' &&
    inputSchema !== null &&
    'jsonSchema' in inputSchema &&
    typeof inputSchema.jsonSchema === 'object' &&
    inputSchema.jsonSchema !== null
  ) {
    return inputSchema.jsonSchema as Record<string, unknown>;
  }

  throw new Error('Expected tool inputSchema with jsonSchema');
};

describe('sanitizeToolSetForXaiResponses', () => {
  it('removes all additionalProperties: false in tool input schemas', () => {
    const tools: ToolSet = {
      test_tool: {
        description: 'test tool',
        inputSchema: jsonSchema({
          type: 'object',
          properties: {
            properties: {
              type: 'object',
              additionalProperties: false,
              properties: {
                field: { type: 'string' },
              },
            },
          },
          additionalProperties: false,
          $defs: {
            nested: {
              type: 'object',
              additionalProperties: false,
              properties: {
                inner: {
                  type: 'object',
                  additionalProperties: false,
                },
              },
            },
          },
        }),
        execute: async () => ({ success: true, message: 'ok' }),
      },
    };

    const sanitized = sanitizeToolSetForXaiResponses(tools);
    const sanitizedSchema = getJsonSchema(sanitized.test_tool.inputSchema);

    expect(containsAdditionalPropertiesFalse(sanitizedSchema)).toBe(false);
  });

  it('keeps non-boolean additionalProperties values intact', () => {
    const tools: ToolSet = {
      test_tool: {
        description: 'test tool',
        inputSchema: jsonSchema({
          type: 'object',
          additionalProperties: { type: 'string' },
          properties: {
            payload: {
              type: 'object',
              additionalProperties: { type: 'number' },
            },
          },
        }),
        execute: async () => ({ success: true, message: 'ok' }),
      },
    };

    const sanitized = sanitizeToolSetForXaiResponses(tools);
    const sanitizedSchema = getJsonSchema(sanitized.test_tool.inputSchema);
    const properties = sanitizedSchema.properties as {
      payload: { additionalProperties: unknown };
    };

    expect(sanitizedSchema.additionalProperties).toEqual({ type: 'string' });
    expect(properties.payload.additionalProperties).toEqual({
      type: 'number',
    });
  });
});
