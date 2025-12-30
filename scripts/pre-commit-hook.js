import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ステージングされているファイルを取得
let stagedFiles = []
try {
  const output = execSync('git diff --cached --name-only', { encoding: 'utf8' })
  stagedFiles = output.trim().split('\n').filter(Boolean)
} catch (error) {
  // Gitコマンドが失敗した場合は終了
  process.exit(0)
}

// package.jsonが既にステージングされている場合はスキップ
if (stagedFiles.includes('package.json')) {
  process.exit(0)
}

// ソースファイルや設定ファイルが変更されているか確認
const relevantFiles = stagedFiles.filter(file => 
  file.startsWith('src/') ||
  file === 'vite.config.js' ||
  file === 'index.html' ||
  file === 'tailwind.config.js' ||
  file === 'postcss.config.js'
)

if (relevantFiles.length > 0) {
  console.log('変更を検知しました。バージョンを自動更新します...')
  
  // バージョンを更新
  const bumpScript = path.join(__dirname, 'bump-version.js')
  try {
    execSync(`node "${bumpScript}"`, { stdio: 'inherit' })
    
    // package.jsonをステージングに追加
    execSync('git add package.json', { stdio: 'inherit' })
    
    // DEMO_DEFINITION.mdを更新
    try {
      execSync('node scripts/update-demo-definition.js', { 
        cwd: projectRoot,
        stdio: 'inherit' 
      })
      // DEMO_DEFINITION.mdもステージングに追加
      execSync('git add DEMO_DEFINITION.md', { stdio: 'inherit' })
    } catch (error) {
      console.warn('⚠️ DEMO_DEFINITION.mdの更新に失敗しました:', error.message)
    }
    
    console.log('バージョンが自動更新されました。')
  } catch (error) {
    console.error('バージョン更新に失敗しました:', error)
    process.exit(1)
  }
}

process.exit(0)

