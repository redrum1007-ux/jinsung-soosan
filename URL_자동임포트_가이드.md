# 🚀 URL 자동 임포트 완전 가이드

## ⚡ 가장 쉬운 방법

### 옵션 1: 브라우저 확장 프로그램 (추천)

#### 1. Web Scraper 설치

1. Chrome 웹 스토어에서 "Web Scraper" 검색
2. 확장 프로그램 설치
3. 쿠팡/네이버 상품 페이지 열기
4. F12 → Web Scraper 탭
5. Create new sitemap → 설정
6. Scrape → Export data as JSON
7. JSON 데이터를 복사하여 사용

#### 2. 단축키로 빠르게

1. 상품 페이지에서 Ctrl+Shift+S
2. 자동으로 데이터 추출
3. "상품 등록" 클릭

---

## 🔧 수동 방법 (100% 작동 보장)

### 쿠팡 상품 복사하기

```
1. 쿠팡 상품 페이지 열기
2. 다음 정보 복사:
   - 상품명: 페이지 제목
   - 가격: 할인가 또는 판매가
   - 이미지: 우클릭 → 이미지 주소 복사
   - 설명: 상세 정보 복사

3. product-import.html에 붙여넣기
4. "상품 등록" 클릭
```

### 예시: 쿠팡 URL

```
https://www.coupang.com/vp/products/7696887326

→ 정보 추출:
상품명: [쿠팡 페이지에서 복사]
가격: [쿠팡 페이지에서 복사]
이미지: [우클릭 → 이미지 주소 복사]
```

---

## 💡 북마클릿 사용 (원클릭 자동화)

### 1단계: 북마클릿 만들기

1. 브라우저 북마크바에 새 북마크 추가
2. 이름: "상품 가져오기"
3. URL에 다음 코드 붙여넣기:

```javascript
javascript: (function () {
  const title = document.title;
  const price = document.querySelector(".price, .total-price, .sale-price");
  const image = document.querySelector(".prod-image img, .prod_img img");

  const data = {
    name: title,
    price: price ? price.textContent.replace(/[^0-9]/g, "") : "",
    image: image ? image.src : "",
  };

  localStorage.setItem("scrapedProduct", JSON.stringify(data));
  window.open("/product-import.html?scraped=true", "_blank");
})();
```

### 2단계: 사용하기

1. 쿠팡/네이버 상품 페이지에서 북마크 클릭
2. 자동으로 정보 추출 및 임포트 페이지 열림
3. 확인 후 "등록" 클릭

---

## 🤖 Python 스크립트 (대량 임포트)

여러 상품을 한 번에 가져오고 싶다면:

### 1. 스크립트 생성 (`scraper.py`)

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
import json
import time

def scrape_coupang(url):
    driver = webdriver.Chrome()
    driver.get(url)
    time.sleep(3)  # 페이지 로딩 대기

    product = {
        'name': driver.find_element(By.CSS_SELECTOR, '.prod-buy-header__title').text,
        'price': driver.find_element(By.CSS_SELECTOR, '.total-price strong').text.replace(',', ''),
        'image': driver.find_element(By.CSS_SELECTOR, '.prod-image img').get_attribute('src'),
        'description': driver.find_element(By.CSS_SELECTOR, '.prod-description').text
    }

    driver.quit()
    return product

# URL 리스트
urls = [
    'https://www.coupang.com/vp/products/7696887326',
    'https://www.coupang.com/vp/products/...',
    # 더 추가...
]

products = []
for url in urls:
    try:
        product = scrape_coupang(url)
        products.append(product)
        print(f'✅ {product["name"]} - 완료')
    except Exception as e:
        print(f'❌ 실패: {e}')

# JSON으로 저장
with open('products.json', 'w', encoding='utf-8') as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

print(f'\n총 {len(products)}개 상품 추출 완료!')
```

### 2. 실행

```bash
# Selenium 설치
pip install selenium

# ChromeDriver 다운로드
# https://chromedriver.chromium.org/

# 스크립트 실행
python scraper.py
```

### 3. JSON 데이터 임포트

생성된 `products.json` 파일을 `product-import.html`에서 일괄 업로드

---

## 🌐 프록시 서버 사용 (고급)

쿠팡/네이버 차단 우회:

### Node.js 프록시 서버

```javascript
// proxy-server.js
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/scrape", async (req, res) => {
  const url = req.query.url;

  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    const $ = cheerio.load(response.data);

    const product = {
      name: $(".prod-buy-header__title").text().trim(),
      price: $(".total-price strong")
        .text()
        .replace(/[^0-9]/g, ""),
      image: $(".prod-image img").attr("src"),
    };

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("프록시 서버 실행: http://localhost:3000");
});
```

### 사용:

```bash
node proxy-server.js

# 브라우저에서:
fetch('http://localhost:3000/scrape?url=쿠팡URL')
    .then(res => res.json())
    .then(data => console.log(data));
```

---

## 📱 모바일에서 사용하기

### iOS (Safari)

1. Shortcuts 앱 사용
2. "웹페이지에서 텍스트 추출" 액션 추가
3. 진성네이처푸드 API로 전송

### Android (Chrome)

1. Tampermonkey 설치
2. UserScript 작성
3. 자동 데이터 추출

---

## ⚠️ 주의사항

### 법적 문제

- ✅ **본인 상품**: 네이버/쿠팡에 등록한 본인 상품 복사는 OK
- ❌ **타인 상품**: 무단 복사 시 저작권 침해 가능
- ℹ️ 이미지, 설명 등은 원저작자 동의 필요

### 기술적 한계

- 쿠팡/네이버는 봇 탐지 시스템이 있음
- IP 차단 가능성
- 너무 빠른 요청은 금지

---

## 🎯 결론

### 가장 실용적인 방법:

1. **초보자**: `product-import.html` 수동 복붙 (3분)
2. **중급자**: Web Scraper 확장 프로그램 (1분)
3. **고급자**: Python Selenium 스크립트 (대량 처리 가능)

---

**지금 바로 시도해보세요!** 🚀
