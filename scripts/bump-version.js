import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const packageJsonPath = path.join(__dirname, '..', 'package.json')

// package.jsonを読み込む
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

// バージョンを取得
const currentVersion = packageJson.version
const [major, minor, patch] = currentVersion.split('.').map(Number)

// パッチバージョンをインクリメント
const newVersion = `${major}.${minor}.${patch + 1}`

// package.jsonを更新
packageJson.version = newVersion
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n')

console.log(`バージョンを更新しました: ${currentVersion} → ${newVersion}`)

