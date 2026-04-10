async (page) => {
  const section = page.locator('section').filter({ hasText: 'The Problem:A custom CRM gives your org an edge, but building one comes with tradeoffs' }).first();
  const canvas = section.locator('canvas').first();
  const chain = await page.evaluate(([sectionNode, canvasNode]) => {
    const rows = [];
    let node = canvasNode;
    let depth = 0;
    while (node && depth < 6) {
      const rect = node.getBoundingClientRect();
      const style = getComputedStyle(node);
      rows.push({
        depth,
        tag: node.tagName,
        className: node.className,
        width: rect.width,
        height: rect.height,
        overflow: style.overflow,
        maskImage: style.maskImage,
        webkitMaskImage: style.webkitMaskImage,
        maskSize: style.maskSize,
        position: style.position,
      });
      node = node.parentElement;
      depth += 1;
    }
    return rows;
  }, [await section.elementHandle(), await canvas.elementHandle()]);

  await page.evaluate((data) => {
    console.info('PROBLEM_CHAIN ' + JSON.stringify(data));
  }, chain);
}
