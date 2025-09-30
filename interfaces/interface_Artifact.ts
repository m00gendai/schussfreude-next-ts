import { Document } from "./interface_globals";

export interface Artifact {
  _modified: number;
  _mby: string;
  _created: number;
  _state: number;
  _cby: string;
  _id: string;
  item: Item[];
  title: string;
  priority: number;
}

export interface Item {
  type: string;
  intro: string;
  content: Script[];
}

export interface Script {
  title: string;
  type: string;
  thumbnail: Thumbnail;
  publisher: string;
  year: string;
  description: string;
  document: Document;
  _state: number;
  _modified: number;
  _mby: string;
  _created: number;
  _cby: string;
  _id: string;
}

export interface Thumbnail {
  path: string;
  title: string;
  mime: string;
  type: string;
  description: string;
  tags: string[];
  size: number;
  colors: string[];
  width: number;
  height: number;
  _hash: string;
  _created: number;
  _modified: number;
  _cby: string;
  folder: string;
  _id: string;
}

