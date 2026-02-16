export async function getPrice() {
    // 策略：依照穩定性與頻率限制寬容度排序
    
    // 1. Yahoo Finance (透過 Chart API，相對寬容)
    try {
        const res = await fetch('https://query1.finance.yahoo.com/v8/finance/chart/BTC-USD?interval=1d&range=1d');
        const data = await res.json();
        const meta = data.chart.result[0].meta;
        return {
            price: meta.regularMarketPrice,
            change: ((meta.regularMarketPrice - meta.chartPreviousClose) / meta.chartPreviousClose) * 100,
            source: 'Yahoo Finance'
        };
    } catch (e) { console.error('Yahoo fallback...'); }

    // 2. CoinGecko (作為穩定備援)
    try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true');
        const data = await res.json();
        return {
            price: data.bitcoin.usd,
            change: data.bitcoin.usd_24h_change,
            source: 'CoinGecko'
        };
    } catch (e) { console.error('CoinGecko fallback...'); }

    // 3. Binance (最後手段，若其他皆失敗才嘗試)
    try {
        const res = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
        const data = await res.json();
        return {
            price: parseFloat(data.price),
            change: 0, // 此端點不提供 24h 變化，設為 0
            source: 'Binance (Emergency)'
        };
    } catch (e) { console.error('All sources failed.'); }

    return null;
}
