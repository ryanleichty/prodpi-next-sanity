import { NewDocumentOptionsResolver, DocumentActionsResolver } from 'sanity'

export const singletonPlugin = (types: string[]) => {
  const resolveNewDocumentOptions: NewDocumentOptionsResolver = (prev, { creationContext }) => {
    if (creationContext.type === 'global') {
      return prev.filter((templateItem) => !types.includes(templateItem.templateId))
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
