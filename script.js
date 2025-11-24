// ============================================
// 設定（ここで自由に変更可能）
// ============================================
const CONFIG = {
    totalFreeImages: 1,  // imagesフォルダ内の画像総数         // 無料画像の総数
    dailyDownloadLimit: 1,         // 1日のダウンロード制限枚数
    resetIntervalDays: 7,          // リセット間隔（日数） ※1=毎日、7=週1回
    heroSliderInterval: 5000,      // ヒーロースライダー切り替え時間（ミリ秒）
};

// ナビゲーション
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 100);
});

// ヒーロースライダー
let currentHeroSlide = 0;
const heroSlides = document.querySelectorAll('.hero-slide');

function nextHeroSlide() {
    heroSlides[currentHeroSlide].classList.remove('active');
    currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
    heroSlides[currentHeroSlide].classList.add('active');
}

setInterval(nextHeroSlide, CONFIG.heroSliderInterval);

// ダウンロード制限管理
function getDownloadData() {
    const data = localStorage.getItem('capilusDownloads');
    if (!data) return { date: new Date().toDateString(), count: 0, resetDate: null };
    
    const parsed = JSON.parse(data);
    const today = new Date();
    const lastDate = new Date(parsed.date);
    
    // リセット日を計算
    const daysDiff = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
    
    // 指定された日数が経過していたらリセット
    if (daysDiff >= CONFIG.resetIntervalDays) {
        const nextResetDate = new Date(today);
        nextResetDate.setDate(nextResetDate.getDate() + CONFIG.resetIntervalDays);
        
        return { 
            date: today.toDateString(), 
            count: 0,
            resetDate: nextResetDate.toDateString()
        };
    }
    
    return parsed;
}

function saveDownloadData(data) {
    localStorage.setItem('capilusDownloads', JSON.stringify(data));
}

function getRemainingDownloads() {
    const data = getDownloadData();
    return CONFIG.dailyDownloadLimit - data.count;
}

function updateDownloadLimit() {
    const remaining = getRemainingDownloads();
    const data = getDownloadData();
    
    document.getElementById('remaining-downloads').textContent = remaining;
document.getElementById('total-limit').textContent = CONFIG.dailyDownloadLimit;
    // リセット日を表示
    if (data.resetDate) {
        const resetInfo = document.createElement('p');
        resetInfo.style.fontSize = '0.9rem';
        resetInfo.style.marginTop = '10px';
        resetInfo.style.color = '#666';
        resetInfo.textContent = `次回リセット: ${data.resetDate}`;
        
        const limitDiv = document.getElementById('download-limit');
        const existingInfo = limitDiv.querySelector('p:nth-child(2)');
        if (existingInfo) {
            existingInfo.textContent = `次回リセット: ${data.resetDate}`;
        } else {
            limitDiv.appendChild(resetInfo);
        }
    }
    
    if (remaining <= 0) {
        document.getElementById('download-limit').style.background = '#ffebee';
        document.getElementById('remaining-downloads').style.color = '#c62828';
    }
}

// 無料画像スライダー
const freeSlider = document.getElementById('free-slider');
const selectedImages = new Set();

// 無料画像スライダー
function generateFreeImages() {
    freeSlider.innerHTML = '';
    
    // ランダムに1枚選択
    const randomImageId = Math.floor(Math.random() * CONFIG.totalFreeImages) + 1;
    
    const item = document.createElement('div');
    item.className = 'free-image-item';
    item.dataset.imageId = randomImageId;
    
    // 実際の画像を表示
    item.innerHTML = `
        <img src="images/free-${randomImageId}.jpg" 
             alt="無料ヘアスタイル画像" 
             class="free-image"
             onerror="this.parentElement.innerHTML='<div class=\\'free-image-placeholder\\'>画像 ${randomImageId}</div><div class=\\'image-checkbox\\'></div>'">
        <div class="image-checkbox"></div>
    `;
    
    freeSlider.appendChild(item);
    
    // アイテムのスタイルを設定
    item.style.maxWidth = '400px';
    item.style.width = '400px';
    item.style.margin = '0 auto';

    item.addEventListener('click', () => toggleImageSelection(randomImageId, item));
    
    // ギャラリーグリッドを中央寄せ
    freeSlider.style.display = 'flex';
    freeSlider.style.justifyContent = 'center';
    freeSlider.style.width = '100%';
    
    // 画像のスタイル設定
    const images = freeSlider.querySelectorAll('.free-image');
    images.forEach(img => {
        img.style.width = '100%';
        img.style.height = 'auto';
        img.style.aspectRatio = '3/4';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '8px';
    });
    
    // プレースホルダーのスタイル設定（画像読み込み失敗時用）
    const placeholders = freeSlider.querySelectorAll('.free-image-placeholder');
    placeholders.forEach(p => {
        p.style.width = '400px';
        p.style.height = '533px';
    });
}
    
   

