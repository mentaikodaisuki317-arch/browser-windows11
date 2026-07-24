// ウィンドウ管理
class WindowManager {
    constructor() {
        this.windows = new Map();
        this.windowCount = {};
    }

    openWindow(appType) {
        // アプリの設定
        const appConfigs = {
            calculator: {
                title: '電卓',
                icon: '🔢',
                width: 320,
                height: 400,
                html: this.createCalculatorApp()
            },
            notepad: {
                title: 'メモ帳',
                icon: '📝',
                width: 600,
                height: 500,
                html: this.createNotepadApp()
            },
            browser: {
                title: 'ブラウザ',
                icon: '🌐',
                width: 800,
                height: 600,
                html: this.createBrowserApp()
            },
            settings: {
                title: '設定',
                icon: '⚙️',
                width: 700,
                height: 600,
                html: this.createSettingsApp()
            },
            about: {
                title: 'このPCについて',
                icon: 'ℹ️',
                width: 500,
                height: 400,
                html: this.createAboutApp()
            }
        };

        const config = appConfigs[appType];
        if (!config) return;

        // ウィンドウカウント
        if (!this.windowCount[appType]) this.windowCount[appType] = 0;
        this.windowCount[appType]++;

        // ウィンドウID生成
        const windowId = `${appType}-${this.windowCount[appType]}`;

        // ウィンドウ要素作成
        const windowEl = document.createElement('div');
        windowEl.className = 'window active';
        windowEl.id = windowId;
        windowEl.style.left = (50 + Math.random() * 100) + 'px';
        windowEl.style.top = (50 + Math.random() * 100) + 'px';
        windowEl.style.zIndex = window.simulator.nextZIndex++;

        windowEl.innerHTML = `
            <div class="window-header">
                <span style="font-size: 18px;">${config.icon}</span>
                <span class="window-title">${config.title}</span>
                <div class="window-controls">
                    <button class="window-btn minimize" title="最小化">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <rect y="7" width="16" height="2"/>
                        </svg>
                    </button>
                    <button class="window-btn maximize" title="最大化">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <rect x="2" y="2" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1"/>
                        </svg>
                    </button>
                    <button class="window-btn close" title="閉じる">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="window-content app-${appType}">
                ${config.html}
            </div>
        `;

        // コンテナに追加
        document.getElementById('windows-container').appendChild(windowEl);

        // イベントリスナー
        windowEl.querySelector('.close').addEventListener('click', () => {
            this.closeWindow(windowId);
        });

        windowEl.querySelector('.minimize').addEventListener('click', () => {
            this.minimizeWindow(windowId);
        });

        windowEl.querySelector('.maximize').addEventListener('click', () => {
            this.maximizeWindow(windowId);
        });

        // タスクバーに追加
        window.taskbar.addWindowToTaskbar(windowId, config.title, config.icon, windowEl);

        // ウィンドウ情報を保存
        this.windows.set(windowId, {
            element: windowEl,
            appType: appType,
            title: config.title,
            icon: config.icon,
            isMinimized: false,
            isMaximized: false
        });
    }

    closeWindow(windowId) {
        const windowEl = document.getElementById(windowId);
        if (windowEl) {
            windowEl.remove();
            this.windows.delete(windowId);
            window.taskbar.removeWindowFromTaskbar(windowId);
        }
    }

    minimizeWindow(windowId) {
        const windowData = this.windows.get(windowId);
        if (windowData) {
            const windowEl = windowData.element;
            windowEl.style.display = 'none';
            windowData.isMinimized = true;
            window.taskbar.updateWindowState(windowId);
        }
    }

    restoreWindow(windowId) {
        const windowData = this.windows.get(windowId);
        if (windowData) {
            const windowEl = windowData.element;
            windowEl.style.display = 'flex';
            windowEl.style.zIndex = window.simulator.nextZIndex++;
            windowData.isMinimized = false;
            window.taskbar.updateWindowState(windowId);
            window.simulator.setActiveWindow(windowEl);
        }
    }

