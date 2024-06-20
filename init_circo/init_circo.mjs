#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises'
import { generateSkeleton } from './generate_skeleton.mjs'
import { findCircoName, getCircoLocalCode } from './find_circo_name.mjs'

const [ depCode, circo ] = process.argv.slice(2)

const data = JSON.parse(await readFile('./reconciled.enriched.json', 'utf8'))
const communesParCirco = JSON.parse(await readFile('./noms_cantons/communes_par_circo.json', 'utf8'))

const { nomCircoLong, nomCirco } = findCircoName(depCode, circo)

const dataCirco = data.find(entry => entry.circo === (depCode + circo))
dataCirco.communes = communesParCirco[depCode][circo]
dataCirco.nomCirco = nomCirco
dataCirco.nomCircoLong = nomCircoLong

const otherDepartementCircos = data
  .filter(entry => entry.departement === depCode && entry.circo !== (depCode + circo))
  .map(entry => {
    const { slug, circo, prenomNOM1, feminin1 } = entry
    const candidatLabel = feminin1 ? 'candidate' : 'candidat'
    const circoLocalCode = getCircoLocalCode(depCode, circo)
    const { nomCirco } = findCircoName(depCode, circoLocalCode)
    const name = `${nomCirco} - ${prenomNOM1}`
    const title = `${prenomNOM1} ${candidatLabel} pour le Nouveau Front Populaire, ${nomCirco}, Élections législatives 2024`
    return `<li><a target="_blank" href="https://${slug}.nouveau-front-populaire-legislatives-2024.fr" title="${title}">${name}</a></li>`
  })

const html = generateSkeleton(dataCirco, otherDepartementCircos)
console.log(html)

await writeFile(`./repos/${dataCirco.slug}/index.html`, html)
