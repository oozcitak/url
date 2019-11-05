import { URL, URLSearchParams } from '../../src'

describe('URLSearchParams', () => {

  test('constructor', () => {
    let search: URLSearchParams
    search = new URLSearchParams("key1=value1&key2=value2")
    expect(search.toString()).toBe("key1=value1&key2=value2")
    search = new URLSearchParams([["key1", "value1"], ["key2", "value2"]])
    expect(search.toString()).toBe("key1=value1&key2=value2")
    search = new URLSearchParams({ key1: "value1", key2: "value2" })
    expect(search.toString()).toBe("key1=value1&key2=value2")
    search = new URLSearchParams()
    expect(search.toString()).toBe("")

    expect(() => new URLSearchParams([["key1", "value1", "invalid"]])).toThrow()
  })

  test('_updateSteps()', () => {
    const url = new URL("https://example.org?key1=value1&key2=value2")
    const search = url.searchParams
    search.append("key3", "value3")
    expect(url.search).toBe("?key1=value1&key2=value2&key3=value3")
    search.delete("key1")
    search.delete("key2")
    search.delete("key3")
    expect(url.search).toBe("")
  })

  test('append()', () => {
    const search = new URLSearchParams("key1=value1&key2=value2")
    search.append("key3", "value3")

    expect(search.toString()).toBe("key1=value1&key2=value2&key3=value3")
  })

  test('delete()', () => {
    const search = new URLSearchParams("key1=value1&key2=value2")
    search.delete("key2")

    expect(search.toString()).toBe("key1=value1")
  })

  test('get()', () => {
    const search = new URLSearchParams("key1=value1&key2=value2")
    expect(search.get("key1")).toBe("value1")
    expect(search.get("key3")).toBeNull()
  })

  test('getAll()', () => {
    const search = new URLSearchParams("key1=value1&key2=value2&key1=value3")
    expect(search.getAll("key1")).toEqual(["value1", "value3"])
    expect(search.getAll("key3")).toEqual([])
  })

  test('has()', () => {
    const search = new URLSearchParams("key1=value1&key2=value2")
    expect(search.has("key1")).toBe(true)
    expect(search.has("key3")).toBe(false)
  })

  test('set()', () => {
    const search = new URLSearchParams("key1=value1&key2=value2&key1=value3")
    search.set("key1", "value4")
    expect(search.toString()).toBe("key1=value4&key2=value2")
    search.set("key3", "value3")
    expect(search.toString()).toBe("key1=value4&key2=value2&key3=value3")
  })

  test('sort()', () => {
    const search = new URLSearchParams("key1=value5&key3=value3&key2=value2&key1=value1&key3=value4")
    search.sort()
    expect(search.toString()).toBe("key1=value5&key1=value1&key2=value2&key3=value3&key3=value4")
  })

  test('iterator()', () => {
    const items: [string, string][] = []
    const search = new URLSearchParams("key1=value1&key2=value2&key3=value3")
    for (const item of search) {
      items.push(item)
    }
    expect(items).toEqual([["key1", "value1"], ["key2", "value2"], ["key3", "value3"]])
  })

})
