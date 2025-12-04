const ALPHA_VANTAGE_API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;

export async function getStockPrice(symbol:string): Promise<number | null> {
    try{
        const response = await fetch(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
        );
        const data = await response.json();
        if (data['Global Quote'] && data['Global Quote']['05. price']) {
            return parseFloat(data['Global Quote']['05. price']);
          }
        return null;
    } catch (error){
        console.error(`Error fetching price for ${symbol}`, error);
        return null;
    }
}
export async function getMultipleStockPrices(symbols: string[]): Promise<Record<string, number>>{
    const prices: Record<string, number> ={};

    for (const symbol of symbols){
        const price = await getStockPrice(symbol);
        if(price !== null){
            prices[symbol]= price;
        }
        await new Promise(resolve => setTimeout(resolve, 12000));
    }
    return prices;
}