function toggleImageSelection(imageId, element) {
    const remaining = getRemainingDownloads();
    
    if (selectedImages.has(imageId)) {
        selectedImages.delete(imageId);
        element.classList.remove('selected');
    } else {
        if (selectedImages.size >= remaining) {
            alert(`1日の制限は${CONFIG.dailyDownloadLimit}枚です。\n本日はあと${remaining}枚ダウンロード可能です。`);
            return;
        }
        selectedImages.add(imageId);
        element.classList.add('selected');
    }
    
    updateSelectedPreview();
    updateDownloadButton();
}

function updateSelectedPreview() {
    const container = document.getElementById('selected-images');
    const countElement = document.getElementById('selected-count');
    
    countElement.textContent = selectedImages.size;
    container.innerHTML = '';
    
    selectedImages.forEach(id => {
        const thumb = document.createElement('div');
        thumb.className = 'selected-thumbnail';
        thumb.innerHTML = `
            <div class="placeholder" style="background: linear-gradient(135deg, #8B7355 0%, #A08B72 100%); display: flex; align-items: center; justify-content: center; color: #fff;">${id}</div>
            <button class="remove-selected" onclick="removeSelection(${id})">×</button>
        `;
        container.appendChild(thumb);
    });
}

function removeSelection(imageId) {
    selectedImages.delete(imageId);
    const item = document.querySelector(`[data-image-id="${imageId}"]`);
    if (item) item.classList.remove('selected');
    updateSelectedPreview();
    updateDownloadButton();
}

window.removeSelection = removeSelection;

function updateDownloadButton() {
    const button = document.getElementById('download-button');
    button.disabled = selectedImages.size === 0;
}

// ダウンロード処理
document.getElementById('download-button').addEventListener('click', () => {
    const remaining = getRemainingDownloads();
    
    if (selectedImages.size > remaining) {
        alert(`本日はあと${remaining}枚までダウンロード可能です。`);
        return;
    }
    
    const email = prompt('メールアドレスを入力してください:');
    
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        const imageIds = Array.from(selectedImages);
        console.log('ダウンロード:', imageIds, email);
        
        const data = getDownloadData();
        data.count += selectedImages.size;
        saveDownloadData(data);
        
        alert(`ありがとうございます！\n画像 ${imageIds.join(', ')} のダウンロードリンクを${email}に送信しました。\n\n残り: ${CONFIG.dailyDownloadLimit - data.count}枚`);
        
        selectedImages.clear();
        document.querySelectorAll('.free-image-item').forEach(item => {
            item.classList.remove('selected');
        });
        updateSelectedPreview();
        updateDownloadButton();
        updateDownloadLimit();
        
    } else if (email !== null) {
        alert('有効なメールアドレスを入力してください。');
    }
});

// スライダーナビゲーション
let currentPage = 0;
const itemsPerPage = 8;

document.getElementById('slider-prev').addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        updateSliderView();
    }
});

document.getElementById('slider-next').addEventListener('click', () => {
    const maxPages = Math.ceil(CONFIG.totalFreeImages / itemsPerPage) - 1;
    if (currentPage < maxPages) {
        currentPage++;
        updateSliderView();
    }
});

function updateSliderView() {
    const items = document.querySelectorAll('.free-image-item');
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    
    items.forEach((item, index) => {
        item.style.display = (index >= start && index < end) ? 'block' : 'none';
    });
}

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    generateFreeImages();
    updateDownloadLimit();
    updateSliderView();
});

console.log('%c🎨 Capilus v2.0', 'color: #8B7355; font-size: 20px; font-weight: bold;');
console.log(`無料画像: ${CONFIG.totalFreeImages}枚 | 制限: ${CONFIG.dailyDownloadLimit}枚/${CONFIG.resetIntervalDays}日ごと`);

// AdSense広告の切り替え
function activateAdSense() {
    document.getElementById('ad-pending').style.display = 'none';
    document.getElementById('google-adsense').style.display = 'block';
}
