export interface Book {
  data: Data
  intro: Intro[]
  outside: Outside[]
  content: Content[]
  impressions: Impression[]
  availability: Availability[]
  conclusion: Conclusion[]
  tags: Tag[]
  _modified: number
  _mby: string
  _created: number
  _state: number
  _cby: string
  _id: string
  title: string
  hero: Medium
  meta: string
}

export interface Data {
  title: string
  author: string
  release: string
  reprint: string
  publisher: string
  isbn: string
  pages: string
  weight: string
  dimensions: string
}

export interface Intro {
  text: string
  media: Medium[]
}

export interface Outside {
  text: string
  media: Medium[]
}

export interface Medium {
  path: string
  title: string
  mime: string
  type: string
  description: string
  tags: string[]
  size: number
  colors: string[]
  width: number
  height: number
  _hash: string
  _created: number
  _modified: number
  _cby: string
  folder: string
  _id: string
}

export interface Content {
  text: string
  media: Medium[]
}

export interface Impression {
  text: string
  media: Medium[]
}

export interface Availability {
  text: string
  media: Medium[]
}

export interface Conclusion {
  text: string
  media: Medium[]
}

export interface Tag {
  item: string
  type: string
  thumb: Medium
  _modified: number
  _mby: string
  _created: number
  _state: number
  _cby: string
  _id: string
  _model: string
}