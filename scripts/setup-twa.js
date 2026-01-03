#!/usr/bin/env node

/**
 * TWAプロジェクトセットアップスクリプト
 * 
 * このスクリプトは、Bubblewrap CLIを使用してTWAプロジェクトを初期化します。
 * 実行前に、Bubblewrap CLIがインストールされていることを確認してください。
 * 
 * インストール方法:
 * npm install -g @bubblewrap/cli
 */

import { execSync } from 'child_process'
import { existsSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')

console.log('🚀 TWAプロジェクトセットアップを開始します...\n')

// Bubblewrap CLIの確認
try {
  execSync('bubblewrap --version', { stdio: 'ignore' })
  console.log('✅ Bubblewrap CLIがインストールされています\n')
} catch (error) {
  console.error('❌ Bubblewrap CLIがインストールされていません')
  console.error('以下のコマンドでインストールしてください:')
  console.error('  npm install -g @bubblewrap/cli\n')
  process.exit(1)
}

// manifest.jsonの確認
const manifestPath = join(projectRoot, 'public', 'manifest.json')
if (!existsSync(manifestPath)) {
  console.error('❌ manifest.jsonが見つかりません')
  console.error(`パス: ${manifestPath}`)
  process.exit(1)
}
console.log('✅ manifest.jsonが見つかりました\n')

// TWAディレクトリの確認
const twaDir = join(projectRoot, 'twa')
if (existsSync(twaDir)) {
  console.log('⚠️  twaディレクトリが既に存在します')
  console.log('既存のプロジェクトを上書きしますか？ (y/n)')
  // 対話的な確認は省略（手動で実行することを推奨）
  console.log('手動で実行することを推奨します:')
  console.log(`  cd ${projectRoot}`)
  console.log('  bubblewrap init --manifest ./public/manifest.json\n')
  process.exit(0)
}

console.log('📝 以下のコマンドを実行してTWAプロジェクトを初期化してください:\n')
console.log(`  cd ${projectRoot}`)
console.log('  bubblewrap init --manifest ./public/manifest.json\n')
console.log('または、本番URLを使用する場合:')
console.log('  bubblewrap init --manifest https://gohobby.vercel.app/manifest.json\n')

console.log('初期化後、以下のコマンドでビルドできます:')
console.log('  cd twa')
console.log('  bubblewrap build\n')

