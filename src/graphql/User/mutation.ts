import { fromGlobalId } from 'graphql-relay'
import { objectType, stringArg, nonNull, intArg } from 'nexus'
import { User } from 'nexus-prisma'

export const UserMutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('createUser', {
      type: User.$name,
      args: {
        name: stringArg(),
        uid: stringArg(),
        email: stringArg(),
        pubkey: stringArg(),
        role: intArg(),
      },
      async resolve(_, { name, uid, email, pubkey, role }, ctx) {
        try {
          return await ctx.prisma.user.create({
            data: {
              name,
              uid,
              email,
              pubkey,
              role,
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
        uid: stringArg(),
        email: stringArg(),
        pubkey: stringArg(),
        role: intArg(),
      },
      async resolve(_, { id, name, uid, email, pubkey, role }, ctx) {
        try {
          return await ctx.prisma.user.update({
            where: {
              id: Number(fromGlobalId(id).id),
            },
            data: {
              name,
              uid,
              email,
              pubkey,
              role,
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
