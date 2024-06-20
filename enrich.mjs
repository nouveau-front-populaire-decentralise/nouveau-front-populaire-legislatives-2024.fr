#!/usr/bin/env node
import { readFile } from 'node:fs/promises'
import ASCIIFolder from 'fold-to-ascii'

const data = JSON.parse(await readFile('./reconciled.enriched.json', 'utf8'))
const sexes = JSON.parse(await readFile('./sexes.json', 'utf8'))

const sexById = Object.fromEntries(sexes.map(({ id, sexe }) => [ id, sexe ]))

const getSlug = str => ASCIIFolder.foldMaintaining(str.toLowerCase().normalize()).replace("'", '').replace(/\s/g, '-')

async function getWikidata (wdId) {
  const uri = `wd:${wdId}`
  const { entities } = await fetch(`https://inventaire.io/api/entities?action=by-uris&uris=${uri}`).then(res => res.json())
  const entity = Object.values(entities)[0]
  const wikipediaTitle = entity.sitelinks.frwiki?.title
  const commonsImage = entity.image.url
  const links = await fetch(`https://hub.toolforge.org/links/${wdId}`).then(res => res.json())
  const assembleeNationalUrl = links['wdt:P4123']?.url
  const nosDeputesUrl = links['wdt:P7040']?.url
  const viePublicUrl = links['wdt:P7676']?.url
  const radioFranceUrl = links['wdt:P10780']?.url
  return { wikipediaTitle, commonsImage, assembleeNationalUrl, nosDeputesUrl, viePublicUrl, radioFranceUrl }
}

const enrichedData = []
for (const entry of data) {
  const key = entry.nom1
  if (key && key !== 'Faites mieux !' && key !== 'Pas de candicat NFP') {
    entry.prenomNom1 = entry.prenomNom1.trim()
    entry.nom1 = entry.nom1.trim()
    entry.prenom1 = entry.prenom1.trim()
    entry.departement = entry.departement.padStart(2, '0')
    entry.circo = entry.circo.padStart(4, '0')
    const { prenomNom1, nom1, prenom1 } = entry
    entry.slug = getSlug(`${prenom1} ${nom1}`)
    if (!entry.wikidata && prenomNom1.match(/^Q\d+$/)) {
    // if (prenomNom1.match(/^Q\d+$/)) {
      entry.wikidata = prenomNom1
      const wdData = await getWikidata(entry.wikidata)
      // if (wdData.wikipediaTitle && !getSlug(wdData.wikipediaTitle).startsWith(getSlug(entry.prenomNom1))) {
      //   console.error('dubious match', getSlug(entry.prenomNom1), getSlug(wdData.wikipediaTitle))
      // } else {
        Object.assign(entry, wdData)
      // }
    } else {
      if (entry.wikipediaTitle && !getSlug(entry.wikipediaTitle).startsWith(getSlug(entry.prenomNom1))) {
        console.error('dubious match', getSlug(entry.prenomNom1), getSlug(entry.wikipediaTitle))
        delete entry.wikipediaTitle
        delete entry.commonsImage
        delete entry.assembleeNationalUrl
        delete entry.nosDeputesUrl
        delete entry.viePublicUrl
        delete entry.radioFranceUrl
      }
    }
    entry.feminin1 ??= sexById[entry.wikidata] ? sexById[entry.wikidata] === 'Q6581072' : null
    entry.prenomNom1 = `${prenom1} ${nom1}`
    entry.prenomNOM1 = `${prenom1} ${nom1.toUpperCase()}`
    enrichedData.push(entry)
  }
}


console.log(JSON.stringify(enrichedData))
