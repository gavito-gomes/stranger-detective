const s0 = [
  // useless
  {
    id: 0,
    type: 'useless',
    text: 'Eu ouvi falar numa criança careca que tinha superpoderes. Parece que ela fala com uns monstros...',
    audioURI: 'https://mcdn.podbean.com/mf/web/3jpwif/useless1.mp3',
  },
  {
    id: 1,
    type: 'useless',
    text: 'Precisa de dinheiro? Aproveite! Crédito com taxas diferenciadas. Só no Banco Municipal de Hawkings.',
    audioURI: 'https://mcdn.podbean.com/mf/web/t8pkrh/useless2.mp3',
  },
  {
    id: 2,
    type: 'useless',
    text: 'Você recebeu um cupom de 10% de desconto em qualquer produto da nossa loja. Acesse agora mesmo www.scoopahoy.com.',
    audioURI: 'https://mcdn.podbean.com/mf/web/8vq87t/useless3.mp3',
  },
  {
    id: 3,
    type: 'useless',
    text: 'Quer se aventurar por lugares fantásticos e reinos desconhecidos? Conheça o mundo mágico de Dungeons and Dragons.',
    audioURI: 'https://mcdn.podbean.com/mf/web/wc72jw/useless4.mp3',
  },
]

const s1 = [
  // suspects
  {
    id: 0,
    type: 'suspect',
    values: [0],
    text: 'Eu vi a bibliotecária passeando no parque na hora do crime.',
    audioURI: 'https://mcdn.podbean.com/mf/web/pb3pwi/biblotecaria.mp3',
  },
  {
    id: 1,
    type: 'suspect',
    values: [1],
    text: 'O cientista estava dando uma palestra fora da cidade naquele dia.',
    audioURI: 'https://mcdn.podbean.com/mf/web/3vqrt5/cientista.mp3',
  },
  {
    id: 2,
    type: 'suspect',
    values: [2],
    text: 'Eu encontrei o cozinheiro no supermercado na hora do crime',
    audioURI: 'https://mcdn.podbean.com/mf/web/jzc282/cozinheiro.mp3',
  },
  {
    id: 3,
    type: 'suspect',
    values: [3],
    text: 'Eu estava acompanhando o investigador em um passeio na hora do crime.',
    audioURI: 'https://mcdn.podbean.com/mf/web/udh2qu/investigador.mp3',
  },
  {
    id: 4,
    type: 'suspect',
    values: [4],
    text: 'O jornalista estava realizando uma entrevista na hora do crime.',
    audioURI: 'https://mcdn.podbean.com/mf/web/bpmi33/jornalista.mp3',
  },
  {
    id: 5,
    type: 'suspect',
    values: [5],
    text: 'O policial estava viajando com a família naquela semana.',
    audioURI: 'https://mcdn.podbean.com/mf/web/dbszqd/policial.mp3',
  },
  {
    id: 6,
    type: 'suspect',
    values: [6],
    text: 'O prefeito estava fora da cidade no dia do assassinato.',
    audioURI: 'https://mcdn.podbean.com/mf/web/savmpt/prefeito.mp3',
  },
  {
    id: 7,
    type: 'suspect',
    values: [7],
    text: 'O professor estava numa excursão com sua turma na hora do crime.',
    audioURI: 'https://mcdn.podbean.com/mf/web/vs77m8/professor.mp3',
  },
]

const s2 = [
  // weapons
  {
    id: 0,
    type: 'weapon',
    values: [0, 1],
    text: 'Não há nenhum indício de armas de fogo usadas no crime.',
    audioURI: 'https://mcdn.podbean.com/mf/web/apuere/armas.mp3',
  },
  {
    id: 1,
    type: 'weapon',
    values: [2, 3, 4],
    text: 'Não há indícios de espancamento no corpo.',
    audioURI: 'https://mcdn.podbean.com/mf/web/7t825g/espancamento.mp3',
  },
  {
    id: 2,
    type: 'weapon',
    values: [5],
    text: 'Não foi encontrado nenhum tipo de veneno na amostra do sangue.',
    audioURI: 'https://mcdn.podbean.com/mf/web/53wnv8/veneno.mp3',
  },
  {
    id: 3,
    type: 'weapon',
    values: [6, 7],
    text: 'Não há marcas de corte no corpo. Os especialistas disseram que não foram usados objetos cortantes.',
    audioURI: 'https://mcdn.podbean.com/mf/web/jxdp4t/corte.mp3',
  },
]

