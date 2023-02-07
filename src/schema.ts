import { connectionPlugin, makeSchema, asNexusMethod } from 'nexus'
import { join } from 'path'
import * as allTypes from './graphql'
import { relayNodeInterfacePlugin } from '@jcm/nexus-plugin-relay-node-interface'
import { relayGlobalIdPlugin } from '@jcm/nexus-plugin-relay-global-id'
import { relayNodeInterfacePluginConfig } from './Node'
import {
  GraphQLBigInt,
  GraphQLDateTime,
  GraphQLEmailAddress,
} from 'graphql-scalars'

export const schema = makeSchema({
  types: [
    allTypes,
    asNexusMethod(GraphQLBigInt, 'bigint', 'bigint'),
    asNexusMethod(GraphQLDateTime, 'datetime', 'datetime'),
    asNexusMethod(GraphQLEmailAddress, 'email', 'email'),
  ],
  outputs: {
    typegen: join(__dirname, './nexus-typegen.ts'),
    schema: join(__dirname, './schema.graphql'),
  },
  plugins: [
    connectionPlugin({
      extendConnection: {
        totalCount: { type: 'Int', requireResolver: false },
      },
      includeNodesField: true,
    }),
    relayNodeInterfacePlugin(relayNodeInterfacePluginConfig),
    relayGlobalIdPlugin(),
  ],
})
