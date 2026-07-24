// メイン初期化
class Windows11Simulator {
    constructor() {
        this.windows = [];
        this.activeWindow = null;
        this.nextZIndex = 1001;
        this.draggedWindow = null;
        this.dragOffset = { x: 0, y: 0 };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);

        // 初期ウィンドウを開く
        setTimeout(() => {
            window.windowManager.openWindow('calculator');
        }, 500);
    }

    setupEventListeners() {
        document.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        document.addEventListener('mouseup', (e) => this.handleMouseUp(e));
    }

    handleMouseDown(e) {
        const header = e.target.closest('.window-header');
        if (header) {
            const windowEl = header.closest('.window');
            this.draggedWindow = windowEl;
            const rect = windowEl.getBoundingClientRect();
            this.dragOffset = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
            this.setActiveWindow(windowEl);
        }
    }

    handleMouseMove(e) {
        if (this.draggedWindow) {
            const x = e.clientX - this.dragOffset.x;
            const y = e.clientY - this.dragOffset.y;
            this.draggedWindow.style.left = x + 'px';
            this.draggedWindow.style.top = y + 'px';
        }
    }

    handleMouseUp() {
        this.draggedWindow = null;
    }

    setActiveWindow(windowEl) {
        // 前のアクテ���ブウィンドウのハイライトを外す
        document.querySelectorAll('.window.active').forEach(w => {
            w.classList.remove('active');
        });

        // 新しいウィンドウをアクティブに
        windowEl.classList.add('active');
        windowEl.style.zIndex = this.nextZIndex++;
        this.activeWindow = windowEl;
    }

    updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        document.getElementById('clock').textContent = `${hours}:${minutes}`;
    }
}

// グローバルインスタンス
window.simulator = new Windows11Simulator();
