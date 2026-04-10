async (page) => {
  const section = page.locator('section').filter({ hasText: 'The Problem:A custom CRM gives your org an edge, but building one comes with tradeoffs' }).first();
  const canvas = section.locator('canvas').first();
  const metrics = await page.evaluate(([sectionNode, canvasNode]) => {
    const sectionRect = sectionNode.getBoundingClientRect();
    const canvasRect = canvasNode.getBoundingClientRect();
    const masked = canvasNode.parentElement?.parentElement ?? null;
    const maskedStyle = masked ? getComputedStyle(masked) : null;
    return {
      sectionRect: { width: sectionRect.width, height: sectionRect.height },
      canvasRect: { width: canvasRect.width, height: canvasRect.height },
      canvasAttr: { width: canvasNode.width, height: canvasNode.height },
      maskedRect: masked ? { width: masked.getBoundingClientRect().width, height: masked.getBoundingClientRect().height } : null,
      maskedOverflow: maskedStyle?.overflow ?? null,
      maskedMaskImage: maskedStyle?.maskImage ?? null,
      maskedWebkitMaskImage: maskedStyle?.webkitMaskImage ?? null,
      maskedMaskSize: maskedStyle?.maskSize ?? null,
      dpr: window.devicePixelRatio,
    };
  }, [await section.elementHandle(), await canvas.elementHandle()]);

  await page.evaluate((data) => {
    console.info('PROBLEM_METRICS ' + JSON.stringify(data));
  }, metrics);
}
