# GoHobby PWA & TWA セットアップ

このドキュメントでは、GoHobbyアプリをPWA（Progressive Web App）として動作させ、さらにAndroidアプリ（TWA）として配布する手順を説明します。

## 📋 目次

1. [PWA対応の完了](#pwa対応の完了)
2. [TWAプロジェクトの作成](#twaプロジェクトの作成)
3. [ビルドとデプロイ](#ビルドとデプロイ)
4. [トラブルシューティング](#トラブルシューティング)

---

## PWA対応の完了

### 1. アイコンの準備

`public/icon.png` をベースに、以下のサイズのアイコンを用意してください：

- `public/icon-192.png` (192x192px)
- `public/icon-512.png` (512x512px)

**リサイズ方法:**

```bash
# ImageMagickを使用する場合
magick convert public/icon.png -resize 192x192 public/icon-192.png
magick convert public/icon.png -resize 512x512 public/icon-512.png
```

または、オンラインツール（https://www.iloveimg.com/resize-image など）を使用してください。

### 2. 動作確認

```bash
# 開発サーバーを起動
npm run dev

# 別のターミナルでビルドとプレビュー
npm run build
npm run preview
```

**確認項目:**
- [ ] Chrome DevTools → Application → Manifest でmanifest.jsonが読み込まれている
- [ ] Application → Service Workers でservice workerが登録されている
- [ ] Chromeのアドレスバーに「インストール」アイコンが表示される

### 3. Lighthouseスコア確認

1. Chrome DevToolsを開く（F12）
2. Lighthouseタブを選択
3. "Progressive Web App" をチェック
4. "Generate report" をクリック

目標: PWAスコア 90以上

---

## TWAプロジェクトの作成

### 前提条件

- Node.js がインストールされていること
- Android Studio がインストールされていること（ビルド用）
- Java Development Kit (JDK) がインストールされていること

### 手順

#### 1. Bubblewrap CLIのインストール

```bash
npm install -g @bubblewrap/cli
```

#### 2. TWAプロジェクトの初期化

```bash
# プロジェクトルートで実行
bubblewrap init --manifest https://gohobby.vercel.app/manifest.json
```

または、ローカルのmanifest.jsonを使用する場合：

```bash
bubblewrap init --manifest ./public/manifest.json
```

**入力項目:**
- Application ID: `com.gohobby.app` (例)
- Application Name: `GoHobby`
- Start URL: `https://gohobby.vercel.app/`
- Display Mode: `standalone`

#### 3. プロジェクトの確認

初期化後、`twa/` ディレクトリが作成されます。

```bash
cd twa
ls -la
```

### ビルド

#### デバッグ用APKの生成

```bash
cd twa
bubblewrap build --mode=debug
```

生成されたAPK: `twa/app-debug.apk`

#### リリース用AABの生成

**1. キーストアの作成（初回のみ）**

```bash
keytool -genkey -v -keystore gohobby-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias gohobby
```

**2. キーストア情報の設定**

`twa/app/build.gradle` を編集：

```gradle
android {
    signingConfigs {
        release {
            storeFile file('../gohobby-release-key.jks')
            storePassword 'YOUR_STORE_PASSWORD'
            keyAlias 'gohobby'
            keyPassword 'YOUR_KEY_PASSWORD'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

**3. AABのビルド**

```bash
bubblewrap build --mode=release
```

生成されたAAB: `twa/app-release.aab`

---

## ビルドとデプロイ

### PWAのデプロイ

```bash
# ビルド
npm run build

# Vercelにデプロイ（既に設定済みの場合）
vercel --prod
```

### Androidアプリの配布

#### Google Play Consoleへのアップロイ

1. https://play.google.com/console にアクセス
2. 新しいアプリを作成
3. アプリの詳細情報を入力
4. `twa/app-release.aab` をアップロード

#### 直接配布（APK）

デバッグ用APKを直接配布する場合：

```bash
# APKを生成
cd twa
bubblewrap build --mode=debug

# APKを配布
# app-debug.apk を共有
```

---

## トラブルシューティング

### Service Workerが登録されない

- HTTPSでアクセスしているか確認（localhostは除く）
- ブラウザの開発者ツールでエラーを確認
- `sw.js` が正しく配信されているか確認

### TWAが起動しない

- Start URLがHTTPSであることを確認
- manifest.jsonの`start_url`と一致しているか確認
- AndroidのバージョンがAPI 21以上であることを確認

### ビルドエラー

- Android Studioでプロジェクトを開き、Gradleの同期を実行
- JDKのバージョンを確認（JDK 11以上推奨）
- `twa/app/build.gradle` の設定を確認

---

## 参考リンク

- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Trusted Web Activity](https://developer.chrome.com/docs/android/trusted-web-activity/)
- [Bubblewrap CLI](https://github.com/GoogleChromeLabs/bubblewrap)
- [Google Play Console](https://play.google.com/console)

---

## 次のステップ

- [ ] Android App Linksの設定（assetlinks.json）
- [ ] オフライン機能の強化
- [ ] プッシュ通知の実装
- [ ] iOS対応（Safari PWA）

