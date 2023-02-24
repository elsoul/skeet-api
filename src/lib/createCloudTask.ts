import { v2 } from '@google-cloud/tasks'

const { CloudTasksClient } = v2
const project = process.env.SKEET_GCP_PROJECT_ID || 'skeet-framework'
const location = process.env.SKEET_GCP_TASK_REGION || 'europe-west1'
const workerUrl = process.env.SKEET_GCP_WORKER_URL || 'https://worker.com'

const createCloudTask = async (path: string, queue: string, body: string) => {
  const client = new CloudTasksClient()
  async function createTask() {
    const url = workerUrl + '/' + path
    const parent = client.queuePath(project, location, queue)
    const task = {
      httpRequest: {
        headers: {
          'Content-Type': 'application/json',
        },
        httpMethod: 'POST',
        url,
        body,
      },
    }

    console.log('Sending task:')

    // Send create task request.
    const request = { parent: parent, task: task }
    //@ts-ignore
    const [response] = await client.createTask(request)
    const name = response.name
    console.log(`Created task ${name}`)
  }

  createTask()
}

export default createCloudTask
