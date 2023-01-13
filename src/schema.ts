import { connectionPlugin, makeSchema } from 'nexus'
import { join } from 'path'
import * as types from './graphql'
import { relayNodeInterfacePlugin } from '@jcm/nexus-plugin-relay-node-interface'
import { relayGlobalIdPlugin } from '@jcm/nexus-plugin-relay-global-id'
import { relayNodeInterfacePluginConfig } from './Node'

export const schema = makeSchema({
  types,
  outputs: {
    typegen: join(__dirname, './nexus-typegen.ts'),
    schema: join(__dirname, './schema.graphql'),
  },
  plugins: [
    connectionPlugin({
      extendConnection: {
        totalCount: { type: 'Int' },
      },
      includeNodesField: true,
    }),
    relayNodeInterfacePlugin(relayNodeInterfacePluginConfig),
    relayGlobalIdPlugin(),
  ],
})
