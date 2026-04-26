export type SoulType = "basic" | "hidden" | "lost"

export interface Soul {
  id: number
  name: string
  fullName: string
  ig: string
  role: string
  line: string
  letter: string
  type: SoulType
}

export interface JourneyMoment {
  id: string
  label: string
  x: number
  y: number
  title: string
  text: string
  era: string
}

const raw: Record<
  string,
  { ig: string; role: string; fullName: string; line: string; letter: string }
> = {
  afdhan: {
    ig: "@putraamfibii",
    role: "member",
    fullName: "Afdhan",
    line: "Selalu hadir saat dibutuhkan.",
    letter: "Aku harap kamu tetap percaya sama dirimu, bahkan saat dunia berisik.",
  },
  agung: {
    ig: "@agngarrd",
    role: "member",
    fullName: "Agung",
    line: "Tenang tapi kuat.",
    letter: "Semoga kamu punya hidup yang lembut, tapi tidak rapuh.",
  },
  aisyah: {
    ig: "—",
    role: "member",
    fullName: "Aisyah",
    line: "Senyum yang tidak banyak bicara.",
    letter: "Semoga kamu menemukan tempat di mana kamu bisa benar-benar pulang.",
  },
  ajeng: {
    ig: "@alyaa212025",
    role: "secretary",
    fullName: "Ajeng",
    line: "Rapi, tapi tetap hangat.",
    letter: "Terima kasih sudah jadi orang yang menjaga detail saat kami semua sibuk.",
  },
  alwi: {
    ig: "@alwixaxa",
    role: "member",
    fullName: "Alwi",
    line: "Bercanda di saat yang paling tepat.",
    letter: "Jangan pernah kehilangan tawamu — itu yang sering menyelamatkan ruangan.",
  },
  alya: {
    ig: "@al.ya861",
    role: "member",
    fullName: "Alya",
    line: "Hadir tanpa banyak suara, tapi dirasa.",
    letter: "Semoga kamu selalu dikelilingi orang yang bisa membaca diammu.",
  },
  "alya z": {
    ig: "@alyaaptrrr_",
    role: "member",
    fullName: "Alya Z",
    line: "Energi yang sulit dijelaskan.",
    letter: "Kamu lebih dari yang kamu kira. Tolong jangan lupa itu.",
  },
  alysa: {
    ig: "@alysazaamira",
    role: "member",
    fullName: "Alysa",
    line: "Lembut tapi tidak mudah patah.",
    letter: "Semoga kamu disayangi sebagaimana kamu menyayangi.",
  },
  arasya: {
    ig: "@rsyxaa",
    role: "CHAIRMAN",
    fullName: "Arasya",
    line: "Memimpin tanpa menjauh.",
    letter: "Semoga kamu selalu ingat: kamu nggak harus kuat sendirian.",
  },
  athaya: {
    ig: "@athtrityazz",
    role: "member",
    fullName: "Athaya",
    line: "Tenang, tapi penuh isi.",
    letter: "Semoga kamu menemukan dunia yang seluas isi kepalamu.",
  },
  aurel: {
    ig: "@aaurelrl_",
    role: "vice chairman",
    fullName: "Aurel",
    line: "Tegas tapi tidak keras.",
    letter: "Terima kasih sudah jadi tempat sandar saat ketua sedang patah.",
  },
  azfa: {
    ig: "@azffaaaa",
    role: "member",
    fullName: "Azfa",
    line: "Hadir saat yang lain pergi.",
    letter: "Semoga hidupmu tidak pernah kekurangan tangan untuk dipegang.",
  },
  denaya: {
    ig: "—",
    role: "member",
    fullName: "Denaya",
    line: "Senyap tapi terasa.",
    letter: "Semoga kamu tidak lagi merasa harus menghilang untuk ditemukan.",
  },
  dimitri: {
    ig: "@d1mm14",
    role: "member",
    fullName: "Dimitri",
    line: "Diam, tapi mata yang merekam segalanya.",
    letter: "Semoga ingatanmu yang tajam jadi pelukan, bukan beban.",
  },
  elvina: {
    ig: "@_vinnael",
    role: "member",
    fullName: "Elvina",
    line: "Lembut seperti pagi.",
    letter: "Semoga hidupmu sehangat caramu memperlakukan orang lain.",
  },
  fahmy: {
    ig: "@fahmyakbr_",
    role: "member",
    fullName: "Fahmy",
    line: "Punya tawa yang menular.",
    letter: "Tolong jangan berhenti tertawa — dunia butuh suara seperti itu.",
  },
  farah: {
    ig: "@_frhkamilaa",
    role: "member",
    fullName: "Farah",
    line: "Punya cara sendiri untuk hadir.",
    letter: "Semoga kamu bertemu orang yang melihatmu dengan jernih.",
  },
  feren: {
    ig: "@yoraassee",
    role: "member",
    fullName: "Feren",
    line: "Setia pada hal-hal kecil.",
    letter: "Semoga hal-hal kecilmu tumbuh jadi sesuatu yang besar.",
  },
  firman: {
    ig: "@frmnnmaul_",
    role: "member",
    fullName: "Firman",
    line: "Berdiri saat orang lain duduk.",
    letter: "Semoga kamu selalu punya alasan untuk tetap berdiri.",
  },
  hamdan: {
    ig: "d4n_az",
    role: "member",
    fullName: "Hamdan",
    line: "Hadir sebagai dirinya sendiri.",
    letter: "Tolong jangan pernah merasa harus jadi orang lain untuk diterima.",
  },
  ibrahim: {
    ig: "@sxcazddd_",
    role: "member",
    fullName: "Ibrahim",
    line: "Punya ketenangan yang tidak biasa.",
    letter: "Semoga kamu jadi tempat singgah untuk yang lelah, termasuk dirimu sendiri.",
  },
  kaira: {
    ig: "@kaiikaiira",
    role: "member",
    fullName: "Kaira",
    line: "Cerah tanpa harus mencolok.",
    letter: "Semoga harimu seterang caramu memandang dunia.",
  },
  krishna: {
    ig: "@_cloverrr7_",
    role: "member",
    fullName: "Krishna",
    line: "Hadir di belakang layar, selalu.",
    letter: "Tidak semua kontribusi terlihat — tapi semuanya terasa. Termasuk milikmu.",
  },
  laura: {
    ig: "c4n_91",
    role: "member",
    fullName: "Laura",
    line: "Jujur dengan caranya sendiri.",
    letter: "Semoga kamu dikelilingi orang yang menerima kejujuranmu.",
  },
  lovita: {
    ig: "@veetallov_",
    role: "member",
    fullName: "Lovita",
    line: "Hangat tanpa berisik.",
    letter: "Semoga rumahmu selalu terasa rumah, ke mana pun kamu pergi.",
  },
  meirin: {
    ig: "@dgirlr1n",
    role: "treasurer",
    fullName: "Meirin",
    line: "Teliti, tapi tidak dingin.",
    letter: "Terima kasih sudah menjaga hal-hal yang sering kami lupa.",
  },
  meilinda: {
    ig: "@meii_hdy",
    role: "member",
    fullName: "Meilinda",
    line: "Punya senyum yang menenangkan.",
    letter: "Semoga kamu tidak pernah kehilangan kelembutanmu, sekeras apapun dunia.",
  },
  mentari: {
    ig: "@mntariie_",
    role: "member",
    fullName: "Mentari",
    line: "Sesuai namanya — terbit pelan, hangat.",
    letter: "Semoga orang-orang di sekitarmu tahu betapa beruntungnya mereka.",
  },
  nanda: {
    ig: "@nndazzlra_",
    role: "member",
    fullName: "Nanda",
    line: "Punya cara sendiri untuk peduli.",
    letter: "Semoga kepedulianmu kembali padamu dalam bentuk yang tak terduga.",
  },
  naura: {
    ig: "@nrathsn",
    role: "treasurer",
    fullName: "Naura",
    line: "Tegas tapi sangat manusiawi.",
    letter: "Terima kasih sudah jadi orang yang bisa diandalkan.",
  },
  pricillia: {
    ig: "@pricillia_calista",
    role: "member",
    fullName: "Pricillia",
    line: "Anggun tanpa berusaha.",
    letter: "Semoga kamu selalu punya ruang untuk jadi dirimu yang utuh.",
  },
  putik: {
    ig: "—",
    role: "secretary",
    fullName: "Putik",
    line: "Tertib, tapi tetap punya warna.",
    letter: "Semoga kamu hidup di dunia yang menghargai ketertibanmu.",
  },
  putri: {
    ig: "@putriirika.r_",
    role: "member",
    fullName: "Putri",
    line: "Ada saat orang membutuhkan.",
    letter: "Tolong jangan lupa: orang yang menampung juga butuh ditampung.",
  },
  qisya: {
    ig: "@qissyaadle",
    role: "member",
    fullName: "Qisya",
    line: "Cerdas tanpa pamer.",
    letter: "Semoga kepintaranmu jadi alat untuk mencintai, bukan menjauhkan.",
  },
  rania: {
    ig: "@raniaabwzr_",
    role: "member",
    fullName: "Rania",
    line: "Hadir penuh, kapanpun.",
    letter: "Semoga kamu dikelilingi orang yang juga hadir untukmu.",
  },
  rafa: {
    ig: "@vzet69",
    role: "member",
    fullName: "Rafa",
    line: "Ringan tapi punya isi.",
    letter: "Semoga ringanmu jadi pelampung saat dunia terasa berat.",
  },
  reihan: {
    ig: "@w2.mee",
    role: "member",
    fullName: "Reihan",
    line: "Punya tatapan yang ingat banyak hal.",
    letter: "Semoga ingatanmu lebih banyak menyimpan tawa daripada luka.",
  },
  sekar: {
    ig: "@iyhin.s",
    role: "member",
    fullName: "Sekar",
    line: "Mekar pelan, tapi pasti.",
    letter: "Tidak apa-apa berkembang dengan kecepatanmu sendiri.",
  },
  shanum: {
    ig: "@shnmsyp",
    role: "member",
    fullName: "Shanum",
    line: "Hadir dengan caranya yang khas.",
    letter: "Semoga keunikanmu tidak pernah dipangkas oleh siapa pun.",
  },
  syamsid: {
    ig: "@zsyam150",
    role: "member",
    fullName: "Syamsid",
    line: "Tenang dengan ketegasan sendiri.",
    letter: "Semoga kamu tetap bisa lembut, tanpa kehilangan punggungmu yang lurus.",
  },
  zico: {
    ig: "@yugo0oo_",
    role: "member",
    fullName: "Zico",
    line: "Bercanda yang berbobot.",
    letter: "Semoga humormu selalu jadi jembatan, bukan tameng.",
  },
  vondra: {
    ig: "@vdralizka_",
    role: "member",
    fullName: "Vondra",
    line: "Tidak banyak bicara, tapi diingat.",
    letter: "Tidak semua orang harus berisik untuk dicintai. Kamu buktinya.",
  },
  faiz: {
    ig: "@ysfa313_",
    role: "member",
    fullName: "Faiz",
    line: "Setia pada apa yang dia percaya.",
    letter: "Semoga kesetiaan itu selalu dibalas dengan setimpal.",
  },
}

