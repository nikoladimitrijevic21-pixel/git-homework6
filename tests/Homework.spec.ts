
import { test, expect } from '@playwright/test';
test('Homework Test', async function ({ }) {



const testResults = [
  { name: "Login test", status: "passed", duration: 1200 },
  { name: "Checkout test", status: "failed", duration: 3400 },
  { name: "Search test", status: "passed", duration: 800 },
];
// 1. Use **destructuring** to pull `name` and `status` out of the first
const LoginTest: string = testResults[0].name + " - " + testResults[0].status;
console.log(LoginTest);

//2. Use **`for...of`** to log every test's name and duration.

for (const testResult of testResults) {
  console.log(testResult.name + " - " + testResult.duration);
}

//3. Produce an array containing only the names of the failed tests —
function getFailedTestNames(): string[] {
  let failedTestNames: string[] = [];
  for (let i = 0; i < testResults.length; i++) {
    if (testResults[i].status === "failed") {
      failedTestNames.push(testResults[i].name);
    }
  }
  return failedTestNames;
}
console.log("FailedTestNames: "+getFailedTestNames());

//4. Use another array method to calculate the **total duration** across
// all tests, in one expression.
let totalDuration:number=testResults[0].duration + testResults[1].duration + testResults[2].duration;
console.log("Total Duration: " + totalDuration);


//const [first, second, third] = testResults;
//console.log(first.name);

//1. Use **destructuring** to pull `name` and `status` out of the first
//   test result, in one line.
//2. Use **`for...of`** to log every test's name and duration.
//3. Produce an array containing only the names of the failed tests —
//   using either an **array method** or a loop, whichever you reach for.
//4. Use another array method to calculate the **total duration** across
// all tests, in one expression.

}
)


