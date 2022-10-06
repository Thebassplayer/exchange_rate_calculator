const currencyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

//! Fetch API exchange rates and update the DOM with async + AXIOS

// function calculate() {
//   const currency_one = currencyEl_one.value;
//   const currency_two = currencyEl_two.value;

//   const apiURL = `https://v6.exchangerate-api.com/v6/5c363e10cf9828b535691464/latest/${currency_one}`;

//   async function fetchData(url) {
//     const res = await axios.get(url);
//     console.log("Parsed Data", res);
//     const { conversion_rates } = res.data;
//     console.log(conversion_rates);
//     const rate = conversion_rates[currency_two];
//     console.log("Rate", rate);

//     rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

//     amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
//   }

//   fetchData(apiURL).catch((err) => {
//     // window.open('./error.html', '_self');

//     console.log(err);
//   });
// }

//! Fetch API exchange rates and update the DOM with async + Fetch

function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  const apiURL = `https://v6.exchangerate-api.com/v6/a3caeeb8c7e2479f637606fe/latest/${currency_one}`;

  async function fetchData(url) {
    const res = await fetch(url);
    console.log(res);
    if (!res.ok) {
      throw new Error(res.status);
    }
    const parsedData = await res.json();
    console.log("Parsed Data", parsedData);
    const { conversion_rates } = parsedData;
    console.log(conversion_rates);
    const rate = conversion_rates[currency_two];
    console.log("Rate", rate);

    rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

    amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
  }

  fetchData(apiURL).catch((err) => {
    window.open("./error.html", "_self");

    console.log(err);
  });
}

//! Fetch API exchange rates and update the DOM with plain fetch

// function calculate() {
//   const currency_one = currencyEl_one.value;
//   const currency_two = currencyEl_two.value;

//   const apiURL = `https://v6.exchangerate-api.com/v6/a3caeeb8c7e2479f637606fe/latest/${currency_one}`;

//   fetch(apiURL)
//     .then((res) => res.json())
//     .then((data) => {
//       const rate = data.conversion_rates[currency_two].toFixed(2);
//       console.log(rate);

//       rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

//       amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
//     });
// }

//! Swap;

function swapVals() {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
}

//! Event listener

currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);

swap.addEventListener("click", swapVals);

calculate();
