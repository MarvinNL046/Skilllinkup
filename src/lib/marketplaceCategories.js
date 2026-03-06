export function sortMarketplaceCategories(categories = []) {
  return [...categories].sort((a, b) => {
    const sortDiff = (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
    if (sortDiff !== 0) return sortDiff;
    return (a.name || "").localeCompare(b.name || "");
  });
}

export function flattenMarketplaceCategories(categories = [], depth = 0, trail = []) {
  const sorted = sortMarketplaceCategories(categories);
  const items = [];

  for (const category of sorted) {
    const nextTrail = [...trail, category.name];
    items.push({
      ...category,
      depth,
      trail: nextTrail,
      label: nextTrail.join(" / "),
      isLeaf: !category.children || category.children.length === 0,
    });

    if (category.children?.length) {
      items.push(...flattenMarketplaceCategories(category.children, depth + 1, nextTrail));
    }
  }

  return items;
}

export function flattenLeafMarketplaceCategories(categories = []) {
  return flattenMarketplaceCategories(categories).filter((category) => category.isLeaf);
}