// Distribute soul types: ~60% basic, ~25% hidden, ~15% lost
const typeMap: Record<string, SoulType> = {
  arasya: "basic",
  aurel: "basic",
  ajeng: "basic",
  meirin: "basic",
  naura: "basic",
  putik: "basic",
  afdhan: "basic",
  agung: "hidden",
  aisyah: "hidden",
  alwi: "basic",
  alya: "basic",
  "alya z": "hidden",
  alysa: "basic",
  athaya: "basic",
  azfa: "basic",
  denaya: "lost",
  dimitri: "hidden",
  elvina: "basic",
  fahmy: "basic",
  farah: "basic",
  feren: "hidden",
  firman: "basic",
  hamdan: "basic",
  ibrahim: "hidden",
  kaira: "basic",
  krishna: "lost",
  laura: "hidden",
  lovita: "basic",
  meilinda: "basic",
  mentari: "basic",
  nanda: "hidden",
  pricillia: "basic",
  putri: "basic",
  qisya: "hidden",
  rania: "basic",
  rafa: "basic",
  reihan: "lost",
  sekar: "basic",
  shanum: "hidden",
  syamsid: "basic",
  zico: "basic",
  vondra: "lost",
  faiz: "hidden",
}

const orderedNames = [
  "afdhan", "agung", "aisyah", "ajeng", "alwi", "alya", "alya z", "alysa",
  "arasya", "athaya", "aurel", "azfa", "denaya", "dimitri", "elvina", "fahmy",
  "farah", "feren", "firman", "hamdan", "ibrahim", "kaira", "krishna", "laura",
  "lovita", "meirin", "meilinda", "mentari", "rafa", "nanda", "naura",
  "pricillia", "putik", "putri", "qisya", "rania", "reihan", "sekar", "shanum",
  "syamsid", "zico", "vondra", "faiz",
]

