import { readFile } from 'node:fs/promises'
import { shortenNumbers } from './shorten_numbers.mjs'

const dropZeroPadding = str => str.replace(/^0+/, '')

const nomsCirconscriptions = JSON.parse(await readFile('./noms_circonscriptions.json', 'utf8'))

export function findCircoName (depCode, circo) {
  const nomCircoLong = nomsCirconscriptions.find(entry => entry.code === `${depCode}-${dropZeroPadding(circo)}`).circo_label
  const nomCirco = shortenNumbers(nomCircoLong)
  return { nomCircoLong, nomCirco }
}


export function getCircoLocalCode (depCode, circo) {
  return circo.startsWith('Z') ? circo.replace(/Z[A-Z]/, '') : circo.split(depCode).slice(1).join(depCode)
}
