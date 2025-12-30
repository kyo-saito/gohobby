# GitHubへのアップロード手順

## 問題の原因
PowerShellの日本語文字を含むパスでGitが正しく動作していません。
以下の手順を**手動で実行**してください。

## 手順

### 1. GitHubでリポジトリを作成
1. https://github.com/new にアクセス
2. Repository name: `gohobby`
3. Description: `目標達成とリワードシステムでストレス軽減を実現するアプリ`
4. Public または Private を選択
5. **「Add a README file」はチェックしない**
6. 「Create repository」をクリック

### 2. プロジェクトディレクトリでGitを初期化（手動実行）

**PowerShellまたはコマンドプロンプトで以下を実行：**

```powershell
# プロジェクトディレクトリに移動
cd "c:\Users\kyota\OneDrive - 横浜国立大学\デスクトップ\gohobby"

# ホームディレクトリの.gitを削除（もし存在する場合）
Remove-Item -Recurse -Force C:\Users\kyota\.git -ErrorAction SilentlyContinue

# Gitリポジトリを初期化
git init

# すべてのファイルを追加
git add .

# コミット
git commit -m "Initial commit: GoHobby - 目標達成とリワードシステム"

# ブランチ名をmainに変更
git branch -M main

# リモートリポジトリを追加
git remote add origin https://github.com/kyo-saito/gohobby.git

# プッシュ
git push -u origin main
```

### 3. 認証
初回プッシュ時にGitHubの認証が求められます：
- Personal Access Token (PAT) を使用するか
- GitHub CLI (`gh auth login`) を使用してください

## Vercelでのデプロイ手順

### 1. Vercelにサインアップ/ログイン
1. https://vercel.com にアクセス
2. GitHubアカウントでサインイン

### 2. プロジェクトをインポート
1. 「Add New...」→「Project」をクリック
2. GitHubリポジトリ `kyo-saito/gohobby` を選択
3. Framework Preset: **Vite** を選択
4. Root Directory: `./` (デフォルト)
5. Build Command: `npm run build` (自動検出されるはず)
6. Output Directory: `dist` (自動検出されるはず)
7. 「Deploy」をクリック

### 3. デプロイ完了後
デプロイが完了すると、以下のようなURLが表示されます：
```
https://gohobby-xxxxx.vercel.app
```

このURLがアプリケーションへのアクセスリンクです。

## トラブルシューティング

### Gitがホームディレクトリに初期化される場合
```powershell
# 現在のディレクトリを確認
pwd

# プロジェクトディレクトリに確実に移動
cd "c:\Users\kyota\OneDrive - 横浜国立大学\デスクトップ\gohobby"

# 再度確認
pwd
ls package.json
```

### 認証エラーの場合
GitHub CLIを使用：
```powershell
gh auth login
```

または、Personal Access Tokenを作成：
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. 「Generate new token」をクリック
3. `repo` スコープを選択
4. トークンをコピーして、パスワードの代わりに入力
