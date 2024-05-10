import defineStructure from '@/sanity/utils/defineStructure'
import { ListItemBuilder } from 'sanity/structure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Products')
    .schemaType('product')
    .child(
      S.list()
        .title('Products')
        .items([
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
