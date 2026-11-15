 const concerts = [
        {
            city: "Москва",
            date: "2026-12-19",
            venue: "МТС Live Холл",
            address: "Москва, шоссе Энтузиастов, д. 5, стр. 2",
            doorsAt: "2026-12-19T18:00:00+03:00",
            sourceUrl: "https://live.mts.ru/moscow/announcements/kai-angel-day-1",
            ticketUrl: "https://live.mts.ru/moscow/announcements/kai-angel-day-1"
        },
        {
            city: "Москва",
            date: "2026-12-20",
            venue: "МТС Live Холл",
            address: "Москва, шоссе Энтузиастов, д. 5, стр. 2",
            doorsAt: "2026-12-20T18:00:00+03:00",
            sourceUrl: "https://live.mts.ru/moscow/announcements/kai-angel-day-2",
            ticketUrl: "https://live.mts.ru/moscow/announcements/kai-angel-day-2"
        },
{
    city: "Санкт-Петербург",
    date: "2026-12-13",
    venue: "А2",
    address: "Санкт-Петербург, проспект Медиков, 3",
    doorsAt: "2026-12-13T18:00:00+03:00",
sourceUrl: "https://without-events.ru/kai_angel"
},
{
    city: "Санкт-Петербург",
    date: "2026-12-14",
    venue: "А2",
    address: "Санкт-Петербург, проспект Медиков, 3",
    doorsAt: "2026-12-14T18:00:00+03:00",
sourceUrl: "https://without-events.ru/kai_angel"
},
    ];
    concerts.sort((a, b) => a.date.localeCompare(b.date));
const posterDates = document.getElementById("poster-dates");
concerts.forEach(function(concert) {
const dateElement = document.createElement("button");
dateElement.type = "button";
dateElement.className = "poster-date";
dateElement.addEventListener("click", function() {
    const card = document.getElementById(
        "concert-" + concert.date
    );
    if (!card) {
        return;
    }
    if (card.hidden) {
        filterConcerts(concert.city, false);
    }
    card.scrollIntoView({
        behavior: window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches ? "auto" : "smooth",
        block: "start"
    });
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    card.animate(
        [
            { boxShadow: "0 0 0 rgba(255, 32, 32, 0)" },
            { boxShadow: "0 0 35px rgba(255, 32, 32, 0.8)" },
            { boxShadow: "0 0 0 rgba(255, 32, 32, 0)" }
        ],
        {
            duration: 1600,
            easing: "ease-in-out"
        }
    );
}
});
    const citySpan = document.createElement("span");
    citySpan.className = "poster-city";
    citySpan.textContent = concert.city.toUpperCase();
    const dateSpan = document.createElement("span");
    dateSpan.className = "poster-date-value";
    const formattedDate = new Date(
        concert.date + "T12:00:00"
    ).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit"
    });
    dateSpan.textContent = " · " + formattedDate;
    dateElement.append(citySpan, dateSpan);
    posterDates.appendChild(dateElement);
});
    const concertList = document.getElementById("concert-list");
    concertList.textContent = "";
    function renderConcertCard(concert) {
        const item = document.createElement("div");
        item.className = "concert-card";
        item.dataset.city = concert.city;
        item.id = "concert-" + concert.date;
        const title = document.createElement("h2");
        const formattedDate = new Date(
    concert.date + "T12:00:00"
).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric"
});
title.textContent = `${concert.city} · ${formattedDate}`;
        item.appendChild(title);
        const venue = document.createElement("p");
        venue.textContent = concert.venue;
        item.appendChild(venue);
const addressElement = document.createElement("a");
addressElement.className = "address-link";
addressElement.textContent = concert.address;
addressElement.href = "https://yandex.ru/maps/?text=" +
    encodeURIComponent(concert.address);
