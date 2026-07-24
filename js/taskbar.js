// タスクバー管理
class TaskbarManager {
    constructor() {
        this.windows = new Map();
        this.setupStartMenu();
        this.setupStartMenuApps();
    }

    setupStartMenu() {
        const startBtn = document.getElementById('start-btn');
        const startMenu = document.getElementById('start-menu');

        startBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            startMenu.classList.toggle('hidden');
        });

        // 他の場所をクリックしてもメニューが閉じる
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#start-btn') && !e.target.closest('#start-menu')) {
                startMenu.classList.add('hidden');
            }
        });
    }

    setupStartMenuApps() {
        const apps = [
            { id: 'calculator', name: '電卓', icon: '🔢' },
            { id: 'notepad', name: 'メモ帳', icon: '📝' },
            { id: 'browser', name: 'ブラウザ', icon: '🌐' },
            { id: 'settings', name: '設定', icon: '⚙️' },
            { id: 'about', name: 'このPCについて', icon: 'ℹ️' }
        ];

        const startMenuApps = document.getElementById('start-menu-apps');

        apps.forEach(app => {
            const appEl = document.createElement('div');
            appEl.className = 'start-menu-app';
            appEl.innerHTML = `
                <div class="start-menu-app-icon">${app.icon}</div>
                <div class="start-menu-app-name">${app.name}</div>
            `;

            appEl.addEventListener('click', () => {
                window.windowManager.openWindow(app.id);
                document.getElementById('start-menu').classList.add('hidden');
            });

            startMenuApps.appendChild(appEl);
        });
    }

    addWindowToTaskbar(windowId, title, icon, windowEl) {
        const taskbarApps = document.getElementById('taskbar-apps');

        const btn = document.createElement('button');
        btn.className = 'taskbar-app-btn active';
        btn.id = `taskbar-${windowId}`;
        btn.innerHTML = `<span>${icon}</span><span>${title}</span>`;

        btn.addEventListener('click', () => {
            if (windowEl.style.display === 'none') {
                window.windowManager.restoreWindow(windowId);
            } else {
                windowEl.style.display = 'none';
                window.windowManager.windows.get(windowId).isMinimized = true;
            }
        });

        taskbarApps.appendChild(btn);
        this.windows.set(windowId, btn);
    }

    removeWindowFromTaskbar(windowId) {
        const btn = document.getElementById(`taskbar-${windowId}`);
        if (btn) {
            btn.remove();
        }
        this.windows.delete(windowId);
    }

    updateWindowState(windowId) {
        const btn = document.getElementById(`taskbar-${windowId}`);
        const windowData = window.windowManager.windows.get(windowId);

        if (btn && windowData) {
            if (windowData.isMinimized) {
                btn.classList.remove('active');
            } else {
                btn.classList.add('active');
            }
        }
    }
}

// グローバルインスタンス
window.taskbar = new TaskbarManager();
