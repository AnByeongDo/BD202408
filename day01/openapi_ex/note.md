# 네이브버 뉴스 크롤링
네이버 뉴스 크롤링을 위한 Node.js 스크립트를 작성해 보겠습니다. 이 스크립트는 `axios`를 이용해 네이버 뉴스 페이지에서 HTML 데이터를 가져오고, `cheerio`를 이용해 필요한 정보를 파싱하며, 이미지를 다운로드하는 기능을 포함합니다.

우선 필요한 Node.js 모듈을 설치합니다:

```bash
npm install axios cheerio fs
```

이제 크롤링 스크립트를 작성해 보겠습니다.

```javascript
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
        const html = response.data;

        // cheerio를 이용해 HTML 파싱
        const $ = cheerio.load(html);

        // 뉴스 항목 가져오기
        const articles = [];
        $('div.list_content div.content a').each((index, element) => {
            const title = $(element).text().trim();
            const link = $(element).attr('href');
            const imageUrl = $(element).find('img').attr('src');

            if (imageUrl) {
                const imagePath = path.join(__dirname, `image_${index + 1}.jpg`);
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
```

### 스크립트 설명

1. **모듈 불러오기**: `axios`를 사용해 HTTP 요청을 보내고, `cheerio`를 사용해 HTML 문서를 파싱합니다. `fs` 모듈은 이미지를 파일로 저장하기 위해 사용됩니다.

2. **뉴스 URL**: `url` 변수에 크롤링할 네이버 뉴스 페이지의 URL을 저장합니다.

3. **이미지 다운로드 함수 (`downloadImage`)**: 주어진 이미지 URL에서 이미지를 다운로드해 지정된 경로에 저장합니다.

4. **뉴스 페이지 크롤링 (`scrapeNaverNews`)**: 
   - `axios.get()`을 사용해 지정된 URL에서 HTML 데이터를 가져옵니다.
   - `cheerio.load()`를 이용해 HTML 데이터를 로드하고, `$('div.list_content div.content a')` 선택자를 통해 뉴스 기사의 링크, 제목, 이미지 URL을 추출합니다.
   - 이미지가 있는 경우 `downloadImage` 함수를 호출해 이미지를 다운로드합니다.

5. **크롤링 결과 출력**: 크롤링된 뉴스 기사들의 제목, 링크, 이미지 URL을 콘솔에 출력합니다.

### 실행 방법

스크립트를 작성한 후 `node 파일이름.js` 명령어를 사용해 실행할 수 있습니다. 실행하면 지정된 네이버 뉴스 페이지에서 기사 정보를 추출하고, 포함된 이미지를 로컬 디렉터리에 다운로드합니다.

이 스크립트를 기반으로 추가적인 기능이나 예외 처리를 더해 확장할 수 있습니다.