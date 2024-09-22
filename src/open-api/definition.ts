export const definition = {
  openapi: {
    openapi: '3.1.0',
    info: {
      title: 'Retail Product Catalog',
      description: 'Retail Product Catalog with Fuzzy Search Capability',
      version: '1.0.0'
    },
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    tags: [
      { name: 'Products', description: 'Products related end-points' },
      { name: 'Search', description: 'Search related end-points' }
    ]
  }
}