addressElement.target = "_blank";
addressElement.rel = "noopener noreferrer";
addressElement.style.display = "block";
venue.after(addressElement);
        const timer = document.createElement("p");
        timer.className = "countdown";
        item.appendChild(timer);
        const timerGrid = document.createElement("div");
        timerGrid.className = "timer-grid";
        timerGrid.innerHTML = `
            <div class="timer-box">
                <span>--</span>
                <span>ДНЕЙ</span>
            </div>
            <div class="timer-box">
                <span>--</span>
                <span>ЧАСОВ</span>
            </div>
            <div class="timer-box">
                <span>--</span>
                <span>МИНУТ</span>
            </div>
            <div class="timer-box">
                <span>--</span>
                <span>СЕКУНД</span>
            </div>
        `;
        item.appendChild(timerGrid);
        function updateConcertTimer() {
            const numbers = item.querySelectorAll(".timer-box span:first-child");
            if (!concert.doorsAt) {
                timer.hidden = false;
                timer.textContent = "Время открытия дверей уточняется";
                timerGrid.style.display = "none";
                return;
            }
            const targetDate = new Date(concert.doorsAt);
            const difference = Math.max(0, targetDate - new Date());
            if (difference === 0) {
                timer.hidden = false;
                timer.textContent = "KAI ANGEL CONCERT NOW";
                timerGrid.style.display = "none";
                return;
            }
            timer.hidden = true;
            timerGrid.style.display = "grid";
            const days = Math.floor(difference / 86400000);
            const hours = Math.floor((difference % 86400000) / 3600000);
            const minutes = Math.floor((difference % 3600000) / 60000);
            const seconds = Math.floor((difference % 60000) / 1000);
            if (numbers.length === 4) {
                numbers[0].textContent = days;
                numbers[1].textContent = hours;
                numbers[2].textContent = minutes;
                numbers[3].textContent = seconds;
            }
        }
        updateConcertTimer();
        setInterval(updateConcertTimer, 1000);
        const source = document.createElement("p");
        source.className = "source-link";
        source.textContent = "Источник расписания: ";
        const sourceLink = document.createElement("a");
        sourceLink.href = concert.sourceUrl;
       sourceLink.textContent = concert.city === "Санкт-Петербург"
    ? "Афиша тура"
    : "МТС Live";
        sourceLink.target = "_blank";
        sourceLink.rel = "noopener noreferrer";
        source.appendChild(sourceLink);
        item.appendChild(source);
const ticketLinks = concert.city === "Санкт-Петербург"
    ? [
        {
            name: "Кассир.ру",
            url: "https://spb.kassir.ru/koncert/kai-angel"
        },
        {
            name: concert.date === "2026-12-13"
                ? "Яндекс Афиша"
                : "Организатор · 14 декабря",
            url: concert.date === "2026-12-13"
                ? "https://widget.afisha.yandex.ru/w/sessions/ticketsteam-10847@79962451?clientKey=b7f306d1-2780-490d-a69f-2c2573202ac8&regionId=2"
                : "https://without-events.ru/kaiangel_spb2"
        }
    ]
    : [
        {
            name: "Посмотреть билеты",
            url: concert.ticketUrl
        }
    ];
ticketLinks.forEach(function(ticket) {
    const ticketButton = document.createElement("a");
    ticketButton.href = ticket.url;
    ticketButton.className = "ticket-button";
    ticketButton.textContent = ticket.name;
    ticketButton.target = "_blank";
    ticketButton.rel = "noopener noreferrer";
    item.appendChild(ticketButton);
});
        return item;
    }
    concerts.forEach(function(concert) {
        concertList.appendChild(renderConcertCard(concert));
    });
const cityButtons = document.querySelectorAll(".city-filter");
const cards = document.querySelectorAll("#concert-list .concert-card");
const resultsCount = document.getElementById("results-count");

