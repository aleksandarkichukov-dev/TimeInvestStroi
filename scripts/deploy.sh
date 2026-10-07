#!/usr/bin/env bash
# Обновяване на сайта на хостинга (SPanel → NodeJS Manager).
# Изтегля последната версия от GitHub, инсталира, компилира и рестартира приложението.
# Пуска се на сървъра: bash scripts/deploy.sh
set -euo pipefail
cd "$(dirname "$0")/.."

# NodeJS Manager записва порта в app.yml и сменя скрипта "start" в package.json — връщаме файловете,
# за да мине git pull, и после отново задаваме порта.
git checkout -- package.json package-lock.json
git pull --ff-only
npm ci --no-audit --no-fund
npm run build

port=$(grep -oE 'NODE_PORT: *[0-9]+' app.yml | grep -oE '[0-9]+')
name=$(grep -oE '^- name: *[^ ]+' app.yml | awk '{print $3}')
npm pkg set scripts.start="next start -p $port -H localhost"
pm2 restart "$name" --update-env
echo "Готово: $name на порт $port"
