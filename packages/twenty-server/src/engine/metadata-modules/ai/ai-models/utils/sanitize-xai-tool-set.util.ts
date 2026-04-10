import { isArray, isObject } from '@sniptt/guards';
import { type ToolSet } from 'ai';

const sanitizeXaiJsonSchemaValue = (value: unknown): unknown => {
  if (isArray(value)) {
    return value.map(sanitizeXaiJsonSchemaValue);
  }

  if (!isObject(value) || value === null || isArray(value)) {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value)
      .filter(
        ([key, currentValue]) =>
          !(key === 'additionalProperties' && currentValue === false),
      )
    .map(([key, currentValue]) => [
      key,
      sanitizeXaiJsonSchemaValue(currentValue),
    ]),
  );
};

export const sanitizeToolSetForXaiResponses = (toolSet: ToolSet): ToolSet => {
  const sanitized: ToolSet = {};

  for (const [toolName, tool] of Object.entries(toolSet)) {
    if (
      !isObject(tool) ||
      !('inputSchema' in tool) ||
      !isObject(tool.inputSchema) ||
      !('jsonSchema' in tool.inputSchema)
    ) {
      sanitized[toolName] = tool;
      continue;
    }

    sanitized[toolName] = {
      ...tool,
      inputSchema: {
        ...tool.inputSchema,
        jsonSchema: sanitizeXaiJsonSchemaValue(tool.inputSchema.jsonSchema),
      },
    } as ToolSet[string];
  }

  return sanitized;
};
