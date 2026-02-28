export async function getPrice() {
    try {
        const res = await fetch('https://query1.finance.yahoo.com/v8/finance/chart/BTC-USD?interval=1d&range=1d');
        const data = await res.json();
        const meta = data.chart.result[0].meta;
        return {
            price: meta.regularMarketPrice,
            change: ((meta.regularMarketPrice - meta.chartPreviousClose) / meta.chartPreviousClose) * 100
        };
    } catch (e) { return null; }
}

export async function getNews() {
    try {
        // CoinTelegraph RSS 較為穩定且不需複雜 Header
        const res = await fetch('https://cointelegraph.com/rss');
        const text = await res.text();
        const titles = [...text.matchAll(/<title>(.*?)<\/title>/g)]
            .map(m => m[1].replace(/<!\[CDATA\[|\]\]>/g, '')) // 清除可能存在的 CDATA
            .filter(t => t.length > 20) // 過濾掉頻道名稱等雜訊
            .slice(0, 3);
        return titles;
    } catch (e) { return ["暫時無法獲取即時新聞"]; }
}
