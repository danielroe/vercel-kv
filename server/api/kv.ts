import vercelDriver from '../unstorage/vercel-driver'

const storage = useStorage()
const config = useRuntimeConfig()

storage.mount('test', vercelDriver({
  url: config.vercelKv.url,
  token: config.vercelKv.token
}))

export default defineEventHandler(async event => {
  await storage.setItem('test:thing', {
    foo: 'bar'
  })

  const retrievedValue = await storage.getItem('test:thing')
  const keys = await storage.getKeys('test')

  return {
    value: retrievedValue,
    keys
  }
})
