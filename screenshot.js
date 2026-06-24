import { chromium } from 'playwright';

async function captureScreenshot() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // 브라우저 창 크기 설정
  await page.setViewportSize({ width: 1280, height: 800 });

  try {
    // 앱 접속
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

    // 스크린샷 캡처
    await page.screenshot({ path: 'screenshot.png' });
    console.log('Screenshot saved as screenshot.png');

    // 페이지 제목 출력
    const title = await page.title();
    console.log('Page title:', title);

    // 텍스트 패널의 텍스트 내용 확인
    const textPanelContent = await page.evaluate(() => {
      const textPanel = document.querySelector('.text-panel');
      return textPanel ? textPanel.innerText : 'Text panel not found';
    });
    console.log('Text panel content:');
    console.log(textPanelContent);

    // 레이아웃 검증: 70/30 비율 확인
    const layoutInfo = await page.evaluate(() => {
      const visualPanel = document.querySelector('.visual-panel');
      const textPanel = document.querySelector('.text-panel');
      const appLayout = document.querySelector('.app-layout');

      return {
        appLayoutWidth: appLayout?.offsetWidth,
        visualPanelWidth: visualPanel?.offsetWidth,
        textPanelWidth: textPanel?.offsetWidth,
        visualRatio: ((visualPanel?.offsetWidth || 0) / (appLayout?.offsetWidth || 1) * 100).toFixed(1),
        textRatio: ((textPanel?.offsetWidth || 0) / (appLayout?.offsetWidth || 1) * 100).toFixed(1),
      };
    });
    console.log('Layout ratios:');
    console.log(`  Visual Panel: ${layoutInfo.visualRatio}% (${layoutInfo.visualPanelWidth}px)`);
    console.log(`  Text Panel: ${layoutInfo.textRatio}% (${layoutInfo.textPanelWidth}px)`);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
}

captureScreenshot();
