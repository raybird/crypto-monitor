export async function getPrice() {
    // 來源 A: Binance (極速且限制少)
    try {
        const res = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT');
        const data = await res.json();
        return {
            price: parseFloat(data.lastPrice),
            change: parseFloat(data.priceChangePercent),
            source: 'Binance'
        };
    } catch (e) { console.error('Binance fallback...'); }

    // 來源 B: CoinGecko
    try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true');
        const data = await res.json();
        return {
            price: data.bitcoin.usd,
            change: data.bitcoin.usd_24h_change,
            source: 'CoinGecko'
        };
    } catch (e) { console.error('CoinGecko fallback...'); }

    return null;
}
