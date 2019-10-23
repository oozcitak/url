import { StringWalker } from '../../src/util'

describe('StringWalker', () => {

  test('constructor', () => {
    const walker = new StringWalker("input")
    expect(walker.length).toBe(5)
  })

  test('eof', () => {
    const walker = new StringWalker("input")
    expect(walker.eof).toBe(false)
    walker.pointer = 10
    expect(walker.eof).toBe(true)
  })

  test('length', () => {
    const walker = new StringWalker("input")
    expect(walker.length).toBe(5)
  })

  test('codePoint()', () => {
    const walker = new StringWalker("input")
    expect(walker.codePoint()).toBe(0x69)
    expect(walker.codePoint()).toBe(0x69)
    walker.pointer = 10
    expect(walker.codePoint()).toBe(-1)
  })

  test('c()', () => {
    const walker = new StringWalker("input")
    expect(walker.c()).toBe("i")
    expect(walker.c()).toBe("i")
    walker.pointer = 10
    expect(walker.c()).toBe("")
  })

  test('remaining()', () => {
    const walker = new StringWalker("input")
    expect(walker.remaining()).toBe("nput")
    expect(walker.remaining()).toBe("nput")
    walker.pointer = 10
    expect(walker.remaining()).toBe("")
  })

  test('substring()', () => {
    const walker = new StringWalker("input")
    expect(walker.substring()).toBe("input")
    expect(walker.substring()).toBe("input")
    walker.pointer = 10
    expect(walker.substring()).toBe("")
  })

  test('pointer', () => {
    const walker = new StringWalker("input")
    expect(walker.pointer).toBe(0)
    expect(walker.c()).toBe("i")
    walker.pointer = 0
    expect(walker.c()).toBe("i")
    walker.pointer = 1
    expect(walker.c()).toBe("n")
    walker.pointer = 2
    expect(walker.c()).toBe("p")
    walker.pointer = 3
    expect(walker.c()).toBe("u")
    walker.pointer = 4
    expect(walker.c()).toBe("t")
    walker.pointer = 5
    expect(walker.c()).toBe("")
    expect(walker.eof).toBe(true)
  })

})
