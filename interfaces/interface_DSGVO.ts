export interface DSGVO {
  section: Section[]
  _modified: number
  _mby: string
  _created: number
  _state: number
  _cby: string
  _id: string
}

export interface Section {
  title: string
  text: string
}
