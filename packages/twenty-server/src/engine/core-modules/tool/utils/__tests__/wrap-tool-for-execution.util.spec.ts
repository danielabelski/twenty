import { wrapJsonSchemaForExecution } from '../wrap-tool-for-execution.util';

describe('wrapJsonSchemaForExecution', () => {
  it('preserves schema metadata such as $defs and additionalProperties', () => {
    const filterSchema = {
      type: 'object',
      properties: {
        and: {
          type: 'array',
          items: {
            $ref: '#/$defs/condition',
          },
        },
      },
      required: ['and'],
    };

    const inputSchema = {
      type: 'object',
      properties: {
        filter: {
          $ref: '#/$defs/filter',
        },
      },
      required: ['filter'],
      additionalProperties: false,
      $defs: {
        filter: filterSchema,
        condition: {
          type: 'object',
          properties: {
            eq: { type: 'string' },
          },
        },
      },
    };

    const wrappedSchema = wrapJsonSchemaForExecution(inputSchema);

    expect(wrappedSchema.$defs).toEqual(inputSchema.$defs);
    expect(wrappedSchema.additionalProperties).toBe(false);
    expect(wrappedSchema.properties).toMatchObject({
      filter: { $ref: '#/$defs/filter' },
      loadingMessage: {
        type: 'string',
        description: 'A brief status message for the user.',
      },
    });
    expect(wrappedSchema.required).toEqual(
      expect.arrayContaining(['loadingMessage', 'filter']),
    );
  });

  it('deduplicates loadingMessage in required fields', () => {
    const wrappedSchema = wrapJsonSchemaForExecution({
      type: 'object',
      properties: {
        query: { type: 'string' },
      },
      required: ['loadingMessage', 'query'],
    });

    expect(wrappedSchema.required).toEqual(['loadingMessage', 'query']);
  });

  it('builds a valid object schema when optional keys are missing', () => {
    const wrappedSchema = wrapJsonSchemaForExecution({});

    expect(wrappedSchema.type).toBe('object');
    expect(wrappedSchema.properties).toEqual({
      loadingMessage: {
        type: 'string',
        description: 'A brief status message for the user.',
      },
    });
    expect(wrappedSchema.required).toEqual(['loadingMessage']);
  });
});
