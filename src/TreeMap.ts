/**
 * Represents a tree-map.
 */
export class TreeMap<T> {
  protected _root: MapNode<T>

  /**
   * Initializes a new `TreeMap`.
   * 
   * @param min - minimum value
   * @param max - maximum value
   * @param value - default value
   */
  constructor(min: number, max: number, value: T) {
    this._root = new MapNode(min, max, value)
  }

  /**
   * Adds a new range of values.
   * 
   * @param min - minimum value
   * @param max - maximum value
   * @param value - value
   */
  add(min: number, max: number, value: T) {
    this._root.divideNode(min, max, value)
  }

  /**
   * Gets a value.
   * 
   * @param key - a key
   */
  get(key: number): T {
    return this._root.getNodeValue(key)
  }

}

class MapNode<T> {
  protected _min: number
  protected _max: number
  protected _value: T
  protected _left: MapNode<T> | undefined = undefined
  protected _right: MapNode<T> | undefined = undefined

  constructor(min: number, max: number, value: T) {
    this._min = min
    this._max = max
    this._value = value
  }

  divideNode(min: number, max: number, value: T): void {
    if (min < this._min || max > this._max) {
      throw new Error("Map keys outside node limits.")
    }

    if (this._left === undefined && this._right === undefined) {
      if (min === this._min && max === this._max) {
        this._value = value
      } else if (min === this._min) {
        this._left = new MapNode<T>(min, max, value)
        this._right = new MapNode<T>(max + 1, this._max, this._value)
      } else if (max === this._max) {
        this._left = new MapNode<T>(this._min, min - 1, this._value)
        this._right = new MapNode<T>(min, max, value)
      } else if ((min + max) / 2 < (this._min + this._max) / 2) {
        this._left = new MapNode<T>(this._min, max, this._value)
        this._right = new MapNode<T>(max + 1, this._max, this._value)
        this._left.divideNode(min, max, value)
      } else {
        this._left = new MapNode<T>(this._min, min - 1, this._value)
        this._right = new MapNode<T>(min, this._max, this._value)
        this._right.divideNode(min, max, value)
      }
    } else if (this._left === undefined || this. _right === undefined) {
      throw new Error("Invalid maps state.")
    } else {
      if (min >= this._left._min && max <= this._left._max)
        this._left.divideNode(min, max, value)
      else if (min >= this._right._min && max <= this._right._max)
        this._right.divideNode(min, max, value)
      else
        throw new Error("Map keys overlaps with existing keys.")
    }
  }

  getNodeValue(key: number): T {
    if (key < this._min || key > this._max) {
      throw new Error("Map key outside node limits.")
    }

    if (this._left === undefined && this._right === undefined) {
      return this._value
    } else if (this._left === undefined || this. _right === undefined) {
      throw new Error("Invalid maps state.")
    } else if (key >= this._left._min && key <= this._left._max) {
      return this._left._value
    } else if (key >= this._right._min && key <= this._right._max) {
      return this._right._value
    } else {
      throw new Error("Map keys overlaps with existing keys.")
    }
  }
}