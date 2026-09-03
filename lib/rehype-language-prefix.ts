type HastNode = {
  type?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

function walk(node: HastNode, visit: (node: HastNode) => void) {
  visit(node);
  node.children?.forEach((child) => walk(child, visit));
}

export default function rehypeLanguagePrefix() {
  return (tree: HastNode, file: { path?: string; history?: string[] }) => {
    const path = String(file.path ?? file.history?.[0] ?? '');
    const prefix = /(?:^|[\\/])zh\.mdx$/i.test(path)
      ? 'zh-'
      : /(?:^|[\\/])en\.mdx$/i.test(path)
        ? 'en-'
        : '';

    if (!prefix) return;

    walk(tree, (node) => {
      if (!node.properties) return;

      if (typeof node.properties.id === 'string') {
        node.properties.id = `${prefix}${node.properties.id}`;
      }

      if (
        typeof node.properties.href === 'string' &&
        node.properties.href.startsWith('#')
      ) {
        node.properties.href = `#${prefix}${node.properties.href.slice(1)}`;
      }

      const describedBy = node.properties.ariaDescribedBy;
      if (typeof describedBy === 'string') {
        node.properties.ariaDescribedBy = describedBy
          .split(/\s+/)
          .map((value) => `${prefix}${value}`)
          .join(' ');
      }
    });
  };
}
