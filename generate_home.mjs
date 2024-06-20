#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises'
import { findCircoName, getCircoLocalCode } from './init_circo/find_circo_name.mjs'

const data = JSON.parse(await readFile('./reconciled.enriched.json', 'utf8'))

const circoByDepartement = {}

for (const entry of data) {
  const { departement, slug, circo, prenomNOM1, feminin1 } = entry
  circoByDepartement[departement] ??= []
  circoByDepartement[departement].push(entry)
}

function renderDepartement ([ depCode, circos ]) {
  const { departement, nomDepartement } = circos[0]
  const circosHtml = circos
    .map(entry => {
      const { slug, circo, prenomNOM1, feminin1 } = entry
      const candidatLabel = feminin1 ? 'candidate' : 'candidat'
      const circoLocalCode = getCircoLocalCode(depCode, circo)
      const { nomCirco } = findCircoName(depCode, circoLocalCode)
      const name = `${circoLocalCode} - ${prenomNOM1}`
      const title = `${prenomNOM1} ${candidatLabel} pour le Nouveau Front Populaire, ${nomCirco}, Élections législatives 2024`
      return `<li><a target="_blank" href="https://${slug}.nouveau-front-populaire-legislatives-2024.fr" title="${title}">${name}</a></li>`
    })
    .join('\n')

    return `
      <section>
        <div>
          <h2>${departement === '99' ? '' : `${departement} - `}${nomDepartement}</h2>
          <ul>
          ${circosHtml}
          </ul>
        </div>
      </section>
    `
}

const formatDepKey = key => {
  if (key === '99') return '9999'
  if (key === '2A') return '020A'
  if (key === '2B') return '020B'
  return key.padEnd(3, '0').padStart(4, '0')
}

const listHtml = Object.entries(circoByDepartement)
  .sort(([ a ], [ b ]) => {
    return formatDepKey(a) > formatDepKey(b) ? 1 : -1
  })
  .map(renderDepartement).join('\n')

const title = 'Candidat·e·s du Nouveau Front Populaire'
const subTitle = 'Élections législatives 2024'
const fullTitle = `${title} - ${subTitle}`

const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${fullTitle}</title>
  <link rel="stylesheet" href="/styles.css" />
  <style>
    header h2{
      font-size: 1.8rem;
    }
    section h2{
      background-color: #eee;
      padding: 1rem;
      border-radius: 3px;
    }
  </style>
</head>
<body>
  <header>
    <div>
      <img src="/assets/images/logo-NFP.png" alt="Nouveau Front Populaire" />
    </div>
    <div>
      <h1>${title}</h1>
      <h2>${subTitle}</h2>
    </div>
  </header>
  ${listHtml}
</body>
</html>
`

console.log(html)
