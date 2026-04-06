import Papa from 'papaparse';

const DEFAULT_PREVIEW_ROWS = 50;

// Read only enough bytes from the response stream to extract preview rows,
// avoiding downloading the entire file (which can be many MB) and blocking
// the main thread while converting it to text via response.text().
const MAX_PREVIEW_BYTES = 1024 * 512; // 512 KB — generous for 50 rows of CSV

export type CsvPreviewData = {
  headers: string[];
  rows: string[][];
};

const readPartialResponseText = async (
  response: Response,
): Promise<string> => {
  const reader = response.body?.getReader();

  if (!reader) {
    return response.text();
  }

  const decoder = new TextDecoder();
  let accumulated = '';

  try {
    while (accumulated.length < MAX_PREVIEW_BYTES) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      accumulated += decoder.decode(value, { stream: true });
    }
  } finally {
    reader.cancel();
  }

  return accumulated;
};

export const fetchCsvPreview = async (url: string): Promise<CsvPreviewData> => {
  const response = await fetch(url);
  const text = await readPartialResponseText(response);

  const result = Papa.parse<string[]>(text, {
    preview: DEFAULT_PREVIEW_ROWS + 1, // +1 for header row
    skipEmptyLines: true,
    header: false,
  });

  const [headers = [], ...rows] = result.data;

  return { headers, rows };
};
