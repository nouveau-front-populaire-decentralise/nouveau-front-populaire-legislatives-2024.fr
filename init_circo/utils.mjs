import ASCIIFolder from 'fold-to-ascii'

export function getSlug (str) {
  return ASCIIFolder.foldMaintaining(str.toLowerCase().normalize()).replace("'", '').replace(/\s/g, '-').replace(/[-]+/g, '-')
}
