/**
 * Walks through the code points of a string.
 */
export class StringWalker {
  private _chars: string[]
  private _length: number

  private _pointer: number = 0
  private _codePoint: number | undefined
  private _c: string | undefined
  private _remaining: string | undefined
  private _substring: string | undefined

  /**
   * Initializes a new `StringWalker`.
   * 
   * @param input - input string
   */
  constructor(input: string) {
    this._chars = Array.from(input)
    this._length = this._chars.length
  }

  /**
   * Determines if the current position is beyond the end of string.
   */
  get eof(): boolean { return this._pointer >= this._length }

  /**
   * Returns the number of code points in the input string.
   */
  get length(): number { return this._length }

  /**
   * Returns the current code point. Returns `-1` if the position is beyond
   * the end of string.
   */
  codePoint(): number {
    if (this._codePoint === undefined) {
      this._codePoint = (this.eof ? 
        -1 : this._chars[this._pointer].codePointAt(0) || -1)
    }
    return this._codePoint
  }

  /**
   * Returns the current character. Returns an empty string if the position is 
   * beyond the end of string.
   */
  c(): string {
    if (this._c === undefined) {
      this._c = (this.eof ? "" : this._chars[this._pointer])
    }
    return this._c
  }

  /**
   * Returns the remaining string.
   */
  remaining(): string {
    if (this._remaining === undefined) {
      this._remaining = (this.eof ? 
        "" : this._chars.slice(this._pointer + 1).join(''))
    }
    return this._remaining
  }

  /**
   * Returns the substring from the current character to the end of string.
   */
  substring(): string {
    if (this._substring === undefined) {
      this._substring = (this.eof ? 
        "" : this._chars.slice(this._pointer).join(''))
    }
    return this._substring
  }

  /**
   * Gets or sets the current position.
   */
  get pointer() : number { return this._pointer }
  set pointer(val: number) {
    if (val === this._pointer) return
    
    this._pointer = val

    this._codePoint = undefined
    this._c = undefined
    this._remaining = undefined
    this._substring = undefined
  }
}