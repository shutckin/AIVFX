#!/bin/sh
# Отчёт по кликам на партнёрские ссылки (aivfx.ru/go/syntx).
# Журнал пишет nginx на сервере: /var/log/aivfx-partner/clicks.log.
#
# Журнал считает ВСЕ заходы на /go/syntx, в том числе роботов, и роботы там
# преобладают: на 16.10.2026 из 173 записей на живых людей тянули около 7.
# Поэтому отчёт делит записи на четыре группы и честно показывает, сколько из
# них вероятно люди:
#   1) роботы по названию (Meta, PetalBot, curl и т.п.);
#   2) устаревшие браузеры: роботы маскируются под Chrome/Firefox
#      полугодовой давности, живые люди обновляются;
#   3) обход ссылок: один и тот же браузер за сутки кликнул по 5 и более
#      разным ссылкам, человек так не делает;
#   4) тестовые метки (from=test...).
# Остаток это «вероятно люди». Это оценка, а не точный счёт.
#
# Метки каналов: ссылки для YouTube, Telegram и соцсетей ставим как
#   https://aivfx.ru/go/syntx?from=youtube.<ролик>   (или telegram.<пост>, instagram.<пост>)
# Сервер ничего менять не требует: он пишет в журнал любое значение from.
#
# Запуск: sh scripts/partner-clicks.sh        - всё время
#         sh scripts/partner-clicks.sh 7      - за последние 7 дней
#         sh scripts/partner-clicks.sh 0 all  - дополнительно показать все группы по строкам
DAYS="${1:-0}"
SHOW_ALL="${2:-}"
ssh -o ConnectTimeout=10 -i ~/.ssh/id_ed25519 root@62.192.174.91 'cat /var/log/aivfx-partner/clicks.log' | DAYS="$DAYS" SHOW_ALL="$SHOW_ALL" python3 -c "
import sys, re, os, collections, datetime
days = int(os.environ['DAYS'])
show_all = bool(os.environ.get('SHOW_ALL'))
since = datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(days=days) if days else None

NAME_BOT = re.compile(r'bot|crawl|spider|slurp|preview|curl|python|wget|headless|scan|facebookexternal|meta-webindexer|petalbot|semrush|ahrefs|go-http|okhttp|monitor|uptime|axios|node-fetch|java/|libwww|telegram|whatsapp|discord|slack|yandex|bingpreview|claude|gpt|perplexity', re.I)
CHANNEL = re.compile(r'^(youtube|yt|telegram|tg|instagram|ig|threads|reddit|vk|dzen)(\.|$)', re.I)

rows = []
for line in sys.stdin:
    m = re.match(r'(\S+) from=(\S*) country=(\S*) ref=\"([^\"]*)\" ua=\"([^\"]*)\"', line)
    if not m: continue
    t, src, country, ref, ua = m.groups()
    when = datetime.datetime.fromisoformat(t)
    if since and when < since: continue
    rows.append({'when': when, 'src': src or '(без метки)', 'ref': ref, 'ua': ua})

# самая свежая версия браузера, которую встретили в журнале: от неё считаем «устаревшее»
def major(rx, ua):
    m = re.search(rx, ua)
    return int(m.group(1)) if m else None
chrome_max = max([major(r'Chrome/(\d+)', r['ua']) or 0 for r in rows] + [0])
firefox_max = max([major(r'Firefox/(\d+)', r['ua']) or 0 for r in rows] + [0])

def stale(ua):
    c, f = major(r'Chrome/(\d+)', ua), major(r'Firefox/(\d+)', ua)
    if c is not None and chrome_max and c < chrome_max - 3: return True
    if f is not None and firefox_max and f < firefox_max - 3: return True
    if re.search(r'iPhone OS 1[0-5]_|CrOS|Android [1-8][.;]|MSIE|Windows NT [56]\.', ua): return True
    return False

groups = collections.defaultdict(list)
# обход: один браузер в один день по 5+ разным ссылкам
per = collections.defaultdict(set)
for r in rows: per[(r['when'].date(), r['ua'])].add(r['src'])
for r in rows:
    if r['src'].lower().startswith('test'):               g = 'тестовые метки'
    elif NAME_BOT.search(r['ua']):                        g = 'роботы по названию'
    elif stale(r['ua']):                                  g = 'устаревший браузер (подделка)'
    elif len(per[(r['when'].date(), r['ua'])]) >= 5:      g = 'обход ссылок (скан)'
    else:                                                 g = 'вероятно люди'
    groups[g].append(r)

total = len(rows)
people = groups['вероятно люди']
print('Журнал кликов по SYNTX' + (f' за {days} дн.' if days else ' за всё время') + f': {total} записей')
print()
for g in ['вероятно люди', 'обход ссылок (скан)', 'устаревший браузер (подделка)', 'роботы по названию', 'тестовые метки']:
    print(f'  {len(groups[g]):>4}  {g}')
print()
print(f'Вероятно людей: {len(people)} из {total} ({100*len(people)//total if total else 0}%). Это оценка по признакам браузера, не точный счёт.')
if not people:
    sys.exit()

ch = [r for r in people if CHANNEL.match(r['src'])]
if ch:
    print()
    print('Из ваших каналов (метки youtube/telegram/...):')
    for src, n in collections.Counter(r['src'] for r in ch).most_common():
        print(f'  {n:>4}  {src}')

print()
print('Вероятные люди по статьям и месту ссылки:')
for src, n in collections.Counter(r['src'] for r in people).most_common(15):
    print(f'  {n:>4}  {src}')
print()
print('Вероятные люди по дням:')
for d, n in sorted(collections.Counter(r['when'].strftime('%d.%m') for r in people).items()):
    print(f'  {d}  {n}')
print()
print('Последние 10 вероятных людей:')
for r in people[-10:]:
    print(f\"  {r['when']:%d.%m %H:%M}  {r['src']}\")
if show_all:
    for g in ['обход ссылок (скан)', 'устаревший браузер (подделка)', 'роботы по названию']:
        print(); print(f'--- {g}')
        for r in groups[g][-15:]:
            print(f\"  {r['when']:%d.%m %H:%M}  {r['src']}  | {r['ua'][:70]}\")
"
