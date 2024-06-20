export function generateSkeleton (entry) {
 let { departement, circo, nomDepartement, nom1, prenom1, prenomNom1, twitter, instagram, tiktok, facebook, facebookUrl, site, siteCampagne, boucle, slug, prenomNOM1, feminin1, nomCirco, communes, wikipediaTitle, commonsImage, assembleeNationalUrl, nosDeputesUrl, viePublicUrl, radioFranceUrl } = entry

 if (siteCampagne) {
   return `<head> <meta http-equiv="refresh" content="0; URL=${siteCampagne}" /></head>`
 }


 if (facebook && !facebookUrl) facebookUrl = `https://www.facebook.com/${facebook}`
 const joinedCommunes = `${communes.slice(0, -1).join(', ')} ou ${communes.at(-1)}`

 const candidatLabel = feminin1 ? 'candidate' : 'candidat'

return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <link rel="icon" href="https://nouveau-front-populaire-decentralise.github.io/commons/assets/icons/nouveau-front-populaire-icon.png" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <meta name="theme-color" content="#000000" />
  <link rel="apple-touch-icon" href="https://nouveau-front-populaire-decentralise.github.io/commons/assets/icons/nouveau-front-populaire-icon.192.png" />

  <meta name="twitter:title" content="${prenomNOM1} ${candidatLabel} pour le Nouveau Front Populaire, ${nomCirco}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:description" content="Le 30 juin et le 7 juillet, votez ${prenomNOM1} !">
  <!-- <meta name="twitter:image" content="https://nouveau-front-populaire-decentralise.github.io/${slug}/images/banner.jpg"> -->

  <meta property="og:type" content="website">
  <meta property="og:url" content="https://nouveau-front-populaire-decentralise.github.io/${slug}/">
  <meta property="og:title" content="${prenomNOM1} ${candidatLabel} pour le Nouveau Front Populaire, ${nomCirco}">
  <meta name="description" property="og:description" content="Le 30 juin et le 7 juillet, votez ${prenomNOM1} !" />
  <!-- <meta property="og:image" content="https://nouveau-front-populaire-decentralise.github.io/${slug}/images/banner.jpg"> -->

  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <link rel="stylesheet" href="https://nouveau-front-populaire-decentralise.github.io/commons/assets/css/styles.css" />
  <title>${prenomNOM1} ${candidatLabel} pour le Nouveau Front Populaire, ${nomCirco}</title>
</head>
<body>

<header>
  <div>
    <img src="https://nouveau-front-populaire-decentralise.github.io/commons/assets/images/logo-NFP.png" alt="Nouveau Front Populaire" />
  </div>

  <div>
    <h1>Le 30 juin et le 7 juillet, <br />votez ${prenomNOM1} !</h1>
    <h2>${nomCirco}</h2>
  </div>
</header>

<section class="entete">
  <div>
    <img alt="${prenomNOM1} ${candidatLabel} pour le Nouveau Front Populaire, ${nomCirco}" src="./images/candidates.jpg">

    <div class="buttons">
      <div><a href="#programme" class="btn">Notre programme</a></div>
      <div><a href="#procuration" class="btn">Faire une procuration</a></div>
      <!-- <div><a href="#agenda" class="btn">Agenda</a></div> -->
      <!-- <div><a target="_blank" href="" class="btn">Nous rejoindre</a></div> -->
      ${boucle ? `<div><a target="_blank" href="${boucle}" class="btn">Nous rejoindre</a></div>` : '<!-- <div><a target="_blank" href="" class="btn">Nous rejoindre</a></div> -->'}
    </div>
  </div>
</section>

<section id="programme">
  <div>
    <h2>Notre programme</h2>

    <h3>100 jours pour tout changer avec le Nouveau Front Populaire</h3>

    <ul>
      <li>
        Pour notre pouvoir d’achat et les droits sociaux
      </li>
      <li>
        Pour la démocratie et l’égalité entre toutes et tous
      </li>
      <li>
        Pour notre santé et nos services publics
      </li>
      <li>
        Pour le vivant et le climat
      </li>
      <li>
        Pour la relocalisation des industries et des emplois
      </li>
      <li>
        Pour la paix partout, en Ukraine et à Gaza
      </li>
    </ul>

    <div class="buttons">
      <div>
        <a target="_blank" href="https://www.nouveaufrontpopulaire.fr/" class="btn">Voir le programme en détail</a>
      </div>

      <div>
        <a href="#candidature" class="btn">Nos candidat·e·s</a>
      </div>
    </div>
  </div>
</section>

<section id="candidature">
  <div>
    <article>
      <div>
        <img alt="${prenomNOM1} ${candidatLabel} pour le Nouveau Front Populaire, ${nomCirco}" src="${commonsImage}">
      </div>

      <div>
        <h2>${prenomNOM1}</h2>

        <!-- <p>Présentation</p> -->
        <ul>
          ${site ? `<li><a target="_blank" href="${site}">${new URL(site).host + new URL(site).pathname}</a></li>` : ''}
          ${wikipediaTitle ? `<li><a target="_blank" href="https://fr.wikipedia.org/${encodeURIComponent(wikipediaTitle)}">wikipediaTitle</a></li>` : ''}
          ${assembleeNationalUrl ? `<li><a target="_blank" href="${assembleeNationalUrl}">Page sur le site de l'Assemblée Nationale</a></li>` : ''}
          ${nosDeputesUrl ? `<li><a target="_blank" href="${nosDeputesUrl}">Page sur nosdeputes.fr</a></li>` : ''}
          ${viePublicUrl ? `<li><a target="_blank" href="${viePublicUrl}">Page sur vie-publique.fr</a></li>` : ''}
          ${radioFranceUrl ? `<li><a target="_blank" href="${radioFranceUrl}">Page Radio France</a></li>` : ''}
        </ul>
      </div>
    </article>

    <article>
      <div>
        <img alt="suppléant pour le Front Populaire le 30 juin" src="./images/candidate_2.jpg">
      </div>

      <div>
        <!-- <h2>Présentation - suppléant·e</h2> -->

      </div>
    </article>
  </div>
</section>

<section class="contact">
  <div class="email">
    <h2>Nous contacter</h2>
    <!-- <p>Pour toute question, écrivez-nous à <a href="mailto:nom@exemple.org">nom@exemple.org</a></p> -->
  </div>
  <ul class="reseaux-sociaux">

    ${facebookUrl
      ? `<li><a target="_blank" href="${facebookUrl}"><img src="https://nouveau-front-populaire-decentralise.github.io/commons/assets/icons/svg/bxl-facebook-circle.svg" alt="facebook"></a></li>`
      : '<!-- <li><a target="_blank" href="https://www.facebook.com/username/"><img src="https://nouveau-front-populaire-decentralise.github.io/commons/assets/icons/svg/bxl-facebook-circle.svg" alt="facebook"></a></li> -->'}

    ${instagram
      ? `<li><a target="_blank" href="https://www.instagram.com/@${instagram}"><img src="https://nouveau-front-populaire-decentralise.github.io/commons/assets/icons/svg/bxl-instagram.svg" alt="instagram"></a></li>`
      : '<!-- <li><a target="_blank" href="https://www.instagram.com/@username/"><img src="https://nouveau-front-populaire-decentralise.github.io/commons/assets/icons/svg/bxl-instagram.svg" alt="instagram"></a></li> -->'}

    ${tiktok
      ? `<li><a target="_blank" href="https://tiktok.com/@${tiktok}"><img src="https://nouveau-front-populaire-decentralise.github.io/commons/assets/icons/svg/bxl-tiktok.svg" alt="xtwitter"></a></li>`
      : '<!-- <li><a target="_blank" href="https://tiktok.com/username"><img src="https://nouveau-front-populaire-decentralise.github.io/commons/assets/icons/svg/bxl-tiktok.svg" alt="xtwitter"></a></li> -->'}

    ${twitter
      ? `<li><a target="_blank" href="https://twitter.com/${twitter}"><img src="https://nouveau-front-populaire-decentralise.github.io/commons/assets/icons/svg/bxl-twitter.svg" alt="xtwitter"></a></li>`
      : '<!-- <li><a target="_blank" href="https://twitter.com/username"><img src="https://nouveau-front-populaire-decentralise.github.io/commons/assets/icons/svg/bxl-twitter.svg" alt="xtwitter"></a></li> -->'}

  </ul>
</section>

<section class="logos_partis">
  <div>
    <h2>L'union de la gauche, c'est le Nouveau Front Populaire !</h2>

    <ul>
      <li>
          <img alt="logo des écologistes" src="https://nouveau-front-populaire-decentralise.github.io/commons/assets/images/les-ecologistes.png">
      </li>
      <li>
        <img alt="logo de LFI" src="https://nouveau-front-populaire-decentralise.github.io/commons/assets/images/lfi.png">
      </li>
      <li>
        <img alt="logo du PCF" src="https://nouveau-front-populaire-decentralise.github.io/commons/assets/images/pcf.png">
      </li>
      <li>
        <img alt="logo du PS" src="https://nouveau-front-populaire-decentralise.github.io/commons/assets/images/ps.png">
      </li>
    </ul>

    <p>avec le soutien de Place publique, Génération.s, GES, GRS, MRC, LRDG, L'engagement, GDS, Ensemble !, Parti de gauche, Picardie Debout, PEP, Révolution Écologique pour le Vivant (REV), Allons enfants, ADS, Nouvelle Donne, La Jeune Garde, Union démocratique bretonne (UDB), ESNT </p>
  </div>
</section>

<section id="procuration">
  <div>
    <p>Vous ne pouvez pas vous déplacer le 30&nbsp;juin ou le 7&nbsp;juillet prochain ?</p>

    <h2>Votez par procuration</h2>

    <div class="buttons">
      <div>
         <a target="_blank" href="https://www.maprocuration.gouv.fr/" class="btn">Faire une procuration</a>
      </div>
      <div>
        <a href="#inscription" class="btn">Trouver mon bureau de vote</a>
      </div>
    </div>
  </div>
</section>

<section id="inscription">
  <div>
    <h2>Votre bureau de vote</h2>

    <ul>
      <li>Vous ne savez pas quel est votre bureau de vote ?</li>
      <li>Vous n'êtes pas sûr·es d'être inscrit·e ?</li>
    </ul>

    <p>Retrouvez vos informations pour <strong>voter les 30 juin et 7 juillet</strong> sur <a target="_blank" href="https://www.service-public.fr/particuliers/vosdroits/R51788">Service-Public.fr</a></p>
  </div>
</section>

<!-- <section id="agenda">
  <div>
    <h2>Agenda</h2>
    <ul>
      <li>
        <a target="_blank" href="https://www.facebook.com/victorymichele/posts/861819942431443">
          <img src="./images/agenda/rencontre-19-juin-saint-agreve.jpg" alt="Rencontrons nous ! Avec Romain Evrard, nous vous donnons rendez-vous ce mercredi 19 juin à 18h30 à Saint-Agrève.">
        </a>
      </li>
      <li title="Apéro Jeunes du Nouveau Front Populaire Ardéchois, le 20 juin à 18h à Annonay, bistro Frangin Frangine, 29 avenue de l'Europe">
        <a href="https://www.facebook.com/victorymichele/posts/862020429078061" title="Les Jeunes du Nouveau Front Populaire Ardéchois vous donnent rendez-vous ce jeudi soir à Annonay pour un apéro populaire !">
          <img src="./images/agenda/apero-20-juin.jpg" alt="Apéro Jeunes du Nouveau Front Populaire Ardéchois, le 20 juin à 18h à Annonay, bistro Frangin Frangine, 29 avenue de l'Europe">
        </a>
      </li>
    </ul>
  </div>
</section> -->

<section class="villes">
  <div>
    <img src="https://nouveau-front-populaire-decentralise.github.io/commons/assets/images/logo-NFP-rouge.png" alt="Nouveau Front Populaire">

    <a target="_blank" href="https://www.nouveaufrontpopulaire.fr/">nouveaufrontpopulaire.fr</a>

    <h2>Le 30&nbsp;juin et le 7&nbsp;juillet, votez et faites votez autour de vous !</h2>

    <p>Que vous soyez électeur ou électrice à ${joinedCommunes}… <strong>chaque vote compte pour empêcher l'extrême-droite d'arriver au pouvoir !</strong></p>
  </div>
</section>

<section class="footer">
  <div class="a">Candidature de la ${nomCirco}.</div>
  <div class="b">
    nouveau-front-populaire-legislatives-2024.fr est un site d'information non-officiel, indépendant, de soutien de la campagne du Nouveau Front Populaire
    <a target="_blank" href="https://github.com/nouveau-front-populaire-decentralise/${slug}">Code source</a>
  </div>
</section>

</body>
</html>
`
}
