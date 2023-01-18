import { objectType } from 'nexus'
import { User } from 'nexus-prisma'

export const UserObject = objectType({
  name: User.$name,
  description: User.$description,
  definition(t) {
    t.relayGlobalId('id', {})
    t.field(User.name)
  },
})
