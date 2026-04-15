import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { apiVersion, dataset, projectId } from './env'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  apiVersion,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Pages group
            S.listItem()
              .title('Pages')
              .child(
                S.list()
                  .title('Pages')
                  .items([
                    S.listItem()
                      .title('Home')
                      .id('homePage')
                      .child(
                        S.document()
                          .schemaType('homePage')
                          .documentId('homePage')
                      ),
                    S.listItem()
                      .title('About')
                      .id('aboutPage')
                      .child(
                        S.document()
                          .schemaType('aboutPage')
                          .documentId('aboutPage')
                      ),
                    S.listItem()
                      .title('Borrowers')
                      .id('borrowersPage')
                      .child(
                        S.document()
                          .schemaType('borrowersPage')
                          .documentId('borrowersPage')
                      ),
                    S.listItem()
                      .title('Investors')
                      .id('investorsPage')
                      .child(
                        S.document()
                          .schemaType('investorsPage')
                          .documentId('investorsPage')
                      ),
                    S.listItem()
                      .title('Strategies')
                      .id('strategiesPage')
                      .child(
                        S.document()
                          .schemaType('strategiesPage')
                          .documentId('strategiesPage')
                      ),
                    S.listItem()
                      .title('Contact')
                      .id('contactPage')
                      .child(
                        S.document()
                          .schemaType('contactPage')
                          .documentId('contactPage')
                      ),
                    S.listItem()
                      .title('Insights')
                      .id('insightsPage')
                      .child(
                        S.document()
                          .schemaType('insightsPage')
                          .documentId('insightsPage')
                      ),
                  ])
              ),

            S.divider(),

            // Content group
            S.listItem()
              .title('Content')
              .child(
                S.list()
                  .title('Content')
                  .items([
                    S.listItem()
                      .title('Blog Posts')
                      .child(S.documentTypeList('post').title('Blog Posts')),
                    S.listItem()
                      .title('Authors')
                      .child(S.documentTypeList('author').title('Authors')),
                    S.listItem()
                      .title('Team Members')
                      .child(S.documentTypeList('teamMember').title('Team Members')),
                    S.listItem()
                      .title('Case Studies')
                      .child(S.documentTypeList('caseStudy').title('Case Studies')),
                  ])
              ),

            S.divider(),

            // Settings group
            S.listItem()
              .title('Settings')
              .child(
                S.list()
                  .title('Settings')
                  .items([
                    S.listItem()
                      .title('Site Settings')
                      .id('siteSettings')
                      .child(
                        S.document()
                          .schemaType('siteSettings')
                          .documentId('siteSettings')
                      ),
                  ])
              ),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
