const ArrivalRouting = (() => {
    const points = [
        {
            "name": "Казанский вокзал",
            "city": "Москва",
            "aliases": [
                "Казанский"
            ],
            "coordinates": "55.77367793555324,37.65803774602993",
            "source": "https://rasp.yandex.ru/station/2000003/",
            "airport": false
        },
        {
            "name": "Курский вокзал",
            "city": "Москва",
            "aliases": [
                "Курский"
            ],
            "coordinates": "55.75777257956202,37.66216229563075",
            "source": "https://rasp.yandex.ru/station/2000001/",
            "airport": false
        },
        {
            "name": "Ленинградский вокзал",
            "city": "Москва",
            "aliases": [
                "Ленинградский"
            ],
            "coordinates": "55.778353,37.654377",
            "source": "https://rasp.yandex.ru/station/2006004/",
            "airport": false
        },
        {
            "name": "Ярославский вокзал",
            "city": "Москва",
            "aliases": [
                "Ярославский"
            ],
            "coordinates": "55.777685,37.657484",
            "source": "https://rasp.yandex.ru/station/2000002/",
            "airport": false
        },
        {
            "name": "Павелецкий вокзал",
            "city": "Москва",
            "aliases": [
                "Павелецкий"
            ],
            "coordinates": "55.729498,37.640771",
            "source": "https://rasp.yandex.ru/station/2000005/",
            "airport": false
        },
        {
            "name": "Киевский вокзал",
            "city": "Москва",
            "aliases": [
                "Киевский"
            ],
            "coordinates": "55.742799,37.565187",
            "source": "https://rasp.yandex.ru/station/2000007/",
            "airport": false
        },
        {
            "name": "Белорусский вокзал",
            "city": "Москва",
            "aliases": [
                "Белорусский"
            ],
            "coordinates": "55.7764527677074,37.57958027843418",
            "source": "https://rasp.yandex.ru/station/2000006/",
            "airport": false
        },
        {
            "name": "Савёловский вокзал",
            "city": "Москва",
            "aliases": [
                "Савёловский"
            ],
            "coordinates": "55.795104,37.589184",
            "source": "https://rasp.yandex.ru/station/2000009/",
            "airport": false
        },
        {
            "name": "Рижский вокзал",
            "city": "Москва",
            "aliases": [
                "Рижский"
            ],
            "coordinates": "55.794805331024584,37.63220598147566",
            "source": "https://rasp.yandex.ru/station/2000008/",
            "airport": false
        },
        {
            "name": "Восточный вокзал",
            "city": "Москва",
            "aliases": [
                "Восточный"
            ],
            "coordinates": "55.80299322000356,37.74727184099061",
            "source": "https://rasp.yandex.ru/station/9879173/",
            "airport": false
        },
        {
            "name": "Аэропорт Шереметьево",
            "city": "Москва",
            "aliases": [
                "Шереметьево",
                "SVO"
            ],
            "coordinates": "55.963951,37.41689",
            "source": "https://rasp.yandex.ru/station/9600213/",
            "airport": true
        },
        {
            "name": "Аэропорт Домодедово",
            "city": "Москва",
            "aliases": [
                "Домодедово",
                "DME"
            ],
            "coordinates": "55.415133,37.896818",
            "source": "https://rasp.yandex.ru/station/9600216/",
            "airport": true
        },
        {
            "name": "Аэропорт Внуково",
            "city": "Москва",
            "aliases": [
                "Внуково",
                "VKO"
            ],
            "coordinates": "55.605771,37.288147",
            "source": "https://rasp.yandex.ru/station/9600215/",
            "airport": true
        },
        {
            "name": "Аэропорт Жуковский",
            "city": "Москва",
            "aliases": [
                "Жуковский",
                "ZIA"
            ],
            "coordinates": "55.561684391375,38.1176998796232",
            "source": "https://rasp.yandex.ru/station/9850865/",
            "airport": true
        },
        {
            "name": "Московский вокзал",
            "city": "Санкт-Петербург",
            "aliases": [
                "Московский"
            ],
            "coordinates": "59.92870860900404,30.36253976322886",
            "source": "https://rasp.yandex.ru/station/9602494/",
            "airport": false
        },
        {
            "name": "Ладожский вокзал",
            "city": "Санкт-Петербург",
            "aliases": [
                "Ладожский"
            ],
            "coordinates": "59.931374596178,30.441275744704328",
            "source": "https://rasp.yandex.ru/station/9602499/",
            "airport": false
        },
        {
            "name": "Витебский вокзал",
            "city": "Санкт-Петербург",
            "aliases": [
                "Витебский"
            ],
            "coordinates": "59.91886548631597,30.330452422124264",
            "source": "https://rasp.yandex.ru/station/9602496/",
            "airport": false
        },
        {
            "name": "Финляндский вокзал",
            "city": "Санкт-Петербург",
            "aliases": [
                "Финляндский"
            ],
            "coordinates": "59.95625770145535,30.357114289687395",
            "source": "https://rasp.yandex.ru/station/9602497/",
            "airport": false
        },
        {
            "name": "Балтийский вокзал",
            "city": "Санкт-Петербург",
            "aliases": [
                "Балтийский"
            ],
            "coordinates": "59.905985908034204,30.298964695770124",
            "source": "https://rasp.yandex.ru/station/9602498/",
            "airport": false
        },
        {
            "name": "Аэропорт Пулково",
            "city": "Санкт-Петербург",
            "aliases": [
                "Пулково",
                "LED"
            ],
            "coordinates": "59.799489,30.271525",
            "source": "https://rasp.yandex.ru/station/9600366/",
            "airport": true
        }
    ];
    const venues = [
        {
            city: "Москва",
            venue: "МТС Live Холл",
            address: "Москва, шоссе Энтузиастов, д. 5, стр. 2",
            coordinates: "55.749461,37.696446",
            source: "https://msk-live-hall.mts.ru/contacts"
        },
        {
            city: "Санкт-Петербург",
            venue: "А2",
            address: "Санкт-Петербург, проспект Медиков, 3",
            coordinates: "59.969022,30.315114",
            source: "https://org.a2.fm/kontakty",
            mapSource: "https://yandex.ru/map-widget/v1/?um=constructor%3A116707bed03822bb8e1a2b7933fa34eb079b92d5b41def73a216d6342ee79664&source=constructor"
        }
    ];
    const cities = [
        { name: "Москва", aliases: ["москва", "moscow", "мск"] },
        { name: "Санкт-Петербург", aliases: ["санкт петербург", "санктпетербург", "петербург", "питер", "спб", "saint petersburg"] }
    ];
    function normalize(value) {
        return value.normalize("NFKC").toLocaleLowerCase("ru-RU")
            .replaceAll("ё", "е").replace(/[^\p{L}\p{N}]+/gu, " ")
            .replace(/\s+/g, " ").trim();
    }
    function placeKey(value) {
        return normalize(value)
            .split(" ").filter(word => ![
                "вокзал", "вокзала", "аэропорт", "аэропорта", "международный",
                "железнодорожный", "ж", "д", "г", "город"
            ].includes(word)).join(" ");
    }
    function distance(a, b) {
        const [lat1, lon1] = a.split(",").map(Number);
        const [lat2, lon2] = b.split(",").map(Number);
        const rad = Math.PI / 180;
        const h = Math.sin((lat2 - lat1) * rad / 2) ** 2 +
            Math.cos(lat1 * rad) * Math.cos(lat2 * rad) *
            Math.sin((lon2 - lon1) * rad / 2) ** 2;
        return 6371 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
    }
    function resolve(value, city) {
        if (value.length > 240) {
            return { error: "Название места прибытия должно быть не длиннее 240 символов." };
        }
        const input = value.trim();
        if (!input) {
            return { error: "Укажи вокзал или аэропорт прибытия." };
        }
        const coordinateMatch = input.match(/^([+-]?\d{1,2}(?:\.\d+)?)\s*,\s*([+-]?\d{1,3}(?:\.\d+)?)$/);
        if (coordinateMatch) {
            const latitude = Number(coordinateMatch[1]);
            const longitude = Number(coordinateMatch[2]);
            const coordinates = latitude + "," + longitude;
            const venue = venues.find(item => item.city === city);
            if (Math.abs(latitude) > 90 || Math.abs(longitude) > 180 ||
                !venue || distance(coordinates, venue.coordinates) > 150) {
                return { error: "Проверь координаты: нужна точка прибытия рядом с городом концерта — " + city + ". Порядок: широта, долгота." };
            }
            return { name: "Указанная точка: " + coordinates, city, coordinates };
        }
        let key = " " + normalize(input) + " ";
        const explicitCities = cities.filter(item => item.aliases.some(alias => key.includes(" " + alias + " ")));
        if (explicitCities.some(item => item.name !== city)) {
            return { error: "В названии указан другой город. Выбран концерт: " + city + ". Уточни место прибытия или выбери другой концерт." };
        }
        for (const item of explicitCities) {
            for (const alias of item.aliases) {
                key = key.replaceAll(" " + alias + " ", " ");
            }
        }
        key = placeKey(key);
        const matches = points.filter(point => point.city === city &&
            [point.name, ...point.aliases].some(alias => placeKey(alias) === key));
        if (matches.length === 1) {
            return matches[0];
        }
        const otherCity = points.find(point => [point.name, ...point.aliases].some(alias => placeKey(alias) === key));
        if (otherCity) {
            return { error: otherCity.name + " находится в другом городе или регионе прибытия: " + otherCity.city + ". Выбран концерт: " + city + ". Уточни место или выбери другой концерт." };
        }
        const searchUrl = new URL("https://yandex.ru/maps/");
        searchUrl.searchParams.set("text", input + (explicitCities.length ? "" : ", " + city));
        return {
            error: "Не удалось однозначно распознать место. Уточни название из билета. Для другого места найди точку на карте и вставь её координаты в формате «широта, долгота». Маршрут пока не открыт.",
            searchUrl: searchUrl.href
        };
    }
    function route(value, concert) {
        const origin = resolve(value, concert.city);
        if (origin.error) {
            return origin;
        }
        const destination = venues.find(item => item.city === concert.city &&
            item.venue === concert.venue && item.address === concert.address);
        if (!destination) {
            return { error: "Точка площадки не подтверждена. Проверь выбранный концерт." };
        }
        const url = new URL("https://yandex.ru/maps/");
        url.searchParams.set("mode", "routes");
        url.searchParams.set("rtext", origin.coordinates + "~" + destination.coordinates);
        url.searchParams.set("rtt", "mt");
        return { origin, destination, url: url.href };
    }
    return { points, venues, resolve, route };
})();
if (typeof module !== "undefined" && module.exports) {
    module.exports = ArrivalRouting;
}
