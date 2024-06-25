#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises'
import { Readable } from 'node:stream'
import { getSlug } from '../init_circo/utils.mjs'

const data = JSON.parse(await readFile('./reconciled.enriched.json', 'utf8'))

const lowercaseNames = str => {
  return str
  .replaceAll(' -', '-')
  .split(' ')
  .map(part => {
    return part
    .split('-')
    .map(subpart => subpart[0].toUpperCase() + subpart.slice(1).toLowerCase())
    .join('-')
  })
  .join(' ')
}

async function updateHtml ({ slug, prenomNOM1, prenomNOM2, feminin2, pdfId }) {
  let html = await readFile(`./public/${slug}/index.html`, 'utf8')
  html = html
  .replace('alt="suppléant pour', `<alt="${prenomNOM2}, suppléant${feminin2 ? 'e' : ''}`)
  .replace('prenomNOM2 - suppléant·e', `${prenomNOM2} - suppléant${feminin2 ? 'e' : ''}`)
  await writeFile(`./public/${slug}/index.html`, html)
}

async function getOfficialCircoData (circoData) {
  if (circoData.pdf) return
  const { circo, slug, altSlug, departement } = circoData
  const circoCode = circo.startsWith('Z') ? departement + circo.slice(-2) : circo
  const url = `https://programme-candidats.interieur.gouv.fr/elections-legislatives-2024/ajax/1_candidats_circo_${circoCode}.json`
  console.log('🚀 ~ file: program_scraper.mjs ~ line', 34, 'getOfficialCircoData ~ ', { url, circoData })
  const { data: circoOfficialData } = await fetch(url).then(res => res.json())
  const matchingCandidates = circoOfficialData.filter(candidate => {
    const officialSlug = getSlug(`${candidate.candidatPrenom} ${candidate.candidatNom}`)
    console.log('🚀 ~ file: program_scraper.mjs ~ line', 37, 'getOfficialCircoData ~ ', { officialSlug })
    return officialSlug === slug || officialSlug == altSlug
  })
  console.log('🚀 ~ file: program_scraper.mjs ~ line', 79, 'getOfficialCircoData ~ ', { matchingCandidates })
  if (matchingCandidates.length > 1) {
    console.error({ circoData, matchingCandidates })
    throw new Error('too many found')
  }
  if (matchingCandidates.length < 1) {
    console.error({ circoData, circoOfficialData: circoOfficialData.map(candidate => [ candidate.candidatPrenom, candidate.candidatNom ]) })
    throw new Error('not found')
  }
  const matchingCandidate = matchingCandidates[0]
  const { pdf: pdfId, suppleantPrenom, suppleantNom, suppleantSexe } = matchingCandidate
  circoData.prenomNOM2 = `${suppleantPrenom} ${suppleantNom}`
  circoData.prenomNom2 = `${suppleantPrenom} ${lowercaseNames(suppleantNom)}`
  circoData.feminin2 = suppleantSexe === 'F'
  circoData.pdf = pdfId
  console.log('🚀 ~ file: program_scraper.mjs ~ line', 94, 'getOfficialCircoData ~ ', { pdfId })
  // if (pdfId) {
  //   const response = await fetch(`https://programme-candidats.interieur.gouv.fr/elections-legislatives-2024/data-pdf-propagandes/${pdfId}.pdf`)
  //   const body = Readable.fromWeb(response.body)
  //   await writeFile(`./public/${slug}/programme.pdf`, body)
  // }
  // await updateHtml(circoData)
}

let passedValids = false
let lastValid = '9507'

try {
  for (const circoData of data) {
    if (circoData.circo === lastValid) passedValids = true
    else if (passedValids && !circoData.circo.startsWith('99')) {
      try {
        await getOfficialCircoData(circoData)
      } catch (err) {
        const circoCode = circoData.circo.startsWith('Z') ? circoData.departement + circoData.circo.slice(-2) : circo
        console.error('debug circo', `https://programme-candidats.interieur.gouv.fr/elections-legislatives-2024/candidats.html?departement=${circoData.departement}&circo=${circoCode}&tour=1`)
        console.error('debug circo',  `https://programme-candidats.interieur.gouv.fr/elections-legislatives-2024/ajax/1_candidats_circo_${circoCode}.json`)
        throw err
      }
    }
  }
} catch (err) {
  throw err
} finally {
  // await writeFile('./reconciled.enriched.json', JSON.stringify(data, null, 2) + '\n')
}
