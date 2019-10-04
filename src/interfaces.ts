/**
 * Represents an URL.
 */
export interface URL {
  /**
   * Gets the serialization of url.
   */
  readonly href: string
  /**
   * Gets the serialization of url's origin.
   */
  readonly origin: string
  /**
   * Gets or sets the url's scheme, followed by `":"`.
   */
  protocol: string
  /**
   * Gets or sets the url's username.
   */
  username: string
  /**
   * Gets or sets the url's password.
   */
  password: string
  /**
   * Gets or sets the url's host.
   */
  host: string
  /**
   * Gets or sets the url's hostname.
   */
  hostname: string
  /**
   * Gets or sets the url's port.
   */
  port: string
  /**
   * Gets or sets the url's path name.
   */
  pathname: string
  /**
   * Gets or sets the url's query string.
   */
  search: string
  /**
   * Gets the url's query parameters.
   */
  readonly searchParams: URLSearchParams
  /**
   * Gets or sets the url's hash.
   */
  hash: string
  /**
   * Returns the serialization of url.
   */
  toJSON(): string
}

/**
 * Represents an URL record.
 */
export interface URLRecord {
  /**
   * The type of URL
   */
  scheme: string
  /**
   * Username
   */
  username: string
  /**
   * Password
   */
  password: string
  /**
   * Host
   */
  host: Host | null
  /**
   * Port
   */
  port: number | null
  /**
   * Path
   */
  path: string[]
  /**
   * Query string
   */
  query: string | null
  /**
   * Fragment
   */
  fragment: string | null  
}

/**
 * Represents URL query parameters.
 */
export interface URLSearchParams extends Iterable<[string, string]> {
  /**
   * Appends a new name/value pair to the query parameters.
   * 
   * @param name - query string name
   * @param value - query string value
   */
  append(name: string, value: string): void
  /**
   * Removes all query parameters with the given name.
   * 
   * @param name - query string name
   */
  delete(name: string): void
  /**
   * Gets the value of the first query parameter with the given name.
   * 
   * @param name - query string name
   */  
  get(name: string): string | null
  /**
   * Gets the values of all query parameters with the given name.
   * 
   * @param name - query string name
   */  
  getAll(name: string): string[]
  /**
   * Determines whether a query parameter with the given name exists.
   * 
   * @param name - query string name
   */    
  has(name: string): boolean
  /**
   * Replaces all query parameter with the given name with the given value.
   * 
   * @param name - query string name
   * @param value - query string value
   */    
  set(name: string, value: string): void
  /**
   * Sorts all query parameters with their name.
   */
  sort(): void
  /**
   * Converts query parameters to a string.
   */
  toString(): string
}

/**
 * Represents the state of the URL parser.
 */
export enum ParserState {
  SchemeStart,
  Scheme,
  NoScheme,
  SpecialRelativeOrAuthority,
  PathOrAuthority,
  Relative,
  RelativeSlash,
  SpecialAuthoritySlashes,
  SpecialAuthorityIgnoreSlashes,
  Authority,
  Host,
  Hostname,
  Port,
  File,
  FileSlash,
  FileHost,
  PathStart,
  Path,
  CannotBeABaseURLPath,
  Query,
  Fragment
}

/**
 * Represents an URL's host as either of:
 * - a domain as a string
 * - an IPv4 address as a number
 * - an IPv6 address as a list of eight numbers
 * - an opaque host as a string
 * - or an empty host the an empty string `""`
 */
export type Host = string | number | number[]

/**
 * Represents an origin as a tuple of:
 * - A scheme (a scheme).
 * - A host (a host).
 * - A port (a port).
 * - A domain (null or a domain). Null unless stated otherwise.
 */
export type Origin = [string, Host, number | null, string | null]
export const OpaqueOrigin: Origin = ["", "", null, null]