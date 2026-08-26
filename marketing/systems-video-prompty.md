# Промпты для видео — блок «Подход», AIVFX

Всё готово для Higgsfield в браузере. Модель — **Seedance 2.5**.

---

## Настройки, которые надо выставить руками

Это не мелочи, на них ролик и ломается:

| Параметр | Значение | Почему именно так |
|---|---|---|
| Aspect ratio | **3:4** | Ставить явно. `auto` роняет задание целиком, проверено |
| Resolution | **1080p** | Максимум у модели |
| Duration | **10 сек** | На 5 секундах пролёт не успевает раскрыться |
| Prompt language | **EN** | По умолчанию там **китайский**, промпт молча поедет |
| Multi shots | **выключить** | Он ставит склейки, а нам нужен один кадр |
| Generate audio | **выключить** | На сайте ролик перематывается прокруткой и всегда без звука |
| Genre | auto | `epic` добавляет пафосной драмы, здесь она лишняя |

Референсы прикладывать **как обычные reference images**, не как start/end frame.

---

## 1. Флоу заявки — основной ролик

Референс: `1-flow-zayavka/flow-zayavka-RU.png` (для русской версии)
и `flow-zayavka-EN.png` (для английской).

Можно добавить вторым референсом кадр из папки `2-uzkoe-mesto` — он задаст
фактуру фона.

### Русская версия

```
Single continuous FPV camera flight through a dark three-dimensional space filled with floating interface cards, one unbroken take with no cuts and no transitions. The camera drives forward, banks around the first card reading НОВАЯ ЗАЯВКА, then races along a glowing cobalt blue connector line that draws itself ahead of the camera. It sweeps up to the КВАЛИФИКАЦИЯ card where one option row lights up in cobalt, then dives down along the connector to the ПЕРЕДАЧА В CRM card and pushes past it into depth. Cards have real thickness and parallax, their edges catching light as the camera passes. Fine contour topography drifts far behind everything. Cobalt blue accent on near-black, clean geometric sans-serif type, premium motion design. Energetic constant motion, fast travel along the connectors with a crisp settle at each card. All text stays in Russian Cyrillic and remains sharp and correct.
```

### Английская версия

```
Single continuous FPV camera flight through a dark three-dimensional space filled with floating interface cards, one unbroken take with no cuts and no transitions. The camera drives forward, banks around the first card reading NEW LEAD, then races along a glowing cobalt blue connector line that draws itself ahead of the camera. It sweeps up to the QUALIFY card where one option row lights up in cobalt, then dives down along the connector to the SEND TO CRM card and pushes past it into depth. Cards have real thickness and parallax, their edges catching light as the camera passes. Fine contour topography drifts far behind everything. Cobalt blue accent on near-black, clean geometric sans-serif type, premium motion design. Energetic constant motion, fast travel along the connectors with a crisp settle at each card. All text stays in English and remains sharp and correct.
```

---

## 2. Узкое место — второй ролик

Референс: `2-uzkoe-mesto/uzkoe-mesto-RU.png` или `-EN.png`.

### Русская версия

```
Single continuous camera move across a dark landscape of fine contour topography lines, one unbroken take with no cuts. The camera glides low over the relief, rises to meet a floating card reading УЗКОЕ МЕСТО, and pushes in close as one row in its list pulses cobalt blue and stalls. The camera then banks and follows a cobalt connector line that snakes downward through depth to a second card reading ПЕРЕСОБРАНО, where a row of small bars fills up evenly left to right. Cards have real thickness and parallax, the topography drifts beneath with genuine depth. Cobalt blue accent on near-black, clean geometric sans-serif type, premium motion design. Continuous confident motion, no hesitation. All text stays in Russian Cyrillic and remains sharp and correct.
```

### Английская версия

```
Single continuous camera move across a dark landscape of fine contour topography lines, one unbroken take with no cuts. The camera glides low over the relief, rises to meet a floating card reading BOTTLENECK, and pushes in close as one row in its list pulses cobalt blue and stalls. The camera then banks and follows a cobalt connector line that snakes downward through depth to a second card reading REBUILT, where a row of small bars fills up evenly left to right. Cards have real thickness and parallax, the topography drifts beneath with genuine depth. Cobalt blue accent on near-black, clean geometric sans-serif type, premium motion design. Continuous confident motion, no hesitation. All text stays in English and remains sharp and correct.
```

---

## 3. Ветвление — если понадобится третий

Референс: `3-vetvlenie/vetvlenie-RU.png` или `-EN.png`.

```
Single continuous camera move through dark depth, one unbroken take with no cuts. The camera approaches a card reading НОВАЯ ЗАЯВКА, then a cobalt blue connector splits into three branches that draw themselves outward. The camera follows the branches and glides past three cards reading КВАЛИФИКАЦИЯ, ОБОГАЩЕНИЕ and ПЕРЕДАЧА В CRM, each lighting up in turn as the camera passes. Cards have real thickness and parallax, soft contour topography far behind. Cobalt blue accent on near-black, clean geometric sans-serif type, premium motion design. Constant forward motion, energetic and precise. All text stays in Russian Cyrillic and remains sharp and correct.
```

Для английской: `NEW LEAD`, `QUALIFY`, `ENRICH`, `SEND TO CRM`,
и в конце `All text stays in English`.

---

## 4. Ниши — если захочешь ролики под каждую

Папка `4-nishi`, восемь файлов: четыре ниши × два языка.

```
Single continuous camera move in dark depth, one unbroken take with no cuts. The camera drifts around a large central photograph card while smaller interface widget cards float in front of it at different depths, sliding past with strong parallax. Numbers on the widgets count up as the camera passes them. The camera settles on the solid cobalt blue widget last. Faint dot grid far behind. Cobalt blue accent on near-black, clean geometric sans-serif type, premium motion design. Smooth confident motion, never static. All text stays sharp and correct.
```

---

## 5. Поиск решения — короткая вставка

Папка `5-poisk`. Годится как заставка на 3–5 секунд.

```
Single continuous camera push toward a dark rounded command input floating in black space, one unbroken take with no cuts. A cobalt blue glow behind the pill breathes and grows as the camera approaches, the caret blinks, the grid of dark squares drifts with parallax. Nothing else in frame. Cobalt blue accent on near-black, premium minimal motion design. Smooth accelerating push-in. All text stays sharp and correct.
```

---

## Что делать с готовыми роликами

1. Кинь файл в корень проекта `aivfx` — как делал с роликом про часы.
2. Скажи мне, я прогоню через `scripts/prepare-reel.js`: он режет вес,
   ставит опорные кадры для перемотки прокруткой и снимает постер.
3. Русская версия ложится под базовым именем, английская с суффиксом `-en` —
   сайт сам подставит нужную по языку страницы. Механизм уже написан
   и проверен.

## Про цифры на карточках

`128 заявок`, `94%`, `4 сек` — выдуманные, для композиции. В дизайн-доке
сайта прямо записано: никаких выдуманных метрик. Перед публикацией их
надо либо заменить на реальные, либо убрать числа и оставить подписи.
