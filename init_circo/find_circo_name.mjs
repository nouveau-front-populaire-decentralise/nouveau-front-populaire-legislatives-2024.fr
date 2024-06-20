import { readFile } from 'node:fs/promises'
import { shortenNumbers } from './shorten_numbers.mjs'

const dropZeroPadding = str => str.replace(/^0+/, '')

const nomsCirconscriptions = JSON.parse(await readFile('./noms_circonscriptions.json', 'utf8'))

export function findCircoName (dep, circo) {
  console.log('🚀 ~ file: find_circo_name.mjs ~ line', 9, 'findCircoName ~ ', { dep, circo })
  const nomCircoLong = nomsCirconscriptions.find(entry => entry.code === `${dep}-${dropZeroPadding(circo)}`).circo_label
  const nomCirco = shortenNumbers(nomCircoLong)
  return { nomCircoLong, nomCirco }
}
