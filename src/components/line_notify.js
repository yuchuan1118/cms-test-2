// LINE Notify with WebHooks
import axios from 'axios';
const WEBHOOKS_ROOT_URL = 'https://maker.ifttt.com/trigger';
const WEBHOOKS_API_KEY = 'd8QDPylHR0Lcutc4Uso8sI';
const WEBHOOKS_EVENT_RECEIPTS = 'In-app-purchased';
// https://maker.ifttt.com/trigger/In-app-purchased/with/key/d8QDPylHR0Lcutc4Uso8sI

// LINE Notify with WEBHOOKS_API_KEY
const request = axios
  .post(
    `${WEBHOOKS_ROOT_URL}/${WEBHOOKS_EVENT_RECEIPTS}/with/key/${WEBHOOKS_API_KEY}`,
    // 'https://maker.ifttt.com/trigger/In-app-purchased/with/key/d8QDPylHR0Lcutc4Uso8sI',
    { value1: SumCashValueByHistory }
  )
  .then(
    () => {
      console.log('axios post success!', SumCashValueByHistory);
    },
    e => {
      console.log('axios post failed!', e);
    }
  );
