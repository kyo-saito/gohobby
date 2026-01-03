# TWA (Trusted Web Activity) セットアップガイド

## 前提条件

1. **Android Studio** がインストールされていること
2. **Java Development Kit (JDK)** がインストールされていること
3. **Android SDK** がインストールされていること

## 手順

### 1. Bubblewrap CLI のインストール

```bash
npm install -g @bubblewrap/cli
```

### 2. TWAプロジェクトの初期化

```bash
cd C:\Users\kyota\Documents\gohobby
bubblewrap init --manifest https://gohobby.vercel.app/manifest.json
```

または、ローカルのmanifest.jsonを使用する場合：

```bash
bubblewrap init --manifest ./public/manifest.json
```

### 3. 設定の確認

初期化時に以下の情報を入力します：
- **Application ID**: `com.gohobby.app` (例)
- **Application Name**: `GoHobby`
- **Start URL**: `https://gohobby.vercel.app/`
- **Display Mode**: `standalone`

### 4. TWAプロジェクトのビルド

```bash
cd twa
bubblewrap build
```

### 5. APKの生成（デバッグ用）

```bash
bubblewrap build --mode=debug
```

### 6. AABの生成（リリース用）

```bash
bubblewrap build --mode=release
```

## 代替方法：Android Studioで手動作成

Bubblewrapが使えない場合は、Android Studioで手動でTWAプロジェクトを作成できます。

### 手順

1. Android Studioを開く
2. "New Project" → "Empty Activity" を選択
3. プロジェクト名: `GoHobbyTWA`
4. Package name: `com.gohobby.app`
5. Language: Kotlin または Java
6. Minimum SDK: API 21以上

### TWAライブラリの追加

`app/build.gradle` に以下を追加：

```gradle
dependencies {
    implementation 'com.google.androidbrowserhelper:androidbrowserhelper:2.5.0'
}
```

### AndroidManifest.xml の設定

`app/src/main/AndroidManifest.xml` を以下のように設定：

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.gohobby.app">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/Theme.AppCompat.Light.NoActionBar">
        
        <activity
            android:name="com.google.androidbrowserhelper.trusted.LauncherActivity"
            android:label="@string/app_name">
            <meta-data
                android:name="android.support.customtabs.trusted.DEFAULT_URL"
                android:value="https://gohobby.vercel.app/" />
            
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
```

## デジタル署名の設定（リリース用）

リリース用AABを生成するには、キーストアファイルが必要です。

### キーストアの作成

```bash
keytool -genkey -v -keystore gohobby-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias gohobby
```

### 署名設定

`app/build.gradle` に以下を追加：

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

## 注意事項

- TWAはHTTPSのURLが必要です（localhostは開発時のみ可）
- Android App Linksを設定する場合は、`assetlinks.json` をWebサーバーに配置する必要があります
- 初回リリース時は、Google Play Consoleでアプリの詳細情報を入力する必要があります

