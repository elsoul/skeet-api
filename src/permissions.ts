import { rule, shield } from 'graphql-shield'
import { GraphQLError } from 'graphql'

const isAuthenticated = rule({ cache: 'contextual' })(
  async (_parent, _args, ctx) => {
    return ctx.user.id !== ''
  }
)

const isAdmin = rule()(async (parent, args, ctx, info) => {
  return ctx.user.role === 'ADMIN'
})

const isGm = rule()(async (parent, args, ctx, info) => {
  return ctx.user.role === 'GM'
})

const isOwner = rule()(async (parent, args, ctx, info) => {
  return ctx.user.userWallets.some((id: number) => id === parent.id)
})

export const permissions = shield(
  {
    Query: {},
    Mutation: {},
  },
  {
    fallbackError: async (thrownThing) => {
      if (thrownThing instanceof GraphQLError) {
        return thrownThing
      } else if (thrownThing instanceof Error) {
        console.error(thrownThing)
        return new GraphQLError('Internal server error')
      } else {
        return new GraphQLError('Not Authorized')
      }
    },
  }
)
