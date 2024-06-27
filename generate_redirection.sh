#!/usr/bin/env bash

set -eu

slug=$1
url=$2
cleaned_url=$(echo "$url" | sed -E 's|https?://||' | sed 's|/$||')

echo "<head> <meta http-equiv=\"refresh\" content=\"0; URL=${url}\" /></head>
"  > "./public/$slug/index.html"

echo "# [${slug}](https://nouveau-front-populaire-legislatives-2024.fr/${slug})

## Rien à faire
Redirige vers [${cleaned_url}](${url})
" > "./public/$slug/README.md"

git add ./public/$slug/index.html ./public/$slug/README.md
git commit -m "$slug: redirect to $url"
