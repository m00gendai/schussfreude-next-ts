export interface Imprint {
  tiles: Tile[]
  content: Content[]
  _modified: number
  _mby: string
  _created: number
  _state: number
  _cby: string
  _id: string
}

export interface Tile {
  title: string
  text: string
  link: string
}

export interface Content {
  title: string
  text: string
}
