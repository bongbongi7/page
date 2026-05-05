exports.handler = async function(){

// WEATHER
let weatherRes = await fetch("https://api.open-meteo.com/v1/forecast?latitude=37.39&longitude=126.95&current_weather=true");
let weatherData = await weatherRes.json();

// NEWS (RSS 변환 API)
let newsRes = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://news.google.com/rss?hl=ko&gl=KR&ceid=KR:ko");
let newsData = await newsRes.json();

// STOCK (간단 텍스트)
let stocks = "KOSPI / Samsung / SK hynix / NASDAQ";

// MEAL (간단 처리)
let today = new Date().getDay();
let meal = (today===0 || today===6) ? "오늘은 급식이 없습니다" : "급식 정보 로딩 필요";

return {
    statusCode:200,
    body:JSON.stringify({
        weather:`${weatherData.current_weather.temperature}°C`,
        news:newsData.items.slice(0,5).map(i=>i.title),
        stocks:stocks,
        meal:meal
    })
}
}