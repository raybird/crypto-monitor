import { getPrice } from './lib/api-client.js';

async function main() {
    const data = await getPrice();
    const now = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });

    if (!data) {
        console.log("❌ 錯誤：無法獲取市場數據 (所有來源皆失效)。");
        process.exit(1);
    }

    const priceFormatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.price);
    const changePrefix = data.change >= 0 ? '+' : '';

    console.log(`### 💰 BTC 市場行情 - ${now}`);
    console.log(`- **報價**：${priceFormatted}`);
    console.log(`- **24H 漲跌**：${changePrefix}${data.change.toFixed(2)}%`);
    console.log(`- **數據來源**：${data.source}`);
    console.log('\n---');
    console.log('*資料由 crypto-monitor 專案自動產出，已優化資源佔用。*');
}

main();
