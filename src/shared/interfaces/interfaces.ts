export interface IRoute {
  name: string;
  points: number[][];
}

export interface DataType {
  key: string;
  name: string;
  [key: string]: string;
}