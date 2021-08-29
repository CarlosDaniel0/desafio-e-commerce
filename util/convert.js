/**
 * Recebe uma string em escrita normal, com acentuações e espaços e coverte
 * para atulização em URLs amigáveis
 * Ex:
 *  Mário Bros III
 * Retorna:
 *  mario-bros-iii
 * @param {String} text
 * @returns novoTexto formatado
 */
export const mimifyString = text => {
  let newText = text.split(" ").join("-")
  const regex = {
    from: "Á É Í Ó Ú á é í ó ú â ô ê Â Ô Ê Ã Õ ç Ç".split(" "),
    to: "A E I O U a e i o u a e o A O E A O c Ç".split(" ")
  }
  regex.from.push(":")
  regex.to.push("")

  for (let i = 0; i < regex.from.length; i++) {
    newText = newText.replace(regex.from[i], regex.to[i])
  }
  return newText.toLowerCase()
}

/**
 * Converte a pontuação em quantidade de estrelas
 * Ex:
 *    450
 * Retorna:
 *    4.5 estrelas
 * @param {int} score
 * @returns {int} stars
 */
export const fromScoreToStars = score => {
  let stars = score / 100
  const half = score % 100 / 100

  if (half > 0.5) stars = Math.ceil(stars)
  if (half < 0.5) stars = Math.floor(stars)

  return stars
}
