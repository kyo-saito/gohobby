# PWA動作確認チェックリスト

## 1. アイコンの準備

- [ ] `public/icon-192.png` を192x192pxにリサイズ
- [ ] `public/icon-512.png` を512x512pxにリサイズ

### リサイズ方法

**Windows (PowerShell):**
```powershell
# ImageMagickがインストールされている場合
magick convert icon.png -resize 192x192 icon-192.png
magick convert icon.png -resize 512x512 icon-512.png
```

**オンラインツール:**
- https://www.iloveimg.com/resize-image
- https://imageresizer.com/

## 2. 開発サーバーでの確認

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開き、以下を確認：

- [ ] 開発者ツール（F12）→ Application → Manifest でmanifest.jsonが読み込まれている
- [ ] Application → Service Workers でservice workerが登録されている
- [ ] Application → Storage → Cache Storage でキャッシュが作成されている

## 3. 本番ビルドでの確認

```bash
npm run build
npm run preview
```

- [ ] `https://localhost:4173` でPWAが動作することを確認
- [ ] Chromeの「インストール」ボタンが表示されることを確認

## 4. LighthouseでのPWAスコア確認

1. Chrome DevToolsを開く（F12）
2. Lighthouseタブを開く
3. "Progressive Web App" を選択
4. "Generate report" をクリック

**目標スコア:**
- [ ] PWAスコア: 90以上
- [ ] Installable: ✅
- [ ] Service Worker: ✅
- [ ] Offline: ✅ (最低限)

## 5. 実機での確認（Android）

1. 同じWi-Fiネットワークに接続
2. 開発サーバーのIPアドレスでアクセス（例: `http://192.168.1.100:5173`）
3. Chromeで「ホーム画面に追加」を実行
4. アプリとして起動できることを確認

## 6. Vercelデプロイ後の確認

- [ ] `https://gohobby.vercel.app` でmanifest.jsonが読み込まれる
- [ ] Service Workerが登録される
- [ ] Chromeで「インストール可能」と表示される
- [ ] インストール後、スタンドアロンモードで起動する

