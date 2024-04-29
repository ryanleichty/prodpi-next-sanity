/**
 * This plugin contains all the logic for setting up the singletons
 */

import {
  NewDocumentOptionsResolver,
  type DocumentDefinition,
  DocumentActionsResolver,
} from 'sanity'
import { type StructureResolver } from 'sanity/structure'

export const singletonPlugin = (types: string[]) => {
  const resolveNewDocumentOptions: NewDocumentOptionsResolver = (
    prev,
    { creationContext },
  ) => {
    if (creationContext.type === 'global') {
      return prev.filter(
        (templateItem) => !types.includes(templateItem.templateId),
      )
    }

    return prev
  }

  const resolveDocumentActions: DocumentActionsResolver = (
    prev,
    { schemaType }: { schemaType: string },
  ) => {
    if (types.includes(schemaType)) {
      return prev.filter(({ action }) => action !== 'duplicate')
    }

    return prev
  }

  return {
    name: 'singleton-plugin',
    document: {
      // Hides new document options on singletons
      newDocumentOptions: resolveNewDocumentOptions,
      // Removes the "duplicate" action on singletons
      actions: resolveDocumentActions,
    },
  }
}

// The StructureResolver is how we're changing the structureTool structure to
// linking to document (named Singleton) like how "Home" is handled.
export const pageStructure = (
  typeDefArray: DocumentDefinition[],
): StructureResolver => {
  return (S) => {
    // Goes through all of the singletons that were provided and translates them into something the
    // structureTool can understand
    const singletonItems = typeDefArray.map((typeDef) => {
      return S.listItem()
        .title(typeDef.title!)
        .icon(typeDef.icon)
        .child(
          S.editor()
            .id(typeDef.name)
            .schemaType(typeDef.name)
            .documentId(typeDef.name),
        )
    })

    // The default root list items (except custom ones)
    const defaultListItems = S.documentTypeListItems().filter(
      (listItem) =>
        !typeDefArray.find((singleton) => singleton.name === listItem.getId()),
    )

    return S.list()
      .title('Content')
      .items([...singletonItems, S.divider(), ...defaultListItems])
  }
}
