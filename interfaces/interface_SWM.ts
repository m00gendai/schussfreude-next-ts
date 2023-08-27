export interface SWM {
    title: string
    tags: Tag[]
    meta: string
    hero: Medium
    outside: Outside
    content: string
    coverThemes: string
    inside: Medium[]
    additions: Additions
    _modified: number
    _mby: string
    _created: number
    _state: number
    _cby: string
    _id: string
  }
  
  export interface Outside {
    text: string
    media: Medium[]
  }
  
  export interface Additions {
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