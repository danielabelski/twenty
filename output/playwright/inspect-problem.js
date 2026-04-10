async (page) => {
  const section = page.locator("section:has-text('The Problem:')").first();
  const canvas = section.locator('canvas').first();
  const sectionEl = await section.elementHandle();
  const canvasEl = await canvas.elementHandle();

  const data = await page.evaluate(([sectionNode, canvasNode]) => {
    const sectionRect = sectionNode.getBoundingClientRect();
    const canvasRect = canvasNode.getBoundingClientRect();
    const parent = canvasNode.parentElement;
    const parentRect = parent?.getBoundingClientRect() ?? null;
    const sectionStyle = getComputedStyle(sectionNode);
    const parentStyle = parent ? getComputedStyle(parent) : null;

    return {
      sectionRect: {
        x: sectionRect.x,
        y: sectionRect.y,
        width: sectionRect.width,
        height: sectionRect.height,
      },
      canvasRect: {
        x: canvasRect.x,
        y: canvasRect.y,
        width: canvasRect.width,
        height: canvasRect.height,
      },
      canvasAttr: {
        width: canvasNode.width,
        height: canvasNode.height,
      },
      parentTag: parent?.tagName ?? null,
      parentRect: parentRect
        ? {
            x: parentRect.x,
            y: parentRect.y,
            width: parentRect.width,
            height: parentRect.height,
          }
        : null,
      parentMaskImage: parentStyle?.maskImage ?? null,
      parentWebkitMaskImage: parentStyle?.webkitMaskImage ?? null,
      parentMaskSize: parentStyle?.maskSize ?? null,
      parentOverflow: parentStyle?.overflow ?? null,
      sectionOverflow: sectionStyle.overflow ?? null,
      devicePixelRatio: window.devicePixelRatio,
    };
  }, [sectionEl, canvasEl]);

  console.log(JSON.stringify(data, null, 2));
}