function filterConcerts(city, animateCards = true) {
    let visibleCount = 0;
    cityButtons.forEach(function(button) {
        const selected = button.dataset.city === city;
        button.classList.toggle("active", selected);
        button.setAttribute("aria-pressed", selected);
    });
    cards.forEach(function(card) {
        const visible = city === "all" || card.dataset.city === city;
        card.hidden = !visible;

        if (visible) {
            visibleCount++;

            if (animateCards &&
                !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                card.animate(
                    [
                        { opacity: 0, transform: "translateY(12px)" },
                        { opacity: 1, transform: "translateY(0)" }
                    ],
                    {
                        duration: 300,
                        easing: "ease-out"
                    }
                );
            }
        }
    });
    resultsCount.textContent = "Найдено концертов: " + visibleCount;
}
cityButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        filterConcerts(button.dataset.city);
    });
});
filterConcerts("all", false);
const backToPoster = document.getElementById("back-to-poster");
const posterSection = document.querySelector(".tour-poster");

function updateBackToPoster() {
    backToPoster.hidden = document.body.scrollTop < 450;
}
document.body.addEventListener("scroll", updateBackToPoster, {
    passive: true
});
backToPoster.addEventListener("click", function() {
    posterSection.scrollIntoView({
        behavior: window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches ? "auto" : "smooth",
        block: "start"
    });
});
updateBackToPoster();
const tripOrigin = document.getElementById("trip-origin");
const tripConcert = document.getElementById("trip-concert");
const tripTransport = document.getElementById("trip-transport");
const tripBuild = document.getElementById("trip-build");
const tripResult = document.getElementById("trip-result");
const tripDate = document.getElementById("trip-date");
const tripArrival = document.getElementById("trip-arrival");
const arrivalDetails = document.getElementById("arrival-details");
const arrivalRouteButton = document.getElementById("arrival-route");
const arrivalPlaceholders = {
    train: "Например, Курский вокзал",
    bus: "Например, Центральный автовокзал",
    plane: "Например, аэропорт Шереметьево"
};
function updateArrivalPlaceholder() {
    tripArrival.placeholder =
        arrivalPlaceholders[tripTransport.value];
}
tripTransport.addEventListener("change", updateArrivalPlaceholder);
updateArrivalPlaceholder();
const transportNames = {
    train: "Поезд",
    bus: "Автобус",
    plane: "Самолёт"
};
concerts.forEach(function(concert) {
    const option = document.createElement("option");
    const date = new Date(
        concert.date + "T12:00:00"
    ).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long"
    });
    option.value = concert.date;
    option.textContent = `${concert.city} · ${date} · ${concert.venue}`;
    tripConcert.appendChild(option);
});
const concertPicker = document.getElementById("concert-picker");
const concertPickerValue = document.getElementById("concert-picker-value");
const concertPickerOptions = document.getElementById("concert-picker-options");
const concertPickerSummary = concertPicker.querySelector("summary");
const concertOptionButtons = [];
Array.from(tripConcert.options).forEach(function(option) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "concert-option";
    button.textContent = option.textContent;
    button.addEventListener("click", function() {
        tripConcert.value = option.value;

        tripConcert.dispatchEvent(
            new Event("change", { bubbles: true })
        );
        concertPicker.open = false;
        concertPickerSummary.focus();
    });
    concertPickerOptions.appendChild(button);
    concertOptionButtons.push(button);
});
function updateConcertPicker() {
    const selected = tripConcert.selectedOptions[0];

    concertPickerValue.textContent = selected
        ? selected.textContent
        : "Выбери концерт";

    concertOptionButtons.forEach(function(button, index) {
        const isSelected =
            tripConcert.options[index].value === tripConcert.value;

        button.setAttribute("aria-pressed", isSelected);
    });
}
tripConcert.addEventListener("change", updateConcertPicker);
concertPicker.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && concertPicker.open) {
        concertPicker.open = false;
        concertPickerSummary.focus();
        return;
    }
    if (!concertPicker.open &&
        (event.key === "ArrowDown" || event.key === "ArrowUp")) {
        event.preventDefault();
        concertPicker.open = true;

        const selectedIndex = tripConcert.selectedIndex;
        concertOptionButtons[Math.max(selectedIndex, 0)].focus();
        return;
    }
    if (!concertPicker.open) {
        return;
    }
    const index = concertOptionButtons.indexOf(document.activeElement);
    let nextIndex = index;
    if (event.key === "ArrowDown") {
        nextIndex = (index + 1) % concertOptionButtons.length;
    } else if (event.key === "ArrowUp") {
        nextIndex = (index - 1 + concertOptionButtons.length)
            % concertOptionButtons.length;
    } else if (event.key === "Home") {
        nextIndex = 0;
    } else if (event.key === "End") {
        nextIndex = concertOptionButtons.length - 1;
    } else {
        return;
    }
    event.preventDefault();
    concertOptionButtons[nextIndex].focus();
});
document.addEventListener("click", function(event) {
    if (!concertPicker.contains(event.target)) {
        concertPicker.open = false;
    }
});
updateConcertPicker();
function formatTripDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}
const tripDatePicker = typeof flatpickr === "function"
    ? flatpickr(tripDate, {
        locale: "ru",
        dateFormat: "Y-m-d",
        altInput: true,
        altFormat: "d.m.Y",
        disableMobile: true,
        static: true,
        monthSelectorType: "static"
    })
    : null;
