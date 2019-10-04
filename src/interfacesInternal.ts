import { URL, URLRecord, URLSearchParams } from "./interfaces"

/**
 * Represents an URL.
 */
export interface URLInternal extends URL {
  _url: URLRecord
  _queryObject: URLSearchParams
}

/**
 * Represents an URL record.
 */
export interface URLRecordInternal extends URLRecord {
  _cannotBeABaseURLFlag: boolean
  _blobURLEntry: any | null
}

/**
 * Represents URL query parameters.
 */
export interface URLSearchParamsInternal extends URLSearchParams {
  _list: [string, string][]
  _urlObject: URL | null
}