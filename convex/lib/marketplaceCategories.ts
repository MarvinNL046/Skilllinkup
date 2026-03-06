type CategoryDoc = {
  _id: string;
  _creationTime?: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  imageUrl?: string;
  parentId?: string;
  serviceType?: string;
  sortOrder?: number;
  isActive?: boolean;
  locale: string;
  seoMetadata?: unknown;
  createdAt: number;
  updatedAt: number;
};

type CategoryNode = CategoryDoc & {
  children: CategoryNode[];
  directGigCount: number;
  gigCount: number;
  depth: number;
  pathSlugs: string[];
};

function sortNodes(nodes: CategoryNode[]) {
  return nodes.sort((a, b) => {
    const sortDiff = (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
    if (sortDiff !== 0) return sortDiff;
    return a.name.localeCompare(b.name);
  });
}

function findNodeBySlug(nodes: CategoryNode[], slug: string): CategoryNode | null {
  for (const node of nodes) {
    if (node.slug === slug) return node;
    const found = findNodeBySlug(node.children, slug);
    if (found) return found;
  }
  return null;
}

function collectDescendantIds(node: CategoryNode): string[] {
  const ids = [node._id];
  for (const child of node.children) {
    ids.push(...collectDescendantIds(child));
  }
  return ids;
}

export function buildMarketplaceCategoryTree(
  categories: CategoryDoc[],
  directGigCounts: Map<string, number> = new Map()
) {
  const nodeMap = new Map<string, CategoryNode>();

  for (const category of categories) {
    nodeMap.set(category._id, {
      ...category,
      children: [],
      directGigCount: directGigCounts.get(category._id) ?? 0,
      gigCount: directGigCounts.get(category._id) ?? 0,
      depth: 0,
      pathSlugs: [category.slug],
    });
  }

  const roots: CategoryNode[] = [];

  for (const node of nodeMap.values()) {
    if (node.parentId) {
      const parent = nodeMap.get(node.parentId);
      if (parent) {
        parent.children.push(node);
        continue;
      }
    }
    roots.push(node);
  }

  const finalizeNode = (
    node: CategoryNode,
    depth = 0,
    parentPathSlugs: string[] = []
  ) => {
    node.depth = depth;
    node.pathSlugs = [...parentPathSlugs, node.slug];
    sortNodes(node.children);
    node.gigCount = node.directGigCount;

    for (const child of node.children) {
      finalizeNode(child, depth + 1, node.pathSlugs);
      node.gigCount += child.gigCount;
    }

    return node;
  };

  return sortNodes(roots).map((root) => finalizeNode(root));
}

export function getMarketplaceCategoryBySlug(
  categories: CategoryDoc[],
  slug: string,
  directGigCounts: Map<string, number> = new Map()
) {
  const tree = buildMarketplaceCategoryTree(categories, directGigCounts);
  return findNodeBySlug(tree, slug);
}

export function getMarketplaceDescendantIds(node: ReturnType<typeof getMarketplaceCategoryBySlug>) {
  if (!node) return [];
  return collectDescendantIds(node);
}
