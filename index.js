import { getPrice, getNews } from './lib/api-client.js';

async function main() {
    // 隨機延遲避免併發
    await new Promise(r => setTimeout(r, Math.random() * 3000));

    const [priceData, news] = await Promise.all([getPrice(), getNews()]);
    const now = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });

    if (!priceData) {
        console.log("❌ 數據獲取失敗。");
        process.exit(1);
    }

    console.log(`[DATA_START]`);
    console.log(`TIME: ${now}`);
    console.log(`PRICE: ${priceData.price}`);
    console.log(`CHANGE: ${priceData.change.toFixed(2)}%`);
    console.log(`NEWS: ${news.join(' | ')}`);
    console.log(`[DATA_END]`);
}

main();
