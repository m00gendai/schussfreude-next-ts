/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cms.schussfreude.ch',
            port: '',
            pathname: '/storage/uploads/**',
          },
        ],
      },
    async redirects() {
      return [
        {
          source: '/automatwaffen-ii-bewaffnung-und-ausruestung-der-schweizer-armee-seit-1817',
          destination: '/artikel/buecher/automatwaffen-ii',
          permanent: true,
        },
        {
          source: '/infanteriewaffen',
          destination: '/artikel/buecher/infanteriewaffen',
          permanent: true,
        },
        {
          source: '/feuerwaffen-schweizerischer-polizeikorps',
          destination: '/artikel/buecher/feuerwaffen-schweizerischer-polizeikorps',
          permanent: true,
        },
        {
          source: '/feuerwaffen-schweizerischer-polizeikorps-2-auflage',
          destination: '/artikel/buecher/feuerwaffen-schweizerischer-polizeikorps-2.-auflage',
          permanent: true,
        },
        {
          source: '/wyss-te90-trainingseinsatz',
          destination: '/artikel/zubehoer/stgw90-wyss-te90-trainingseinsatz',
          permanent: true,
        },
        {
          source: '/pistolen-und-revolver-der-schweiz',
          destination: '/artikel/buecher/pistolen-und-revolver-der-schweiz',
          permanent: true,
        },
        {
          source: '/waffenerwerb-in-der-schweiz',
          destination: '/artikel/allgemein/waffenerwerb-in-der-schweiz',
          permanent: true,
        },
        {
          source: '/schweizer-militaergewehre-hinterladung-1860-1990',
          destination: '/artikel/buecher/schweizer-milit%C3%A4rgewehre-hinterladung-1860-1990',
          permanent: true,
        },
        {
          source: '/haemmerli-pistolen-und-revolver',
          destination: '/artikel/buecher/h%C3%A4mmerli-pistolen-und-revolver',
          permanent: true,
        },
        {
          source: '/hand-und-faustfeuerwaffen-der-schweizer-armee',
          destination: '/artikel/buecher/hand--und-faustfeuerwaffen-der-schweizer-armee',
          permanent: true,
        },
        {
          source: '/woerterbuch-der-waffentechnik',
          destination: '/artikel/buecher/w%C3%B6rterbuch-der-waffentechnik',
          permanent: true,
        },
        {
          source: '/shooting-world-cup-swc',
          destination: '/artikel/apps/shooting-world-cup-swc',
          permanent: true,
        },
        {
          source: '/stgw90-magazin-dominion-defence-30rds',
          destination: '/artikel/zubehoer/stgw90-dominion-defence-30rds-magazin',
          permanent: true,
        },
        {
          source: '/automatwaffen-i',
          destination: '/artikel/buecher/automatwaffen-i',
          permanent: true,
        },
        {
          source: '/handfeuerwaffen-gradzug-systeme',
          destination: '/artikel/buecher/handfeuerwaffen-gradzug-systeme',
          permanent: true,
        },
        {
          source: '/handfeuerwaffen-system-vetterli',
          destination: '/artikel/buecher/handfeuerwaffen-system-vetterli',
          permanent: true,
        },
        {
          source: '/das-schweizer-waffenmagazin-swm',
          destination: '/artikel/zeitschriften/das-schweizer-waffenmagazin-swm',
          permanent: true,
        },
        {
          source: '/schweizer-waffenmagazin-ausgabe-588-heft-57',
          destination: '/artikel/zeitschriften/swm/ausgabe-5-88-heft-57',
          permanent: true,
        },
        {
          source: '/stgw90-optik-gruenig-elmiger-farbfilter-12-farben',
          destination: '/artikel/zubehoer/stgw90-gr%C3%BCnig-&-elmiger-farbilfter-12-farben',
          permanent: true,
        },
        {
          source: '/schweizer-waffenmagazin-ausgabe-288-heft-54',
          destination: '/artikel/zeitschriften/swm/ausgabe-2-88-heft-54',
          permanent: true,
        },
        {
          source: '/irisblende-farbfilter-polarisation',
          destination: '/artikel/allgemein/irisblende-farbfilter-und-polarisation',
          permanent: true,
        },
        {
          source: '/das-grosse-buch-der-sig-pistolen',
          destination: '/artikel/buecher/das-grosse-buch-der-sig-pistolen',
          permanent: true,
        },
        {
          source: '/faustfeuerwaffen-ii',
          destination: '/artikel/buecher/faustfeuerwaffen-ii',
          permanent: true,
        },
        {
          source: '/faustfeuerwaffen-i',
          destination: '/artikel/buecher/faustfeuerwaffen-i',
          permanent: true,
        },
        {
          source: '/haemmerli-pistolen-und-revolver-2-auflage',
          destination: '/artikel/buecher/h%C3%A4mmerli-pistolen-und-revolver-2.-auflage',
          permanent: true,
        },
        {
          source: '/stgw57-wyss-pistolengriff-w57-sport',
          destination: '/artikel/zubehoer/stgw57-wyss-pistolengriff-w57-sport',
          permanent: true,
        },
        {
          source: '/stgw57-wyss-verstellbare-zweibeinstuetze',
          destination: '/artikel/zubehoer/stgw57-wyss-verstellbare-zweibeinst%C3%BCtze',
          permanent: true,
        },
        {
          source: '/schweizer-waffenmagazin-ausgabe-3-88-heft-55',
          destination: '/artikel/zeitschriften/swm/ausgabe-3-88-heft-55',
          permanent: true,
        },
        {
          source: '/schweizer-waffenmagazin-ausgabe-4-88-heft-56',
          destination: '/artikel/zeitschriften/swm/ausgabe-4-88-heft-56',
          permanent: true,
        },
        {
          source: '/schweizer-waffenmagazin-ausgabe-6-88-heft-58',
          destination: '/artikel/zeitschriften/swm/ausgabe-6-88-heft-58',
          permanent: true,
        },
        {
          source: '/schweizer-waffenmagazin-ausgabe-8-88-heft-59',
          destination: '/artikel/zeitschriften/swm/ausgabe-8-88-heft-59',
          permanent: true,
        },
        {
          source: '/schweizer-waffenmagazin-ausgabe-9-88-heft-60',
          destination: '/artikel/zeitschriften/swm/ausgabe-9-88-heft-60',
          permanent: true,
        },
        {
          source: '/welche-waffe-fuers-sportschiessen-teil-1-300m-gewehr',
          destination: '/artikel/allgemein/welche-waffe-f%C3%BCrs-sportschiessen-teil-1-300m-gewehr-einstieg',
          permanent: true,
        },
        {
          source: '/welche-waffe-fuers-sportschiessen-teil-2-50-25m-pistole-einstieg',
          destination: '/artikel/allgemein/welche-waffe-f%C3%BCrs-sportschiessen-teil-2-50-25m-pistole-einstieg',
          permanent: true,
        },
        {
          source: '/schweizer-waffenmagazin-ausgabe-10-88-heft-61',
          destination: '/artikel/zeitschriften/swm/ausgabe-10-88-heft-61',
          permanent: true,
        },
        {
          source: '/schweizer-waffenmagazin-ausgabe-11-88-heft-62',
          destination: '/artikel/zeitschriften/swm/ausgabe-11-88-heft-62',
          permanent: true,
        },
        {
          source: '/schweizer-waffenmagazin-ausgabe-12-88-heft-63',
          destination: '/artikel/zeitschriften/swm/ausgabe-12-88-heft-63',
          permanent: true,
        },
        {
          source: '/lienhard-universal-matchapparat-modell-g',
          destination: '/artikel/zubehoer/karabiner-lienhard-universal-matchapparat-modell-g',
          permanent: true,
        },
        {
          source: '/schweizer-waffenmagazin-ausgabe-2-89-heft-64',
          destination: '/artikel/zeitschriften/swm/ausgabe-2-89-heft-64',
          permanent: true,
        },
        {
          source: '/die-waffen-der-schweizer-soldaten',
          destination: '/artikel/buecher/die-waffen-der-schweizer-soldaten',
          permanent: true,
        },
        {
          source: '/schweizer-waffenmagazin-ausgabe-3-89-heft-65',
          destination: '/artikel/zeitschriften/swm/ausgabe-3-89-heft-65',
          permanent: true,
        },
        {
          source: '/industrie-know-how-in-der-schweiz-wohin',
          destination: '/artikel/buecher/industrie-know-how-in-der-schweiz---wohin',
          permanent: true,
        },
        {
          source: '/ein-besuch-im-sig-museum',
          destination: '/artikel/allgemein/ein-besuch-im-sig-museum',
          permanent: true,
        },
        {
          source: '/armeegewehr-nach-dienstende-behalten',
          destination: '/artikel/allgemein/armeegewehr-nach-dienstende-behalten',
          permanent: true,
        },
        {
          source: '/schweizer-waffenmagazin-ausgabe-4-89-heft-66',
          destination: '/artikel/zeitschriften/swm/ausgabe-4-89-heft-66',
          permanent: true,
        },
        {
          source: '/schweizer-waffenmagazin-ausgabe-5-89-heft-67',
          destination: '/artikel/zeitschriften/swm/ausgabe-5-89-heft-67',
          permanent: true,
        },
        {
          source: '/begegnungen-mit-einer-legende',
          destination: '/artikel/buecher/begegnungen-mit-einer-legende',
          permanent: true,
        },
        {
          source: '/welche-waffe-fuers-sportschiessen-teil-2-pistole-50-25m-ordonnanz',
          destination: '/artikel/allgemein/welche-waffe-f%C3%BCrs-sportschiessen-teil-2-50-25m-pistole-ordonnanz',
          permanent: true,
        },
        {
          source: '/welche-waffe-fuers-sportschiessen-teil-3-50-25m-pistole-sportpistolen',
          destination: '/artikel/allgemein/welche-waffe-f%C3%BCrs-sportschiessen-teil-2-50-25m-pistole-sportpistolen',
          permanent: true,
        },
        {
          source: '/kleinkaliber-sportpistolen-und-revolver',
          destination: '/artikel/buecher/kleinkaliber-sportpistolen-und-revolver',
          permanent: true,
        },
        {
          source: '/welche-waffe-fuers-sportschiessen-teil-2-pistole-50-25m-ordonnanz-2022',
          destination: '/artikel/allgemein/welche-waffe-f%C3%BCrs-sportschiessen-teil-2-50-25m-pistole-ordonnanz',
          permanent: true,
        },
        {
          source: '/stgw90-hogue-pistolengriff',
          destination: '/artikel/zubehoer/stgw90-hogue-pistolengriff',
          permanent: true,
        },
        {
          source: '/stgw90-irisblende-modell-match-90',
          destination: '/artikel/zubehoer/stgw90-irisblende-modell-match-90',
          permanent: true,
        },
        {
          source: '/schussfreude-2-0-neubau-der-webseite',
          destination: '/artikel/allgemein/schussfreude-2.0-neubau-der-webseite',
          permanent: true,
        },
      ]
    },
}

module.exports = nextConfig
