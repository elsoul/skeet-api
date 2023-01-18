import { fromGlobalId } from 'graphql-relay'
import { objectType, stringArg, nonNull } from 'nexus'
import { User } from 'nexus-prisma'

export const UserMutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('createUser', {
      type: User.$name,
      args: {
        name: stringArg(),
      },
      async resolve(_, { name }, ctx) {
        try {
          return await ctx.prisma.user.create({
            data: {
              name,
            },
          })
        } catch (error) {
          console.log(error)
          throw new Error(`error: ${error}`)
        }
      },
    })
    t.field('updateUser', {
      type: User.$name,
      args: {
        id: nonNull(stringArg()),
        name: stringArg(),
      },
      async resolve(_, { id, name }, ctx) {
        try {
          return await ctx.prisma.user.update({
            where: {
              id: Number(fromGlobalId(id).id),
            },
            data: {
              name,
            },
          })
        } catch (error) {
          console.log(error)
          throw new Error(`error: ${error}`)
        }
      },
    })
    t.field('deleteUser', {
      type: User.$name,
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_, { id }, ctx) {
        try {
          return await ctx.prisma.user.delete({
            where: {
              id: Number(fromGlobalId(id).id),
            },
          })
        } catch (error) {
          throw new Error(`error: ${error}`)
        }
      },
    })
  },
})
