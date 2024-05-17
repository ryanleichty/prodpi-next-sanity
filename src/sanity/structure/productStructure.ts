import defineStructure from '@/sanity/utils/defineStructure'
import { ListItemBuilder } from 'sanity/structure'
import productSettings from '../schema/singletons/productSettings'
import { TagsIcon } from '@sanity/icons'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Products')
    .schemaType('product')
    .icon(TagsIcon)
    .child(
      S.list()
        .title('Products')
        .items([
          S.listItem()
            .title(productSettings.title!)
            .icon(productSettings.icon)
            .child(
              S.editor()
                .id(productSettings.name)
                .schemaType(productSettings.name)
                .documentId(productSettings.name),
            ),
          S.divider(),
          S.listItem().title('All Products').child(S.documentTypeList('product')),
          S.listItem()
            .title('Products by Category')
            .child(
              S.documentTypeList('productCategory').child((id) =>
                S.documentList()
                  .title('Products')
                  .filter('_type == "product" && $id == productCategory._ref')
                  .params({ id }),
              ),
            ),
          S.listItem()
            .title('Products by Print Method')
            .child(
              S.documentTypeList('printMethod').child((id) =>
                S.documentList()
                  .title('Products')
                  .filter('_type == "product" && $id in printMethods[]._ref')
                  .params({ id }),
              ),
            ),
        ]),
    ),
)