export const souls: Soul[] = orderedNames.map((name, i) => ({
  id: i + 1,
  name,
  fullName: raw[name].fullName,
  ig: raw[name].ig,
  role: raw[name].role,
  line: raw[name].line,
  letter: raw[name].letter,
  type: typeMap[name] || "basic",
}))

export const journeyMoments: JourneyMoment[] = [
  {
    id: "ORI",
    label: "ORIENTATION",
    x: 12,
    y: 62,
    era: "AWAL",
    title: "Masa Orientasi",
    text: "Kita datang sebagai orang asing.\nLalu ruangan mulai punya suara yang sama: X-A.",
  },
  {
    id: "ICON",
    label: "ICONIC",
    x: 28,
    y: 32,
    era: "MUSIM 1",
    title: "Kejadian Ikonik",
    text: "Ada satu tawa yang masih terasa.\nKita tidak ingat semua detail—tapi ingat rasanya.",
  },
  {
    id: "SHIFT",
    label: "TURNING POINT",
    x: 48,
    y: 56,
    era: "TENGAH",
    title: "Titik Balik",
    text: "Di titik tertentu, kita berhenti jadi 'anak-anak baru'.\nKita jadi 'kita'.",
  },
  {
    id: "EVENT",
    label: "EVENT",
    x: 68,
    y: 36,
    era: "MUSIM 2",
    title: "Momen Event",
    text: "Capek, berantakan, tapi entah kenapa… kita bangga.",
  },
  {
    id: "LAST",
    label: "THE END",
    x: 86,
    y: 64,
    era: "AKHIR",
    title: "Akhir Masa Sekolah",
    text: "Akhir bukan hilang.\nAkhir cuma mengubah bentuk rindu.",
  },
]

export const journeyEdges: [string, string][] = [
  ["ORI", "ICON"],
  ["ICON", "SHIFT"],
  ["SHIFT", "EVENT"],
  ["EVENT", "LAST"],
]
