import createCloudTask from '@/lib/createCloudTask'
import { extendType, nonNull, stringArg } from 'nexus'
import encodeBase64 from '@/utils/base64'

export const dailyTask = extendType({
  type: 'Query',
  definition(t) {
    t.field('dailyTask', {
      type: 'Boolean',
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_, { id }, ctx) {
        // This is sample to create cloud task queue
        //
        // const path = '/endpoint'
        // const queue = 'your-cloud-task-queue'
        // const body = { id }
        // const payload = await encodeBase64(JSON.stringify(body))
        // await createCloudTask(path, queue, payload)
        return true
      },
    })
  },
})