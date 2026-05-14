export const sendGAEvent = (eventName, params = {}) => {
  console.log("GA Event:", eventName, params); /* 확인용 */

  if (typeof window.gtag !== "function") {
    console.log("GA not loaded:", eventName, params);
    return; /* GA 코드가 아직 안 불러와졌거나, index.html에 측정 코드가 잘못 들어가면 window.gtag가 없을 수 있음. 방어코드 */
  }

  window.gtag("event", eventName, params);
  console.log("GA sent:", eventName, params); /* 확인용 */
};
