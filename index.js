import { getPrice } from './lib/api-client.js';

async function main() {
    // 隨機延遲 0~5 秒，避免與其他並發任務精確撞擊
    const delay = Math.floor(Math.random() * 5000);
    await new Promise(r => setTimeout(r, delay));

    const data = await getPrice();
    const now = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });

    if (!data) {
        console.log("❌ 錯誤：無法獲取市場數據。所有 API 來源均回報頻率限制 (429) 或連線失敗。");
        process.exit(1);
    }

    const priceFormatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.price);
    const changePrefix = data.change >= 0 ? '+' : '';

    console.log(`### 💰 BTC 市場行情 - ${now}`);
    console.log(`- **報價**：${priceFormatted}`);
    console.log(`- **24H 漲跌**：${changePrefix}${data.change.toFixed(2)}%`);
    console.log(`- **數據來源**：${data.source}`);
    console.log(`- **執行延遲**：${(delay/1000).toFixed(1)}s`);
    console.log('\n---');
    console.log('*資料由 crypto-monitor 專案自動產出，已實作 429 規避邏輯。*');
}

main();