function suggestTripDate() {
    const concert = concerts.find(function(item) {
        return item.date === tripConcert.value;
    });
    if (!concert) {
        return;
    }
    const today = formatTripDate(new Date());
    const suggested = new Date(concert.date + "T12:00:00");
    suggested.setDate(suggested.getDate() - 1);
    const suggestedDate = formatTripDate(suggested);
    tripDate.min = today;
    tripDate.max = concert.date;
    if (tripDatePicker) {
        tripDatePicker.set("minDate", today);
        tripDatePicker.set("maxDate", concert.date);
        tripDatePicker.setDate(suggestedDate, false);
    } else {
        tripDate.value = suggestedDate;
    }
}
tripConcert.addEventListener("change", suggestTripDate);
suggestTripDate();
tripBuild.addEventListener("click", function() {
    const origin = tripOrigin.value.trim();
    const concert = concerts.find(function(item) {
        return item.date === tripConcert.value;
    });
    if (!origin) {
        tripOrigin.focus();
        tripResult.hidden = false;
        tripResult.textContent = "Сначала введи город отправления.";
        return;
    }
    if (!concert) {
        return;
    }
    const title = document.createElement("h3");
    title.textContent = `${origin} → ${concert.city}`;
const ticketServices = {
    train: {
        url: "https://ticket.rzd.ru/",
        text: "Открыть билеты РЖД"
    },
    bus: {
        url: "https://bus.tutu.ru/",
        text: "Найти автобус на Туту"
    },
    plane: {
        url: "https://www.aviasales.ru/",
        text: "Найти авиабилет"
    }
};
const selectedService = ticketServices[tripTransport.value];
const normalizedOrigin = origin
    .toLowerCase()
    .replaceAll("ё", "е")
    .replace(/\s+/g, " ")
    .trim();
const airportCodes = {
    "москва": "MOW",
    "санкт-петербург": "LED",
    "казань": "KZN",
    "екатеринбург": "SVX",
    "новосибирск": "OVB",
    "сочи": "AER"
};
const busRoutes = {
    "старый оскол|Москва":
        "https://bus.tutu.ru/raspisanie/gorod_Staryj-Oskol/gorod_Moskva/",
    "старый оскол|Санкт-Петербург":
        "https://bus.tutu.ru/raspisanie/gorod_Staryj-Oskol/gorod_Sankt-Peterburg/"
};
let ticketUrl = selectedService.url;
let ticketHint = "";
if (tripTransport.value === "plane") {
    const fromCode = airportCodes[normalizedOrigin];
    const toCode = airportCodes[concert.city.toLowerCase()];

    if (fromCode && toCode) {
        const day = tripDate.value.slice(8, 10);
        const month = tripDate.value.slice(5, 7);

        ticketUrl = "https://www.aviasales.ru/?params=" +
            fromCode + day + month + toCode + "1";

        ticketHint = "Проверь заполненные города и дату вылета.";
    } else {
        ticketHint =
            "Указанный город не поддерживается автозаполнением авиапоиска. Выбери подходящий аэропорт вручную.";
    }
}
if (tripTransport.value === "bus") {
    const routeKey = normalizedOrigin + "|" + concert.city;
    if (busRoutes[routeKey]) {
        ticketUrl = busRoutes[routeKey];
        ticketHint =
            "Направление выбрано. Укажи дату и проверь пересадки.";
    } else {
        ticketHint =
            "На Туту нужно выбрать города и дату вручную.";
    }
}
if (tripTransport.value === "train") {
    ticketHint =
        "На сайте РЖД выбери станции и дату отправления.";
}
const scheduleLink = document.createElement("a");
scheduleLink.href = ticketUrl;
scheduleLink.textContent = selectedService.text;
scheduleLink.target = "_blank";
scheduleLink.rel = "noopener noreferrer";
    const venue = document.createElement("p");
    venue.textContent = `Площадка: ${concert.venue}`;
    const address = document.createElement("p");
    address.textContent = `Адрес: ${concert.address}`;
    const transport = document.createElement("p");
    transport.textContent =
        `Выбран транспорт: ${transportNames[tripTransport.value]}`;
  const notice = document.createElement("p");
notice.textContent = ticketHint;
    const mapLink = document.createElement("a");
    mapLink.href = "https://yandex.ru/maps/?rtext=" +
        encodeURIComponent(origin) + "~" +
        encodeURIComponent(concert.address);
    mapLink.textContent = "Открыть маршрут на карте";
    mapLink.target = "_blank";
    mapLink.rel = "noopener noreferrer";
const departureDate = document.createElement("p");
departureDate.textContent =
    "Дата отправления: " +
    new Date(tripDate.value + "T12:00:00")
        .toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    tripResult.replaceChildren(
    title,
    venue,
    address,
    transport,
    departureDate,
    notice,
    mapLink,
    scheduleLink
);
const copyTripButton = document.createElement("button");
copyTripButton.type = "button";
copyTripButton.className = "trip-copy";
copyTripButton.textContent = "Скопировать данные поездки";
copyTripButton.addEventListener("click", async function() {
    const tripInfo = [
        `Откуда: ${origin}`,
        `Куда: ${concert.city}`,
        `Дата отправления: ${tripDate.value}`,
        `Площадка: ${concert.venue}`,
        `Адрес: ${concert.address}`
    ].join("\n");
    try {
        await navigator.clipboard.writeText(tripInfo);
        copyTripButton.textContent = "Скопировано!";
    } catch {
        copyTripButton.textContent = "Не удалось скопировать";
    }
});
tripResult.appendChild(copyTripButton);
tripResult.hidden = false;
arrivalDetails.hidden = false;
arrivalDetails.open = false;
});
arrivalRouteButton.addEventListener("click", function() {
    const arrival = tripArrival.value.trim();
    if (!arrival) {
        tripArrival.focus();
        return;
    }
    const concert = concerts.find(function(item) {
        return item.date === tripConcert.value;
    });
    if (!concert) {
        return;
    }
    const startPoint = concert.city + ", " + arrival;
    const mapUrl =
        "https://yandex.ru/maps/?rtext=" +
        encodeURIComponent(startPoint) +
        "~" +
        encodeURIComponent(concert.address);
    window.open(mapUrl, "_blank", "noopener,noreferrer");
routeReviewed.hidden = false;
routeTiming.hidden = true;
});
const arrivalTime = document.getElementById("arrival-time");
const arrivalTimeResult = document.getElementById("arrival-time-result");
const travelMinutesInput = document.getElementById("arrival-travel-minutes");
const bufferMinutesInput = document.getElementById("arrival-buffer-minutes");
const arrivalDateTimePicker = typeof flatpickr === "function"
    ? flatpickr(arrivalTime, {
        locale: "ru",
        enableTime: true,
        time_24hr: true,
        minuteIncrement: 1,
        dateFormat: "Y-m-d\\TH:i",
        altInput: true,
        altFormat: "d.m.Y H:i",
        monthSelectorType: "static",
        disableMobile: true,
        static: true,
        onChange: function() {
            calculateArrivalTime();
        }
    })
    : null;
