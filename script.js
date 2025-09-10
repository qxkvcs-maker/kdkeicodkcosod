const bunkerData = [
  {
    name: "Вход в бункер (1)",
    lat: 55.987173,
    lon: 37.153091,
    desc: "Спуск вниз, железные двери, как будто для въезда машинам."
  },
  {
    name: "Вход в бункер (2)",
    lat: 55.987338,
    lon: 37.154248,
    desc: "Видно убежище через двери, кнопка вызова охраны возможно реально их вызывает. Нужно также спуститься, как и на 1 бункере."
  },
  {
    name: "Вход в бункер (3)",
    lat: 55.986685,
    lon: 37.153730,
    desc: "Нужно подойти к этому месту, и убедиться, что дверь бункера открыта."
  }
];

let map;
let placemarks = {};

ymaps.ready(init);

function init() {
  map = new ymaps.Map("map", {
    center: [55.987173, 37.153091],
    zoom: 16,
    type: "yandex#hybrid"
  });

  renderBunkers();
}

function renderBunkers() {
  const cardsContainer = document.getElementById("cards");
  cardsContainer.innerHTML = "";

  bunkerData.forEach((bunker) => {
    // Добавляем метку
    const placemark = new ymaps.Placemark([bunker.lat, bunker.lon], {
      balloonContent: `<strong>${bunker.name}</strong><br>${bunker.desc}`
    }, {
      preset: "islands#redDotIcon"
    });
    map.geoObjects.add(placemark);
    placemarks[bunker.name] = placemark;

    // Создаем плашку
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h2>${bunker.name}</h2>
      <p>${bunker.desc}</p>
      <p><strong>Координаты:</strong> ${bunker.lat}, ${bunker.lon}</p>
      <div class="links">
        <a href="https://yandex.ru/maps/?pt=${bunker.lon},${bunker.lat}&z=18&l=map" target="_blank">Яндекс.Карты</a>
        <a href="https://www.google.com/maps/search/?api=1&query=${bunker.lat},${bunker.lon}" target="_blank">Google Maps</a>
      </div>
    `;

    cardsContainer.appendChild(card);
  });
}