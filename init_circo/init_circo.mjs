#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises'
import { shortenNumbers } from './shorten_numbers.mjs'
import { generateSkeleton } from './generate_skeleton.mjs'

const [ dep, circo ] = process.argv.slice(2)
console.log('🚀 ~ file: init_circo.mjs ~ line', 5, { dep, circo })

const data = JSON.parse(await readFile('./reconciled.enriched.json', 'utf8'))
const communesParCirco = JSON.parse(await readFile('./noms_cantons/communes_par_circo.json', 'utf8'))
const nomsCirconscriptions = JSON.parse(await readFile('./noms_circonscriptions.json', 'utf8'))
const dropZeroPadding = str => str.replace(/^0+/, '')
const nomCircoLong = nomsCirconscriptions.find(entry => entry.code === `${dep}-${dropZeroPadding(circo)}`).circo_label
const nomCirco = shortenNumbers(nomCircoLong)

const dataCirco = data.find(entry => entry.circo === (dep + circo))
dataCirco.communes = communesParCirco[dep][circo]
dataCirco.nomCirco = nomCirco
dataCirco.nomCircoLong = nomCircoLong

const html = generateSkeleton(dataCirco)
console.log(html)

await writeFile(`./repos/${dataCirco.slug}/index.html`, html)