    maximizeWindow(windowId) {
        const windowData = this.windows.get(windowId);
        if (windowData) {
            const windowEl = windowData.element;
            if (windowData.isMaximized) {
                // 元のサイズに戻す
                windowEl.style.left = '50px';
                windowEl.style.top = '50px';
                windowEl.style.width = 'auto';
                windowEl.style.height = 'auto';
                windowData.isMaximized = false;
            } else {
                // 最大化
                windowEl.style.left = '0';
                windowEl.style.top = '0';
                windowEl.style.width = '100%';
                windowEl.style.height = 'calc(100% - 48px)';
                windowData.isMaximized = true;
            }
        }
    }

    createCalculatorApp() {
        return `
            <div style="display: flex; flex-direction: column; height: 100%;">
                <div class="calc-display" id="calc-display">0</div>
                <div class="calc-buttons">
                    <button class="calc-btn" data-action="clear">C</button>
                    <button class="calc-btn" data-action="delete">DEL</button>
                    <button class="calc-btn operator" data-op="/">÷</button>
                    <button class="calc-btn operator" data-op="*">×</button>
                    <button class="calc-btn" data-num="7">7</button>
                    <button class="calc-btn" data-num="8">8</button>
                    <button class="calc-btn" data-num="9">9</button>
                    <button class="calc-btn operator" data-op="-">−</button>
                    <button class="calc-btn" data-num="4">4</button>
                    <button class="calc-btn" data-num="5">5</button>
                    <button class="calc-btn" data-num="6">6</button>
                    <button class="calc-btn operator" data-op="+">+</button>
                    <button class="calc-btn" data-num="1">1</button>
                    <button class="calc-btn" data-num="2">2</button>
                    <button class="calc-btn" data-num="3">3</button>
                    <button class="calc-btn operator" data-op=".">.</button>
                    <button class="calc-btn" data-num="0" style="grid-column: span 2;">0</button>
                    <button class="calc-btn equals" data-action="equals">=</button>
                </div>
            </div>
        `;
    }

    createNotepadApp() {
        return `<textarea class="notepad-textarea" placeholder="メモを入力してください..."></textarea>`;
    }

    createBrowserApp() {
        return `
            <div style="display: flex; flex-direction: column; height: 100%;">
                <div class="browser-navbar">
                    <button style="background: #e0e0e0; border: 1px solid #999; padding: 4px 8px; border-radius: 3px; cursor: pointer;">← 戻る</button>
                    <button style="background: #e0e0e0; border: 1px solid #999; padding: 4px 8px; border-radius: 3px; cursor: pointer;">進む →</button>
                    <input type="text" class="browser-url" value="https://example.com" placeholder="URLを入力">
                </div>
                <div class="browser-content">
                    <div style="padding: 20px; font-family: Arial, sans-serif;">
                        <h1>🌐 Windows 11 Web Browser</h1>
                        <p>このブラウザはシミュレーションです。実際のウェブサイトは表示されません。</p>
                        <h2>ようこそ</h2>
                        <p>Windows 11 の Web シミュレーターへようこそ！</p>
                    </div>
                </div>
            </div>
        `;
    }

    createSettingsApp() {
        return `
            <div style="padding: 20px;">
                <h2>⚙️ 設定</h2>
                <div style="margin-top: 20px;">
                    <h3>システム</h3>
                    <p>このシミュレーターの設定オプション</p>
                </div>
                <div style="margin-top: 20px;">
                    <h3>テーマ</h3>
                    <label>
                        <input type="checkbox" checked> ダークモード
                    </label>
                </div>
            </div>
        `;
    }

    createAboutApp() {
        return `
            <div style="padding: 20px; text-align: center;">
                <h1>🖥️ このPCについて</h1>
                <div style="margin-top: 30px; text-align: left;">
                    <p><strong>オペレーティング システム:</strong> Windows 11 Web Simulator</p>
                    <p><strong>バージョン:</strong> 1.0.0</p>
                    <p><strong>ビルド:</strong> Web Edition</p>
                    <p style="margin-top: 30px; color: #666; font-size: 12px;">
                        このはシミュレーションです。ブラウザで動作しています。
                    </p>
                </div>
            </div>
        `;
    }
}

// グローバルインスタンス
window.windowManager = new WindowManager();
