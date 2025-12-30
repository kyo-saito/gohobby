import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.join(__dirname, '..')
const demoDefPath = path.join(projectRoot, 'DEMO_DEFINITION.md')

// 変更されたファイルを取得（Gitのステージング済みファイル、または環境変数から）
function getChangedFiles() {
  // 環境変数から変更ファイルリストを取得（watch-version.jsから呼ばれた場合）
  if (process.env.CHANGED_FILES) {
    return process.env.CHANGED_FILES.split(',').filter(Boolean)
  }
  
  try {
    const output = execSync('git diff --cached --name-only', { 
      encoding: 'utf8',
      cwd: projectRoot 
    })
    return output.trim().split('\n').filter(Boolean)
  } catch {
    // Gitコマンドが失敗した場合は、最新のコミットと比較
    try {
      const output = execSync('git diff HEAD --name-only', { 
        encoding: 'utf8',
        cwd: projectRoot 
      })
      return output.trim().split('\n').filter(Boolean)
    } catch {
      return []
    }
  }
}

// ファイルパスから変更内容の説明を生成
function getChangeDescription(filePath) {
  const relativePath = path.relative(projectRoot, filePath)
  
  // ファイルタイプに応じた説明を生成
  if (relativePath.startsWith('src/components/')) {
    const componentName = path.basename(relativePath, path.extname(relativePath))
    return `コンポーネント「${componentName}」を更新`
  } else if (relativePath.startsWith('src/pages/')) {
    const pageName = path.basename(relativePath, path.extname(relativePath))
    return `ページ「${pageName}」を更新`
  } else if (relativePath.startsWith('src/')) {
    return `ソースファイル「${relativePath}」を更新`
  } else if (relativePath === 'vite.config.js') {
    return 'Vite設定を更新'
  } else if (relativePath === 'index.html') {
    return 'HTMLエントリーポイントを更新'
  } else if (relativePath.includes('config')) {
    return '設定ファイルを更新'
  } else {
    return `ファイル「${relativePath}」を更新`
  }
}

// 現在のバージョンを取得
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

// DEMO_DEFINITION.mdに変更履歴を追加
function updateDemoDefinition() {
  const changedFiles = getChangedFiles()
  
  // DEMO_DEFINITION.md自体の変更は除外
  const relevantFiles = changedFiles.filter(file => 
    file !== 'DEMO_DEFINITION.md' &&
    (file.startsWith('src/') ||
     file === 'vite.config.js' ||
     file === 'index.html' ||
     file === 'tailwind.config.js' ||
     file === 'postcss.config.js' ||
     file === 'package.json')
  )

  if (relevantFiles.length === 0) {
    return // 関連ファイルの変更がない場合はスキップ
  }

  const version = getCurrentVersion()
  if (!version) {
    console.warn('バージョンを取得できませんでした。')
    return
  }

  try {
    let content = fs.readFileSync(demoDefPath, 'utf8')
    
    // 変更履歴セクションを探す
    const changeLogSection = '### 12.3 改善履歴'
    const changeLogIndex = content.indexOf(changeLogSection)
    
    if (changeLogIndex === -1) {
      console.warn('改善履歴セクションが見つかりませんでした。')
      return
    }

    // 次のセクション（---）までの位置を探す
    const nextSectionIndex = content.indexOf('\n---\n', changeLogIndex)
    const insertIndex = nextSectionIndex !== -1 ? nextSectionIndex : content.length

    // 変更内容をまとめる
    const changeDescriptions = relevantFiles.map(getChangeDescription)
    const changeSummary = changeDescriptions.length > 3
      ? `${changeDescriptions.slice(0, 3).join('、')} など${changeDescriptions.length}ファイル`
      : changeDescriptions.join('、')

    const date = new Date().toLocaleDateString('ja-JP')
    const newEntry = `- **v${version}**: ${changeSummary} (${date})`

    // 既に同じバージョンのエントリがあるか確認
    const versionPattern = new RegExp(`- \\*\\*v${version.replace(/\./g, '\\.')}\\*\\*:.*`, 'g')
    if (versionPattern.test(content)) {
      // 既存のエントリを更新
      content = content.replace(
        versionPattern,
        newEntry
      )
    } else {
      // 新しいエントリを追加（改善履歴セクションの直後）
      const sectionEndIndex = content.indexOf('\n', changeLogIndex + changeLogSection.length)
      const insertPosition = sectionEndIndex !== -1 ? sectionEndIndex + 1 : changeLogIndex + changeLogSection.length
      
      content = content.slice(0, insertPosition) + 
                '\n' + newEntry + 
                content.slice(insertPosition)
    }

    fs.writeFileSync(demoDefPath, content, 'utf8')
    console.log(`✅ DEMO_DEFINITION.mdに変更履歴を記録しました: v${version}`)
  } catch (error) {
    console.error('❌ DEMO_DEFINITION.mdの更新に失敗しました:', error.message)
  }
}

// 実行
updateDemoDefinition()