function formatDuration(totalMinutes) {
    const days = Math.floor(totalMinutes / 1440);
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const minutes = totalMinutes % 60;
    return `${days} д. ${hours} ч. ${minutes} мин.`;
}
function calculateArrivalTime() {
    const concert = concerts.find(function(item) {
        return item.date === tripConcert.value;
    });

    if (!concert || !concert.doorsAt || !arrivalTime.value) {
        arrivalTimeResult.textContent =
            "Укажи дату и время прибытия.";
        return;
    }
    const arrival = new Date(arrivalTime.value + ":00+03:00");
    const concertTime = new Date(concert.doorsAt);
    const minutesLeft = Math.floor(
        (concertTime - arrival) / 60000
    );
    const travelMinutes = Number(travelMinutesInput.value);
    const bufferMinutes = Number(bufferMinutesInput.value);
    if (
        !Number.isFinite(minutesLeft) ||
        travelMinutesInput.value === "" ||
        bufferMinutesInput.value === "" ||
        !Number.isFinite(travelMinutes) ||
        !Number.isFinite(bufferMinutes) ||
        travelMinutes < 0 ||
        bufferMinutes < 0
    ) {
        arrivalTimeResult.textContent =
            "Проверь дату и количество минут.";
        return;
    }
    if (minutesLeft <= 0) {
        arrivalTimeResult.textContent =
            "Ты прибываешь слишком поздно.";
        return;
    }
    const afterTravel = minutesLeft - travelMinutes;
    const freeTime = afterTravel - bufferMinutes;
    if (afterTravel < 0) {
        arrivalTimeResult.textContent =
            "Не хватает времени на дорогу: " +
            formatDuration(Math.abs(afterTravel));
    } else if (freeTime < 0) {
        arrivalTimeResult.textContent =
            "До указанного времени можно успеть, но для запланированного запаса не хватает: " +
            formatDuration(Math.abs(freeTime));
    } else {
        arrivalTimeResult.textContent =
            "После дороги и запланированного запаса останется: " +
            formatDuration(freeTime);
    }
}
arrivalTime.addEventListener("change", calculateArrivalTime);
travelMinutesInput.addEventListener("input", calculateArrivalTime);
bufferMinutesInput.addEventListener("input", calculateArrivalTime);
tripConcert.addEventListener("change", function() {
    if (arrivalDateTimePicker) {
        arrivalDateTimePicker.clear();
    } else {
        arrivalTime.value = "";
    }
    arrivalTimeResult.textContent = "";
});
const routeReviewed = document.getElementById("route-reviewed");
const routeTiming = document.getElementById("route-timing");
function resetRouteReview() {
    routeReviewed.hidden = true;
    routeTiming.hidden = true;
}
routeReviewed.addEventListener("click", function() {
    routeTiming.hidden = false;
    routeReviewed.hidden = true;
    calculateArrivalTime();
});
tripArrival.addEventListener("input", resetRouteReview);
tripConcert.addEventListener("change", resetRouteReview);
tripBuild.addEventListener("click", resetRouteReview);
const transportPicker = document.getElementById("transport-picker");
const transportPickerValue = document.getElementById("transport-picker-value");
const transportPickerOptions = document.getElementById("transport-picker-options");
const transportPickerSummary = transportPicker.querySelector("summary");
const transportOptionButtons = [];
const transportOptions = [
    {
        value: "train",
        label: "Поезд",
        icon: `
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="7" y="3" width="10" height="12" rx="2"></rect>
                <path d="M9 7h2"></path>
                <path d="M13 7h2"></path>
                <path d="M8 15h8"></path>
                <path d="M9 19l-2 2"></path>
                <path d="M15 19l2 2"></path>
                <circle cx="9" cy="12" r="1"></circle>
                <circle cx="15" cy="12" r="1"></circle>
            </svg>
        `
    },
    {
        value: "bus",
        label: "Автобус",
        icon: `
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="2" y="5" width="20" height="13" rx="2"></rect>
                <path d="M2 12h20"></path>
                <path d="M9 5v7"></path>
                <path d="M16 5v7"></path>
                <circle cx="7" cy="18" r="2"></circle>
                <circle cx="18" cy="18" r="2"></circle>
            </svg>
        `
    },
    {
        value: "plane",
        label: "Самолёт",
        icon: `
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                    d="M12 2
                       C11.2 2 10.6 2.7 10.6 3.5
                       V10 L4 14 V16 L10.6 14
                       V18 L8.6 19.5 V21
                       L12 20 L15.4 21 V19.5
                       L13.4 18 V14 L20 16 V14
                       L13.4 10 V3.5
                       C13.4 2.7 12.8 2 12 2Z"
                    fill="currentColor"
                    stroke="none"
                ></path>
            </svg>
        `
    }
]
Array.from(tripTransport.options).forEach(function(option) {
    const button = document.createElement("button");
const transportInfo = transportOptions.find(function(item) {
    return item.value === option.value;
});
const icon = transportInfo ? transportInfo.icon : "";
    button.type = "button";
    button.className = "concert-option transport-option-button";
button.innerHTML = `
    <span class="transport-icon">${icon}</span>
    <span class="transport-option-label">${option.textContent}</span>
`;
    button.addEventListener("click", function() {
        tripTransport.value = option.value;
        tripTransport.dispatchEvent(
            new Event("change", { bubbles: true })
        );
        transportPicker.open = false;
        transportPickerSummary.focus();
    });
    transportPickerOptions.appendChild(button);
    transportOptionButtons.push(button);
});
function updateTransportPicker() {
    const selectedTransport = transportOptions.find(function(item) {
        return item.value === tripTransport.value;
    });
    if (selectedTransport) {
        transportPickerValue.innerHTML = `
            <span class="transport-icon">${selectedTransport.icon}</span>
            <span>${selectedTransport.label}</span>
        `;
    } else {
        transportPickerValue.textContent = "Выбери транспорт";
    }
    transportOptionButtons.forEach(function(button, index) {
        const isSelected =
            tripTransport.options[index].value === tripTransport.value;
        button.setAttribute("aria-pressed", isSelected);
    });
}
tripTransport.addEventListener("change", updateTransportPicker);
transportPicker.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && transportPicker.open) {
        transportPicker.open = false;
        transportPickerSummary.focus();
        return;
    }
    if (!transportPicker.open &&
        (event.key === "ArrowDown" || event.key === "ArrowUp")) {
        event.preventDefault();
        transportPicker.open = true;
        transportOptionButtons[Math.max(tripTransport.selectedIndex, 0)].focus();
        return;
    }
    if (!transportPicker.open) {
        return;
    }
    const index = transportOptionButtons.indexOf(document.activeElement);
    let nextIndex = index;
    if (event.key === "ArrowDown") {
        nextIndex = (index + 1) % transportOptionButtons.length;
    } else if (event.key === "ArrowUp") {
        nextIndex = (index - 1 + transportOptionButtons.length)
            % transportOptionButtons.length;
    } else if (event.key === "Home") {
        nextIndex = 0;
    } else if (event.key === "End") {
        nextIndex = transportOptionButtons.length - 1;
    } else {
        return;
    }
    event.preventDefault();
    transportOptionButtons[nextIndex].focus();
});
document.addEventListener("click", function(event) {
    if (!transportPicker.contains(event.target)) {
        transportPicker.open = false;
    }
});
updateTransportPicker();