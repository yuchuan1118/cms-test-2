// LINE Notify with WebHooks
import axios from 'axios';
const WEBHOOKS_ROOT_URL = 'https://maker.ifttt.com/trigger';
const WEBHOOKS_API_KEY = 'd8QDPylHR0Lcutc4Uso8sI';
const WEBHOOKS_EVENT_RECEIPTS = 'In-app-purchased';
// https://maker.ifttt.com/trigger/In-app-purchased/with/key/d8QDPylHR0Lcutc4Uso8sI

// const request = axios
//   .post(
//     `${WEBHOOKS_ROOT_URL}/${WEBHOOKS_EVENT_RECEIPTS}/with/key/${WEBHOOKS_API_KEY}`,
//     // 'https://maker.ifttt.com/trigger/In-app-purchased/with/key/d8QDPylHR0Lcutc4Uso8sI',
//     { value1: SumCashValueByHistory }
//   )
//   .then(
//     () => {
//       console.log('axios post success!', SumCashValueByHistory);
//     },
//     e => {
//       console.log('axios post failed!', e);
//     }
//   );

// LINE Notify with WEBHOOKS_API_KEY
export default function LineNotify(val1, val2, val3) {
  console.log('LineNotify is called:', val1, val2, val3);
  // 'https://maker.ifttt.com/trigger/In-app-purchased/with/key/d8QDPylHR0Lcutc4Uso8sI',
  const request = axios
    .post(
      `${WEBHOOKS_ROOT_URL}/${WEBHOOKS_EVENT_RECEIPTS}/with/key/${WEBHOOKS_API_KEY}`,
      {
        value1: val1,
        value2: val2,
        value3: val3
      }
    )
    .then(
      () => {
        console.log('LineNotify: axios.post success!', val1, val2, val3);
      },
      e => {
        console.log('LineNotify: axios.post failed!', e);
      }
    );
}
// const request = axios
//   .post(
//     `${WEBHOOKS_ROOT_URL}/${WEBHOOKS_EVENT_RECEIPTS}/with/key/${WEBHOOKS_API_KEY}`,
//     // 'https://maker.ifttt.com/trigger/In-app-purchased/with/key/d8QDPylHR0Lcutc4Uso8sI',
//     { value1: SumCashValueByHistory }
//   )
//   .then(
//     () => {
//       console.log('axios post success!', SumCashValueByHistory);
//     },
//     e => {
//       console.log('axios post failed!', e);
//     }
//   );
