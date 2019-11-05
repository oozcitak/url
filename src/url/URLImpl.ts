import { URLAlgorithm } from "../algorithm/URLAlgorithm"
import { URLSearchParamsImpl } from "./URLSearchParamsImpl"
import { URL, URLRecord, ParserState, URLSearchParams } from "./interfaces"

/**
 * Represents an URL.
 */
export class URLImpl implements URL {

  _url: URLRecord
  _queryObject: URLSearchParams

  protected _algo: URLAlgorithm

  /** 
   * Initializes a new `URL`.
   * 
   * @param url - an URL string
   * @param base - a base URL string
   */
  constructor(url: string, baseURL?: string) {
    this._algo = new URLAlgorithm()

    /**
     * 1. Let parsedBase be null.
     * 2. If base is given, then:
     * 2.1. Let parsedBase be the result of running the basic URL parser on base.
     * 2.2. If parsedBase is failure, then throw a TypeError.
     */
    let parsedBase: URLRecord | null = null
    if (baseURL !== undefined) {
      parsedBase = this._algo.basicURLParser(baseURL)
      if (parsedBase === null) {
        throw new TypeError(`Invalid base URL: '${baseURL}'.`)
      }
    }


    /**
     * 3. Let parsedURL be the result of running the basic URL parser on url 
     * with parsedBase.
     * 4. If parsedURL is failure, then throw a TypeError.
     */
    const parsedURL = this._algo.basicURLParser(url, parsedBase)
    if (parsedURL === null) {
      throw new TypeError(`Invalid URL: '${url}'.`)
    }

    /**
     * 5. Let query be parsedURL’s query, if that is non-null, and the empty
     * string otherwise.
     * 6. Let result be a new URL object.
     * 7. Set result’s url to parsedURL.
     * 8. Set result’s query object to a new URLSearchParams object using query,
     * and then set that query object’s url object to result.
     * 9. Return result.
     */
    const query = parsedURL.query || ""
    this._url = parsedURL
    this._queryObject = new URLSearchParamsImpl(query)
    this._queryObject._urlObject = this
  }

  /** @inheritdoc */
  get href(): string {
    /**
     * The href attribute’s getter and the toJSON() method, when invoked, must 
     * return the serialization of context object’s url.
     */
    return this._algo.urlSerializer(this._url) 
  }
  set href(value: string) {
    /**
     * 1. Let parsedURL be the result of running the basic URL parser on the
     * given value.
     * 2. If parsedURL is failure, then throw a TypeError.
     */
    const parsedURL = this._algo.basicURLParser(value)
    if (parsedURL === null) {
      throw new TypeError(`Invalid URL: '${value}'.`)
    }
    /**
     * 3. Set context object’s url to parsedURL.
     * 4. Empty context object’s query object’s list.
     * 5. Let query be context object’s url’s query.
     * 6. If query is non-null, then set context object’s query object’s list to
     * the result of parsing query.
     */
    this._url = parsedURL
    this._queryObject._list = []
    const query = this._url.query
    if (query !== null) {
      this._queryObject._list = this._algo.urlEncodedStringParser(query)
    }
  }

  /** @inheritdoc */
  get origin(): string {
    /**
     * The origin attribute’s getter must return the serialization of context
     * object’s url’s origin. [HTML]
     */
    return this._algo.asciiSerializationOfAnOrigin(this._algo.origin(this._url))
  }

  /** @inheritdoc */
  get protocol(): string {
    /**
     * The protocol attribute’s getter must return context object url’s scheme,
     * followed by U+003A (:).
     */
    return this._url.scheme + ':'
  }
  set protocol(val: string) {
    /**
     * The protocol attribute’s setter must basic URL parse the given value, 
     * followed by U+003A (:), with context object’s url as url and scheme start
     * state as state override.
     */
    this._algo.basicURLParser(val + ':', undefined, undefined, this._url, 
      ParserState.SchemeStart)
  }

  /** @inheritdoc */
  get username(): string {
    /**
     * The username attribute’s getter must return context object’s url’s 
     * username.
     */
    return this._url.username
  }
  set username(val: string) {
    /**
     * 1. If context object’s url cannot have a username/password/port, then 
     * return.
     * 2. Set the username given context object’s url and the given value.
     */
    if (this._algo.cannotHaveAUsernamePasswordPort(this._url)) return
    this._algo.setTheUsername(this._url, val)
  }

  /** @inheritdoc */
  get password(): string {
    /**
     * The password attribute’s getter must return context object’s url’s 
     * password.
     */
    return this._url.password
  }
  set password(val: string) {
    /**
     * 1. If context object’s url cannot have a username/password/port, then 
     * return.
     * 2. Set the password given context object’s url and the given value.
     */
    if (this._algo.cannotHaveAUsernamePasswordPort(this._url)) return
    this._algo.setThePassword(this._url, val)
  }

  /** @inheritdoc */
  get host(): string {
    /**
     * 1. Let url be context object’s url.
     * 2. If url’s host is null, return the empty string.
     * 3. If url’s port is null, return url’s host, serialized.
     * 4. Return url’s host, serialized, followed by U+003A (:) and url’s port, 
     * serialized.
     */
    if (this._url.host === null) {
      return ""
    } else if (this._url.port === null) {
      return this._algo.hostSerializer(this._url.host)
    } else {
      return this._algo.hostSerializer(this._url.host) + ':' + this._url.port.toString()
    }
  }
  set host(val: string) {
    /**
     * 1. If context object’s url’s cannot-be-a-base-URL flag is set, then
     * return.
     * 2. Basic URL parse the given value with context object’s url as url and
     * host state as state override.
     */
    if (this._url._cannotBeABaseURLFlag) return
    this._algo.basicURLParser(val, undefined, undefined, this._url, 
      ParserState.Host)
  }

