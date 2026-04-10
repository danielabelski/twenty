import { type StepResult, type ToolSet } from 'ai';

const NATIVE_SEARCH_TOOL_NAMES = new Set(['web_search', 'x_search']);

export const countNativeWebSearchCallsFromSteps = (
  steps: StepResult<ToolSet>[],
): number => {
  let searchCallCount = 0;

  for (const step of steps) {
    for (const toolCall of step.toolCalls) {
      if (NATIVE_SEARCH_TOOL_NAMES.has(toolCall.toolName)) {
        searchCallCount += 1;
      }
    }
  }

  return searchCallCount;
};
