import {Medium, Tag, Document, Spoiler, Source} from "@/interfaces/interface_globals"

export interface Accessory {
  title: string
  trancparency?: string
  hero: Medium
  meta: string
  seo: string
  tags: Tag[]
  data: Data
  content: Content[]
  links: Link[]
  sources: Source[]
  _modified: number
  _mby: string
  _created: number
  _state: number
  _cby: string
  _id: string
}

export interface Data {
  name: string;
  manufacturer: string
  gun: string
  eligible: string
}

export interface Link{
  url: string
  text: string
}

export interface Content {
  title: string
  paragraphs: Paragraph[]
}

export interface Paragraph {
  text: string[]
  media: Medium[]
  documents: Document[]
  spoiler: Spoiler[]
}
