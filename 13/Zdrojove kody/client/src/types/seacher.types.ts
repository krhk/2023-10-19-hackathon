import { Connection } from "./data.types";

export interface SearcherType {
  connections: Array<Connection>;
  setConnections: (connections: Array<Connection>) => void;
}

export interface ConnectionComponentType {
  connection: Connection;
}
