async (page) => {
  const fs = await import('node:fs');
  const path = await import('node:path');
  const locator = page.locator("section:has-text('The Problem:') canvas").first();
  const dataUrl = await locator.evaluate((canvas) => canvas.toDataURL('image/png'));
  const base64 = dataUrl.replace(/^data:image\/png;base64,/, '');
  const out = path.resolve('output/playwright/problem-canvas-raw.png');
  fs.writeFileSync(out, Buffer.from(base64, 'base64'));
  return { out };
}
