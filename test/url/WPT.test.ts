import { URL, util } from '../../src'

describe('WPT: urltestdata.json', () => {

  const testData = require("./urltestdata.json")

  for (const testCase of testData) {
    if (!util.isObject(testCase)) continue

    let title = testCase["failure"] ? "FAIL - " : "PASS - "
    title += "input: `" + testCase["input"] + "`"
    if ("base" in testCase) title += " base: `" + testCase["base"] + "`"

    test(title, () => {
      if (testCase["failure"]) {
        if ("base" in testCase) {
          expect(() => new URL(testCase["input"], testCase["base"])).toThrow()
        } else {
          expect(() => new URL(testCase["input"])).toThrow()
        }
        expect(() => new URL("about:blank", testCase["input"])).toThrow()
      } else {
        const url = ("base" in testCase ? new URL(testCase["input"], testCase["base"]) : new URL(testCase["input"]))
        expect(url.href).toBe(testCase["href"])
        if ("origin" in testCase) expect(url.origin).toBe(testCase["origin"])
        expect(url.protocol).toBe(testCase["protocol"])
        expect(url.username).toBe(testCase["username"])
        expect(url.password).toBe(testCase["password"])
        expect(url.host).toBe(testCase["host"])
        expect(url.hostname).toBe(testCase["hostname"])
        expect(url.port).toBe(testCase["port"])
        expect(url.pathname).toBe(testCase["pathname"])
        expect(url.search).toBe(testCase["search"])
        expect(url.hash).toBe(testCase["hash"])
      }
    })
  }

})

describe('WPT: setters_tests.json', () => {

  const testData = require("./setters_tests.json")

  for (const name in testData) {
    if (name === "comment") continue
    const propertyName = name as keyof URL
    const testCases = testData[propertyName]

    for (const testCase of testCases) {
      const title = "set " + propertyName + " = `" + testCase["new_value"] + "` of URL(`" + testCase["href"] + "`)"

      test(title, () => {
        const url = new URL(testCase["href"])
        _setPropertyOf(url, propertyName, testCase["new_value"])
        for (const expectedProperty in testCase["expected"]) {
          expect(_getPropertyOf(url, expectedProperty as keyof URL)).toBe(testCase["expected"][expectedProperty])
        }
      })
    }
  }

})

const _getPropertyOf = function<T, K extends keyof T>(source: T, key: K) {
  return source[key]
}

const _setPropertyOf = function<T, K extends keyof T>(source: T, key: K, val: any) {
  source[key] = val
}
