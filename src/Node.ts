/* eslint-disable @typescript-eslint/no-unused-vars */
import { RelayNodeInterfacePluginConfig } from '@jcm/nexus-plugin-relay-node-interface'
import { RelayGlobalIdPluginConfig } from '@jcm/nexus-plugin-relay-global-id'
import { UsersQuery } from './graphql'
const idFetcher: RelayNodeInterfacePluginConfig['idFetcher'] = (
  { id, type },
  ctx,
  _info
) => {
  if (type === 'User') return []
  return null
}

const resolveType: RelayNodeInterfacePluginConfig['resolveType'] = (o) => {
  if ('isAdmin' in o) return 'User'
  return 'Boolean'
}

export const relayNodeInterfacePluginConfig = {
  idFetcher,
  resolveType,
}
