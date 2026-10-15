import { spawn, execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { resolve } from 'node:path'
import { setTimeout } from 'node:timers/promises'

const server = spawn(process.execPath, [resolve('node_modules/wrangler/bin/wrangler.js'), 'pages', 'dev', '.output/public', '--ip', '127.0.0.1', '--port', '4173'], { stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true, env: { ...process.env, WRANGLER_SEND_METRICS: 'false' } })
let logs = ''
let exited = false
server.on('exit', () => { exited = true })
server.stdout.on('data', chunk => { logs = (logs + String(chunk)).slice(-12_000) })
server.stderr.on('data', chunk => { logs = (logs + String(chunk)).slice(-12_000) })
try {
  let ready = false
  for (let attempt = 0; attempt < 120 && !exited; attempt++) {
    try { ready = (await fetch('http://127.0.0.1:4173/')).ok } catch { /* Wait for local workerd. */ }
    if (ready) break
    await setTimeout(250)
  }
  if (!ready) throw new Error('Local Pages server did not become ready.\n' + logs)
  await import('./verify-http.ts')
} catch (error) {
  console.error(logs)
  throw error
} finally {
  if (!exited && server.pid) {
    if (process.platform === 'win32') await promisify(execFile)('taskkill', ['/pid', String(server.pid), '/t', '/f'], { windowsHide: true }).catch(() => {})
    else server.kill('SIGTERM')
  }
}
