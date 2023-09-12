import {Medium, Tag, Document, Spoiler, Source} from "@/interfaces/interface_globals"

export interface App {
  title: string
  hero: Medium
  meta: string
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
  developer: string
  platform: string
  testPlatform: string
  size: string
  language: string
  testedVersion: string
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
