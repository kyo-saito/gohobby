import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const hooksDir = path.join(__dirname, '..', '.git', 'hooks')
const preCommitHook = path.join(hooksDir, 'pre-commit')

// .git/hooksディレクトリが存在するか確認
if (!fs.existsSync(hooksDir)) {
  console.log('.git/hooksディレクトリが見つかりません。Gitリポジトリが初期化されていない可能性があります。')
  process.exit(0)
}

// pre-commitフックの内容
const hookContent = `#!/bin/sh
# コミット前に自動的にバージョンを更新するフック（Node.jsスクリプトを呼び出し）

node scripts/pre-commit-hook.js
exit $?
`

try {
  fs.writeFileSync(preCommitHook, hookContent, 'utf8')
  
  // Windowsでも実行可能にする（Git Bash用）
  if (process.platform !== 'win32') {
    fs.chmodSync(preCommitHook, '755')
  }
  
  console.log('Git pre-commitフックを設定しました。')
  console.log('これにより、コミット時に自動的にバージョンが更新されます。')
} catch (error) {
  console.error('Gitフックの設定に失敗しました:', error)
  process.exit(1)
}

