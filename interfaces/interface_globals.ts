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

export interface Document {
  path: string;
  title: string;
  mime: string;
  type: string;
  description: string;
  tags: string[];
  size: number;
  colors: string[] | null;
  width: string | null;
  height: string | null;
  _hash: string;
  _created: number;
  _modified: number;
  _cby: string;
  folder: string;
  _id: string;
}

export interface Source {
  source: Owner
  content: string
}

export interface Owner {
  owner: string,
  link: string,
  _state: number,
  _modified: number,
  _mby: string,
  _created: number,
  _cby: string,
  _id: string,
  _model: string
}