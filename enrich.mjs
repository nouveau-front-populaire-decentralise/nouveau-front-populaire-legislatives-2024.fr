#!/usr/bin/env node
import { readFile } from 'node:fs/promises'
import { getSlug } from './init_circo/utils.mjs'

const data = JSON.parse(await readFile('./reconciled.enriched.json', 'utf8'))
const sexes = JSON.parse(await readFile('./sexes.json', 'utf8'))

const sexById = Object.fromEntries(sexes.map(({ id, sexe }) => [ id, sexe ]))

async function getWikidata (wdId) {
  const uri = `wd:${wdId}`
  const { entities } = await fetch(`https://inventaire.io/api/entities?action=by-uris&uris=${uri}`).then(res => res.json())
  const entity = Object.values(entities)[0]
  const wikipediaTitle = entity.sitelinks.frwiki?.title
  const commonsImage = entity.image.url
  const facebook = entity.claims['wdt:P2013']?.[0]
  const instagram = entity.claims['wdt:P2003']?.[0]
  const twitter = entity.claims['wdt:P2002']?.[0]
  const tiktok = entity.claims['wdt:P7085']?.[0]
  const mastodon = entity.claims['wdt:P4033']?.[0]
  let mastodonUrl
  if (mastodon) {
    const [ username, instance ] = mastodon.split('@')
    mastodonUrl = `https://${instance}/@${username}`
  }
  const youtube = entity.claims['wdt:P2397']?.[0]
  const links = await fetch(`https://hub.toolforge.org/links/${wdId}`).then(res => res.json())
  const assembleeNationalUrl = links['P4123']?.url
  const nosDeputesUrl = links['P7040']?.url
  const viePublicUrl = links['P7676']?.url
  const radioFranceUrl = links['P10780']?.url
  return { wikipediaTitle, commonsImage, assembleeNationalUrl, nosDeputesUrl, viePublicUrl, radioFranceUrl, facebook, instagram, twitter, tiktok, youtube, mastodonUrl }
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
    // if (!entry.wikidata && prenomNom1.match(/^Q\d+$/)) {
    // // if (prenomNom1.match(/^Q\d+$/)) {
    //   entry.wikidata = prenomNom1
    //   const wdData = await getWikidata(entry.wikidata)
    //   // if (wdData.wikipediaTitle && !getSlug(wdData.wikipediaTitle).startsWith(getSlug(entry.prenomNom1))) {
    //   //   console.error('dubious match', getSlug(entry.prenomNom1), getSlug(wdData.wikipediaTitle))
    //   // } else {
    //     Object.assign(entry, wdData)
    //   // }
    // } else {
    //   if (entry.wikipediaTitle && !getSlug(entry.wikipediaTitle).startsWith(getSlug(entry.prenomNom1))) {
    //     console.error('dubious match', getSlug(entry.prenomNom1), getSlug(entry.wikipediaTitle))
    //     delete entry.wikipediaTitle
    //     delete entry.commonsImage
    //     delete entry.assembleeNationalUrl
    //     delete entry.nosDeputesUrl
    //     delete entry.viePublicUrl
    //     delete entry.radioFranceUrl
    //   }
    // }
    if (entry.wikidata) {
      if (entry.wikipediaTitle && !getSlug(entry.wikipediaTitle).startsWith(getSlug(entry.prenomNom1))) {
        console.error('dubious match', getSlug(entry.prenomNom1), getSlug(entry.wikipediaTitle))
        delete entry.wikipediaTitle
        delete entry.commonsImage
        delete entry.assembleeNationalUrl
        delete entry.nosDeputesUrl
        delete entry.viePublicUrl
        delete entry.radioFranceUrl
      }
      const { wikipediaTitle, commonsImage, assembleeNationalUrl, nosDeputesUrl, viePublicUrl, radioFranceUrl, facebook, instagram, twitter, tiktok, youtube, mastodonUrl } = await getWikidata(entry.wikidata)
      Object.assign(entry, { wikipediaTitle, commonsImage, assembleeNationalUrl, nosDeputesUrl, viePublicUrl, radioFranceUrl, youtube, mastodonUrl })
      if (!entry.facebook) entry.facebook = facebook
      if (!entry.instagram) entry.instagram = instagram
      if (!entry.twitter) entry.twitter = twitter
      if (!entry.tiktok) entry.tiktok = tiktok
    }
    entry.feminin1 ??= sexById[entry.wikidata] ? sexById[entry.wikidata] === 'Q6581072' : null
    entry.prenomNom1 = `${prenom1} ${nom1}`
    entry.prenomNOM1 = `${prenom1} ${nom1.toUpperCase()}`
    enrichedData.push(entry)
  }
}

console.log(JSON.stringify(enrichedData))
