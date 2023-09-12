import {Medium, Tag, Document, Source, Spoiler, LinkUrl} from "@/interfaces/interface_globals"

export interface Misc {
  title: string
  hero: Medium
  meta: string
  tags: Tag[]
  content: Content[]
  links: LinkUrl[]
  sources: Source[]
  _modified: number
  _mby: string
  _created: number
  _state: number
  _cby: string
  _id: string
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