const s3 = [
  // places
  {
    id: 0,
    type: 'place',
    values: [0],
    text: 'A escola estava promovendo um baile no dia do crime.',
    audioURI: 'https://mcdn.podbean.com/mf/web/5vgnqp/escola.mp3',
  },
  {
    id: 1,
    type: 'place',
    values: [1],
    text: 'Trabalho na prefeitura e não aconteceu nada lá naquele dia.',
    audioURI: 'https://mcdn.podbean.com/mf/web/8iwpae/prefeitura.mp3',
  },
  {
    id: 2,
    type: 'place',
    values: [2],
    text: 'Eu trabalho no jornal e não vi nada lá no dia do crime.',
    audioURI: 'https://mcdn.podbean.com/mf/web/wuryfx/jornal.mp3',
  },
  {
    id: 3,
    type: 'place',
    values: [3],
    text: 'A lanchonete estava sendo inspecionada naquele dia.',
    audioURI: 'https://mcdn.podbean.com/mf/web/yrxj8d/lanchonete.mp3',
  },
  {
    id: 4,
    type: 'place',
    values: [4],
    text: 'A locadora estava sendo reformada naquela semana.',
    audioURI: 'https://mcdn.podbean.com/mf/web/5y9gv2/locadora.mp3',
  },
  {
    id: 5,
    type: 'place',
    values: [5],
    text: 'O laboratório estava interditado naquele dia.',
    audioURI: 'https://mcdn.podbean.com/mf/web/irrmmk/laboratorio.mp3',
  },
  {
    id: 6,
    type: 'place',
    values: [6],
    text: 'Eu estava na biblioteca na hora do crime e não vi nada por lá.',
    audioURI: 'https://mcdn.podbean.com/mf/web/je7jxs/biblioteca.mp3',
  },
  {
    id: 7,
    type: 'place',
    values: [7],
    text: 'Eu estava no clube o dia todo e não aconteceu nada de estranho lá.',
    audioURI: 'https://mcdn.podbean.com/mf/web/rz9mv3/clube.mp3',
  },
  {
    id: 8,
    type: 'place',
    values: [8],
    text: 'Ouvi dizer que não foi na delegacia.',
    audioURI: 'https://mcdn.podbean.com/mf/web/zc6n8f/delegacia.mp3',
  },
  {
    id: 9,
    type: 'place',
    values: [9],
    text: 'Eu estava no fliperama na hora e não vi nada de estranho lá.',
    audioURI: 'https://mcdn.podbean.com/mf/web/ghv83b/fliperama.mp3',
  },
  {
    id: 10,
    type: 'place',
    values: [10],
    text: 'Com certeza não foi no shopping. Trabalho lá e não vi nada estranho naquele dia.',
    audioURI: 'https://mcdn.podbean.com/mf/web/f258mr/shopping.mp3',
  },
]

export const generateTipQueue = (suspect, weapon, place) => {
  let uselessTips = s0.sort(() => Math.random() - 0.5)

  let suspectTips = s1
    .filter((el) => !el.values.includes(suspect))
    .sort(() => Math.random() - 0.5)

  let weaponTips = s2
    .filter((el) => !el.values.includes(weapon))
    .sort(() => Math.random() - 0.5)

  let placeTips = s3
    .filter((el) => !el.values.includes(place))
    .sort(() => Math.random() - 0.5)

  let stage1 = [suspectTips.pop(), uselessTips.pop()]
  stage1.sort(() => Math.random() - 0.5)

  let stage2 = [weaponTips.pop(), placeTips.pop()]
  stage2.sort(() => Math.random() - 0.5)

  let stage3 = [...uselessTips, ...suspectTips, ...weaponTips, ...placeTips]
  stage3.sort(() => Math.random() - 0.5)

  return [...stage1, ...stage2, ...stage3]
}
