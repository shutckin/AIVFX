#!/bin/bash
# Делает webp-версии картинок блога: полноразмерную и узкую под телефоны.
#
# Зачем: jpg-обложка весит около 150 КБ, и на мобильном интернете именно она
# держит отрисовку первого экрана. WebP того же качества весит вдвое меньше,
# а телефону вдобавок незачем качать кадр шириной 1280, когда экран 360.
#
# jpg остаются на месте как запасной вариант для старых браузеров: в вёрстке
# стоит <picture>, где webp идёт первым, а jpg подставляется, если webp не
# поддерживается.
#
# Запускать вручную после добавления новых картинок:
#   bash scripts/make-image-variants.sh
# Нужен cwebp:  brew install webp
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIRS=("$ROOT/public/blog-images" "$ROOT/public/case-media")
command -v cwebp >/dev/null || { echo "Нет cwebp. Поставь: brew install webp"; exit 1; }

made=0
skipped=0

for src in "${DIRS[0]}"/*.jpg "${DIRS[0]}"/*.png "${DIRS[1]}"/*.jpg "${DIRS[1]}"/*.png; do
  [ -e "$src" ] || continue
  base="${src%.*}"
  full="$base.webp"
  small="$base-640.webp"

  # Пересобираем только если исходник новее готового варианта
  if [ ! -f "$full" ] || [ "$src" -nt "$full" ]; then
    cwebp -quiet -q 78 -metadata none "$src" -o "$full"
    made=$((made + 1))
  else
    skipped=$((skipped + 1))
  fi

  if [ ! -f "$small" ] || [ "$src" -nt "$small" ]; then
    cwebp -quiet -q 76 -metadata none -resize 640 0 "$src" -o "$small"
    made=$((made + 1))
  else
    skipped=$((skipped + 1))
  fi
done

echo "[картинки] создано вариантов: $made, пропущено актуальных: $skipped"

# Показываем, сколько сэкономили на самых тяжёлых кадрах
echo "[картинки] топ по экономии:"
for src in "${DIRS[0]}"/*.jpg "${DIRS[1]}"/*.jpg; do
  [ -e "$src" ] || continue
  w="${src%.*}.webp"
  [ -f "$w" ] || continue
  a=$(stat -f%z "$src" 2>/dev/null || stat -c%s "$src")
  b=$(stat -f%z "$w" 2>/dev/null || stat -c%s "$w")
  echo "$((a - b)) $(basename "$src") $((a / 1024))КБ -> $((b / 1024))КБ"
done | sort -rn | head -5 | while read -r _ name from to; do
  echo "   $name $from $to"
done
