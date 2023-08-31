import {Medium, Tag} from "@/interfaces/interface_globals"
import {SWM} from "@/interfaces/interface_SWM"

export interface Magazine {
  title: string
  hero: Medium
  meta: string
  tags: Tag[]
  intro: Intro[]
  volumes: Volume[]
  availability: Availability[]
  _modified: number
  _mby: string
  _created: number
  _state: number
  _cby: string
  _id: string
}

export interface Intro {
  text: string
  media: Medium[]
}

export interface Volume {
  volume: string
  panorama: Medium[]
  issues: SWM[]
}

export interface Availability {
  text: string
  media: Medium[]
}
