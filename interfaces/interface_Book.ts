import {Medium, Tag, Document} from "@/interfaces/interface_globals"

export interface Book {
  seo: string
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
  documents: Document[]
}

export interface Outside {
  text: string
  media: Medium[]
  documents: Document[]
}

export interface Content {
  text: string
  media: Medium[]
  documents: Document[]
}

export interface Impression {
  text: string
  media: Medium[]
  documents: Document[]
}

export interface Availability {
  text: string
  media: Medium[]
  documents: Document[]
}

export interface Conclusion {
  text: string
  media: Medium[]
  documents: Document[]
}