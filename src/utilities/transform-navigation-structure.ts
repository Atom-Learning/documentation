const navigationStructure = {
  overview: [],
  theme: [],
  components: {}
}
const nestedNavigationCategories = {
  components: ['Overview', 'General', 'Layout', 'Media', 'Forms', 'Utilities']
}

const sortByCategory = (categories) => (a, b) =>
  categories.indexOf(a.category) - categories.indexOf(b.category)

const groupByCategory = (accumulator, page) => {
  // default to void to not render category name
  const { category = 'void' } = page
  return {
    ...accumulator,
    [category]: [...(accumulator[category] || []), page]
  }
}

export const transformNavigationStructure = (
  items: [string, { category?: string }[]][]
): any => {
  const navigation = { ...navigationStructure }

  items.forEach(([source, pages]) => {
    const sourceHasCategories = pages.some((page) => page.category)

    navigation[source] = sourceHasCategories
      ? pages
          .sort(sortByCategory(nestedNavigationCategories[source]))
          .reduce(groupByCategory, {})
      : pages
  })

  return navigation
}
