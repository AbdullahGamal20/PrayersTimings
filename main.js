let selected = document.getElementById("sel");
getPrayersTimingByCity("EG", "cairo");
let cities = ["Cairo", "Makkah", "Alexandria"];
cities.forEach((e) => {
  let content = `
    <option>${e}</option>
  `;
  selected.innerHTML += content;
});

document.getElementById("sel").addEventListener("change", () => {
  document.querySelector(".city-name").innerHTML = selected.value;

  if (selected.value == cities[0]) {
    getPrayersTimingByCity("EG", "Cairo");
  }
  if (selected.value == cities[1]) {
    getPrayersTimingByCity("SA", "makkah");
  }

  if (selected.value == cities[2]) {
    getPrayersTimingByCity("EG", "Alexandria");
  }
});

function getPrayersTimingByCity(countryName, cityName) {
  let params = {
    country: countryName,
    city: cityName,
  };
  fetch(
    `http://api.aladhan.com/v1/timingsByCity?country=${params.country}&city=${params.city}`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((res) => {
      console.log(res);
      document.getElementById("date").innerHTML = res.data.date.readable;
      let time = res.data.timings;
      fillTime("fajr", time.Fajr);
      fillTime("sunrise", time.Sunrise);
      fillTime("dhuhr", time.Dhuhr);
      fillTime("asr", time.Asr);
      fillTime("maghrib", time.Maghrib);
      fillTime("isha", time.Isha);
    });
}

function fillTime(id, time) {
  document.getElementById(id).innerHTML = time;
}