  /** @inheritdoc */
  get hostname(): string {
    /**
     * 1. If context object’s url’s host is null, return the empty string.
     * 2. Return context object’s url’s host, serialized.
     */
    if (this._url.host === null) return ""
    return this._algo.hostSerializer(this._url.host)
  }
  set hostname(val: string) {
    /**
     * 1. If context object’s url’s cannot-be-a-base-URL flag is set, then
     * return.
     * 2. Basic URL parse the given value with context object’s url as url and
     * hostname state as state override.
     */
    if (this._url._cannotBeABaseURLFlag) return
    this._algo.basicURLParser(val, undefined, undefined, this._url, 
      ParserState.Hostname)
  }

  /** @inheritdoc */
  get port(): string {
    /**
     * 1. If context object’s url’s port is null, return the empty string.
     * 2. Return context object’s url’s port, serialized.
     */
    if (this._url.port === null) return ""
    return this._url.port.toString()
  }
  set port(val: string) {
    /**
     * 1. If context object’s url cannot have a username/password/port, then 
     * return.
     * 2. If the given value is the empty string, then set context object’s
     * url’s port to null.
     * 3. Otherwise, basic URL parse the given value with context object’s url
     * as url and port state as state override.
     */
    if (this._algo.cannotHaveAUsernamePasswordPort(this._url)) return
    if (val === "") {
      this._url.port = null
    } else {
      this._algo.basicURLParser(val, undefined, undefined, this._url, 
        ParserState.Port)
    }
  }

  /** @inheritdoc */
  get pathname(): string {
    /**
     * 1. If context object’s url’s cannot-be-a-base-URL flag is set, then 
     * return context object’s url’s path[0].
     * 2. If context object’s url’s path is empty, then return the empty string.
     * 3. Return U+002F (/), followed by the strings in context object’s url’s 
     * path (including empty strings), if any, separated from each other by
     * U+002F (/).
     */
    if (this._url._cannotBeABaseURLFlag) return this._url.path[0]
    if (this._url.path.length === 0) return ""
    return '/' + this._url.path.join('/')
  }
  set pathname(val: string) {
    /**
     * 1. If context object’s url’s cannot-be-a-base-URL flag is set, then return.
     * 2. Empty context object’s url’s path.
     * 3. Basic URL parse the given value with context object’s url as url and
     * path start state as state override.
     */
    if (this._url._cannotBeABaseURLFlag) return
    this._url.path = []
    this._algo.basicURLParser(val, undefined, undefined, this._url, 
      ParserState.PathStart)
  }

  /** @inheritdoc */
  get search(): string {
    /**
     * 1. If context object’s url’s query is either null or the empty string, 
     * return the empty string.
     * 2. Return U+003F (?), followed by context object’s url’s query.
     */
    if (this._url.query === null || this._url.query === "") return ""
    return '?' + this._url.query
  }
  set search(val: string) {
    /**
     * 1. Let url be context object’s url.
     * 2. If the given value is the empty string, set url’s query to null,
     * empty context object’s query object’s list, and then return.
     * 3. Let input be the given value with a single leading U+003F (?) removed,
     * if any.
     * 4. Set url’s query to the empty string.
     * 5. Basic URL parse input with url as url and query state as state
     * override.
     * 6. Set context object’s query object’s list to the result of parsing
     * input.
     */
    const url = this._url
    if (val === "") {
      url.query = null
      this._queryObject._list.length = 0
      return
    }
    if (val.startsWith('?')) val = val.substr(1)
    url.query = ""
    this._algo.basicURLParser(val, undefined, undefined, url, ParserState.Query)
    this._queryObject._list = this._algo.urlEncodedStringParser(val)
  }

  /** @inheritdoc */
  get searchParams(): URLSearchParams { return this._queryObject }

  /** @inheritdoc */
  get hash(): string {
    /**
     * 1. If context object’s url’s fragment is either null or the empty string, 
     * return the empty string.
     * 2. Return U+0023 (#), followed by context object’s url’s fragment.
     */
    if (this._url.fragment === null || this._url.fragment === "") return ""
    return '#' + this._url.fragment
  }
  set hash(val: string) {
    /**
     * 1. If the given value is the empty string, then set context object’s
     * url’s fragment to null and return.
     * 2. Let input be the given value with a single leading U+0023 (#) removed,
     * if any.
     * 3. Set context object’s url’s fragment to the empty string.
     * 4. Basic URL parse input with context object’s url as url and fragment
     * state as state override.
     */
    if (val === "") {
      this._url.fragment = null
      return
    }
    if (val.startsWith('#')) val = val.substr(1)
    this._url.fragment = ""
    this._algo.basicURLParser(val, undefined, undefined, this._url, 
      ParserState.Fragment)
  }
  

  /** @inheritdoc */
  toJSON(): string { return this._algo.urlSerializer(this._url) }

  /** @inheritdoc */
  toString(): string {
    return this.href
  }

}
