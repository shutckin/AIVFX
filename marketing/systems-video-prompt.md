# Промпт для ролика «Подход» — AIVFX

Один непрерывный пролёт через все пять этапов. Никаких склеек.
Модель — **Seedance 2.5**, генерить два раза: русскую версию и английскую.

---

## Настройки

Пять пунктов, на которых генерация ломается молча:

| Параметр | Значение | Почему |
|---|---|---|
| Aspect ratio | **3:4** | Ставить явно. `auto` роняет задание целиком |
| Resolution | **1080p** | Максимум у модели |
| Duration | **10 сек** | На 5 пролёт не успевает пройти пять этапов |
| Prompt language | **EN** | По умолчанию китайский, промпт молча уедет |
| Multi shots | **выключить** | Иначе модель сама нарежет склейки |
| Generate audio | **выключить** | На сайте ролик немой, им управляет прокрутка |

**Референсы:** приложить все пять кадров из папки разом, обычными
reference images. Не как первый и последний кадр — это другой режим,
он даст переход между двумя картинками вместо пролёта.

Русскую версию генерить с кадрами из `RU/`, английскую — из `EN/`.

---

## Русская версия

Референсы: все пять файлов из папки `RU/`.

```
One single unbroken FPV camera flight through a dark three-dimensional space, no cuts, no transitions, one continuous take from first frame to last. The camera starts pushing toward a floating dark command input where a cobalt blue glow breathes behind it, then accelerates straight through it into depth. It emerges low over a vast landscape of fine contour topography lines, banks hard and rises to a floating card reading УЗКОЕ МЕСТО where one row in its list pulses cobalt and stalls. The camera whips past it and follows a cobalt blue connector line that draws itself ahead, splitting into three branches that sweep past cards reading КВАЛИФИКАЦИЯ, ОБОГАЩЕНИЕ and ПЕРЕДАЧА В CRM, each lighting up as it passes. The connector pulls the camera down and forward into a descending staircase of cards reading НОВАЯ ЗАЯВКА, КВАЛИФИКАЦИЯ and ПЕРЕДАЧА В CRM, threading between them with strong parallax. Finally the camera pulls back to reveal a photograph card with interface widgets floating in front of it, numbers counting up, settling on a solid cobalt widget reading ОТВЕТ 4 СЕК. Cards have real thickness and edges catching light, deep parallax throughout, faint dot grid and topography drifting far behind. Cobalt blue accent on near-black, clean geometric sans-serif type, premium motion design. Energetic constant motion, fast travel along connectors with a crisp settle at each card. All text stays in Russian Cyrillic and remains sharp and correct.
```

---

## Английская версия

Референсы: все пять файлов из папки `EN/`.

```
One single unbroken FPV camera flight through a dark three-dimensional space, no cuts, no transitions, one continuous take from first frame to last. The camera starts pushing toward a floating dark command input where a cobalt blue glow breathes behind it, then accelerates straight through it into depth. It emerges low over a vast landscape of fine contour topography lines, banks hard and rises to a floating card reading BOTTLENECK where one row in its list pulses cobalt and stalls. The camera whips past it and follows a cobalt blue connector line that draws itself ahead, splitting into three branches that sweep past cards reading QUALIFY, ENRICH and SEND TO CRM, each lighting up as it passes. The connector pulls the camera down and forward into a descending staircase of cards reading NEW LEAD, QUALIFY and SEND TO CRM, threading between them with strong parallax. Finally the camera pulls back to reveal a photograph card with interface widgets floating in front of it, numbers counting up, settling on a solid cobalt widget reading RESPONSE 4 SEC. Cards have real thickness and edges catching light, deep parallax throughout, faint dot grid and topography drifting far behind. Cobalt blue accent on near-black, clean geometric sans-serif type, premium motion design. Energetic constant motion, fast travel along connectors with a crisp settle at each card. All text stays in English and remains sharp and correct.
```

---

## Если 10 секунд мало

Пролёт плотный, пять этапов за десять секунд идут быстро. Если захочешь
длиннее — генерить кусками в режиме `video_extension`: каждый следующий
отрезок продолжает предыдущий кадр в кадр, склейки не появляется.
Так делали ролик с часами.

---

## Что дальше

Кинь готовые файлы в корень проекта `aivfx`, скажи мне — прогоню через
`scripts/prepare-reel.js`. Он режет вес, ставит опорные кадры для
перемотки прокруткой и снимает постер. Русская версия ляжет под базовым
именем, английская с суффиксом `-en`, сайт подставит нужную сам.

**Про цифры.** `4 сек`, `128`, `94%` — выдуманные, для композиции.
В дизайн-доке сайта записано: выдуманных метрик быть не должно. Перед
публикацией заменить на реальные или убрать числа.
