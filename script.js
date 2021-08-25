import http from 'k6/http';
import { check, sleep } from 'k6';

// export let options = {
//   stages: [
//     { duration: '30s', target: 20 },
//     { duration: '1m30s', target: 10 },
//     { duration: '20s', target: 0 },
//   ],
// };
export let options = {
  stages: [
    { duration: '20s', target: 50 }, // ramp up to 400 users
    { duration: '10m', target: 50 }, // stay at 400 for ~4 hours
    { duration: '20s', target: 0 }, // scale down. (optional)
  ],
  ext: {
    loadimpact: {
      projectID: 3547288,
      // Test runs with the same name groups test runs together
      name: "YOUR TEST NAME"
    }
  }
}
export default function () {
  let res = http.get('http://192.168.1.122:8080/');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
