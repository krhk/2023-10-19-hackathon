import { Connection } from "@/types/data.types";
import { get } from "./client";

export async function getConnectionsWithoutStart(
  station: string,
  time?: string
): Promise<Array<Connection>> {
  try {
    const url = time
      ? `connections/withoutstart?transferStation=${station}&time=${time}`
      : `connections/withoutstart?transferStation=${station}`;

    const result = await get(url);

    if (result.status === 200) {
      return result.data;
    }
  } catch (ex) {}
  return [];
}

export async function getConnectionsWithStart(
  station: string,
  from: string,
  time?: string
): Promise<Array<Connection>> {
  try {
    const url = time
      ? `connections/withoutstart?fromStation=${from}&transferStation=${station}&time=${time}`
      : `connections/withoutstart?fromStation=${from}&transferStation=${station}`;

    const result = await get(url);

    if (result.status === 200) {
      return result.data;
    }
  } catch (ex) {}
  return [];
}
