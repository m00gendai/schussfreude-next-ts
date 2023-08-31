import {Medium, Tag} from "@/interfaces/interface_globals"

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