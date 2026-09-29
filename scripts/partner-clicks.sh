#!/bin/sh
# Отчёт по кликам на партнёрские ссылки (aivfx.ru/go/syntx).
# Журнал пишет nginx на сервере: /var/log/aivfx-partner/clicks.log.
# Боты и сканеры отсеиваются по браузеру; страна - по Cloudflare.
# Запуск: sh scripts/partner-clicks.sh        - все клики
#         sh scripts/partner-clicks.sh 7      - за последние 7 дней
DAYS="${1:-0}"
ssh -o ConnectTimeout=10 -i ~/.ssh/id_ed25519 root@62.192.174.91 'cat /var/log/aivfx-partner/clicks.log' | python3 -c "
import sys, re, collections, datetime
days = int('$DAYS')
since = datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(days=days) if days else None
bots = re.compile(r'bot|crawl|spider|preview|curl|python|headless|facebookexternal|telegram', re.I)
rows = []
for line in sys.stdin:
    m = re.match(r'(\S+) from=(\S*) country=(\S*) ref=\"([^\"]*)\" ua=\"([^\"]*)\"', line)
    if not m: continue
    t, src, country, ref, ua = m.groups()
    when = datetime.datetime.fromisoformat(t)
    if since and when < since: continue
    if bots.search(ua): continue
    rows.append((when, src or '(без метки)', country or '?'))
print(f'Кликов по SYNTX: {len(rows)}' + (f' за {days} дн.' if days else ' за всё время'))
if not rows: sys.exit()
print()
print('По статьям и месту на странице:')
for src, n in collections.Counter(r[1] for r in rows).most_common():
    print(f'  {n:>4}  {src}')
print()
print('По странам:', ', '.join(f'{c} {n}' for c, n in collections.Counter(r[2] for r in rows).most_common()))
print()
print('Последние 10:')
for when, src, country in rows[-10:]:
    print(f'  {when:%d.%m %H:%M}  {country}  {src}')
"
