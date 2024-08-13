const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// 뉴스 URL
const url = 'https://news.naver.com/main/ranking/popularDay.naver?mid=etc&sid1=111';

// 이미지를 다운로드하는 함수
async function downloadImage(imageUrl, outputPath) {
    const writer = fs.createWriteStream(outputPath);

    const response = await axios({
        url: imageUrl,
        method: 'GET',
        responseType: 'stream',
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

// 뉴스 페이지 크롤링 함수
async function scrapeNaverNews() {
    try {
        // 페이지 데이터 가져오기
        const response = await axios.get(url);
        const html = response.data;;

        // cheerio를 이용해 HTML 파싱
        const $ = cheerio.load(html);

        // 뉴스 항목 가져오기
        const articles = [];
        // div.rankingnews_box_wrap._popularRanking ul > li > a > img
        $('div.rankingnews_box_wrap._popularRanking ul li a').each((index, element) => {
            const title = $(element).text().trim();
            const link = $(element).attr('href');
            const imageUrl = $(element).find('img').attr('src');
            console.log(imageUrl);

            if (imageUrl) {
                const imagePath = path.join(__dirname, `download/image_${index + 1}.jpg`);
                downloadImage(imageUrl, imagePath)
                    .then(() => console.log(`이미지 다운로드 완료: ${imagePath}`))
                    .catch((err) => console.error(`이미지 다운로드 실패: ${err.message}`));
            }

            articles.push({ title, link, imageUrl });
        });

        // 크롤링 결과 출력
        console.log(articles);
    } catch (error) {
        console.error('크롤링 중 오류 발생:', error.message);
    }
}

// 크롤링 실행
scrapeNaverNews();