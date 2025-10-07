import { suite, test } from 'node:test'
import { deepEqual, throws } from 'node:assert'
import { URL, URLSearchParams } from "../../lib"

suite('URLSearchParams', () => {

  test('constructor', () => {
    let search: URLSearchParams
    search = new URLSearchParams("key1=value1&key2=value2")
    deepEqual(search.toString(), "key1=value1&key2=value2")
    search = new URLSearchParams([["key1", "value1"], ["key2", "value2"]])
    deepEqual(search.toString(), "key1=value1&key2=value2")
    search = new URLSearchParams({ key1: "value1", key2: "value2" })
    deepEqual(search.toString(), "key1=value1&key2=value2")
    search = new URLSearchParams()
    deepEqual(search.toString(), "")

    throws(() => new URLSearchParams([["key1", "value1", "invalid"]]))
  })

  test('_updateSteps()', () => {
    const url = new URL("https://example.org?key1=value1&key2=value2")
    const search = url.searchParams
    search.append("key3", "value3")
    deepEqual(url.search, "?key1=value1&key2=value2&key3=value3")
    search.delete("key1")
    search.delete("key2")
    search.delete("key3")
    deepEqual(url.search, "")
  })

  test('append()', () => {
    const search = new URLSearchParams("key1=value1&key2=value2")
    search.append("key3", "value3")

    deepEqual(search.toString(), "key1=value1&key2=value2&key3=value3")
  })

  test('delete()', () => {
    const search = new URLSearchParams("key1=value1&key2=value2")
    search.delete("key2")

    deepEqual(search.toString(), "key1=value1")
  })

  test('get()', () => {
    const search = new URLSearchParams("key1=value1&key2=value2")
    deepEqual(search.get("key1"), "value1")
    deepEqual(search.get("key3"), null)
  })

  test('getAll()', () => {
    const search = new URLSearchParams("key1=value1&key2=value2&key1=value3")
    deepEqual(search.getAll("key1"), ["value1", "value3"])
    deepEqual(search.getAll("key3"), [])
  })

  test('has()', () => {
    const search = new URLSearchParams("key1=value1&key2=value2")
    deepEqual(search.has("key1"), true)
    deepEqual(search.has("key3"), false)
  })

  test('set()', () => {
    const search = new URLSearchParams("key1=value1&key2=value2&key1=value3")
    search.set("key1", "value4")
    deepEqual(search.toString(), "key1=value4&key2=value2")
    search.set("key3", "value3")
    deepEqual(search.toString(), "key1=value4&key2=value2&key3=value3")
  })

  test('sort()', () => {
    const search = new URLSearchParams("key1=value5&key3=value3&key2=value2&key1=value1&key3=value4")
    search.sort()
    deepEqual(search.toString(), "key1=value5&key1=value1&key2=value2&key3=value3&key3=value4")
  })

  test('iterator()', () => {
    const items: [string, string][] = []
    const search = new URLSearchParams("key1=value1&key2=value2&key3=value3")
    for (const item of search) {
      items.push(item)
    }
    deepEqual(items, [["key1", "value1"], ["key2", "value2"], ["key3", "value3"]])
  })

})
