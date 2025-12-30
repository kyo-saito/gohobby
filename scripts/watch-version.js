import { watch } from 'fs'
import fs from 'fs'
import { execSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.join(__dirname, '..')

// 監視対象のファイル/ディレクトリ
const watchTargets = [
  path.join(projectRoot, 'src'),
  path.join(projectRoot, 'vite.config.js'),
  path.join(projectRoot, 'index.html'),
  path.join(projectRoot, 'tailwind.config.js'),
  path.join(projectRoot, 'postcss.config.js'),
]

// バージョン更新のデバウンス（1秒以内の複数変更を1回にまとめる）
let updateTimeout = null
let lastVersion = null
let changedFilesSet = new Set()

function getCurrentVersion() {
  try {
    const packageJson = JSON.parse(
      fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8')
    )
    return packageJson.version
  } catch {
    return null
  }
}

function updateVersion() {
  if (updateTimeout) {
    clearTimeout(updateTimeout)
  }

  updateTimeout = setTimeout(() => {
    const currentVersion = getCurrentVersion()
    
    // バージョンが既に更新されている場合はスキップ
    if (currentVersion === lastVersion) {
      try {
        console.log('📝 ファイル変更を検知しました。バージョンを更新します...')
        execSync('node scripts/bump-version.js', { 
          cwd: projectRoot,
          stdio: 'inherit' 
        })
        lastVersion = getCurrentVersion()
        console.log('✅ バージョンが更新されました。')
        
        // DEMO_DEFINITION.mdを更新
        try {
          // 変更されたファイルのリストを環境変数として渡す
          const changedFiles = Array.from(changedFilesSet).join(',')
          execSync(`node scripts/update-demo-definition.js`, { 
            cwd: projectRoot,
            stdio: 'inherit',
            env: { ...process.env, CHANGED_FILES: changedFiles }
          })
          changedFilesSet.clear() // 処理後はクリア
        } catch (error) {
          console.warn('⚠️ DEMO_DEFINITION.mdの更新に失敗しました:', error.message)
        }
      } catch (error) {
        console.error('❌ バージョン更新に失敗しました:', error.message)
      }
    }
  }, 1000) // 1秒のデバウンス
}

// 初期バージョンを取得
lastVersion = getCurrentVersion()
console.log(`🔍 ファイル変更を監視中... (現在のバージョン: ${lastVersion})`)
console.log('📁 監視対象:', watchTargets.map(t => path.relative(projectRoot, t)).join(', '))

// 各ターゲットを監視
watchTargets.forEach(target => {
  try {
    watch(target, { recursive: true }, (eventType, filename) => {
      if (filename && !filename.includes('node_modules') && !filename.includes('.git')) {
        // ファイルパスを正規化（Windows/Unixのパス区切りを統一）
        let relativePath
        if (path.isAbsolute(target)) {
          const fullPath = path.join(target, filename)
          relativePath = path.relative(projectRoot, fullPath).replace(/\\/g, '/')
        } else {
          relativePath = path.relative(projectRoot, path.join(target, filename)).replace(/\\/g, '/')
        }
        changedFilesSet.add(relativePath)
        updateVersion()
      }
    })
  } catch (error) {
    console.warn(`⚠️  ${target} の監視に失敗しました:`, error.message)
  }
})

// プロセス終了時のクリーンアップ
process.on('SIGINT', () => {
  console.log('\n👋 ファイル監視を終了します。')
  process.exit(0)
})

