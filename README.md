# browser-windows11

ブラウザで動作する Windows 11 シミュレーター

## 概要

このプロジェクトは、Web ブラウザ上で Windows 11 の仮想環境をシミュレートするアプリケーションです。

## 機能

- 🪟 Windows 11 風のデスクトップ UI
- 🖱️ ドラッグ可能なウィンドウ
- 📋 スタートメニュー
- 📊 タスクバー
- 🎨 複数のアプリケーション（電卓、テキストエディタなど）
- 🖼️ カスタマイズ可能な背景

## インストール

```bash
git clone https://github.com/mentaikodaisuki317-arch/browser-windows11.git
cd browser-windows11
```

## 使い方

`index.html` をブラウザで開いてください。

```bash
# ローカルサーバーで起動（推奨）
python -m http.server 8000
# またはNode.jsの場合
npx http-server
```

その後、`http://localhost:8000` にアクセスしてください。

## ファイル構成

```
browser-windows11/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── windows.js
│   ├── taskbar.js
│   └── apps.js
└── README.md
```

## 機能詳細

### アプリケーション

- **電卓** - 基本的な計算機能
- **メモ帳** - テキスト編集機能
- **ブラウザ** - シミュレーションブラウザ
- **設定** - システム設定
- **このPCについて** - システム情報

### ウィンドウ機能

- ウィンドウのドラッグ移動
- 最小化・最大化・閉じるボタン
- ウィンドウのZ-indexの自動管理
- タスクバーでの表示・非表示管理

## ライセンス

MIT License
