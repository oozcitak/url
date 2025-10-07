import { suite, test } from 'node:test'
import { deepEqual, throws } from 'node:assert'
import { URL } from "../../lib"
import { isObject } from "@oozcitak/util"

suite('WPT: urltestdata.json', () => {

  const testData = require("./urltestdata.json")

  for (const testCase of testData) {
    if (!isObject(testCase)) continue

    let title = testCase["failure"] ? "FAIL - " : "PASS - "
    title += "input: `" + testCase["input"] + "`"
    if ("base" in testCase) title += " base: `" + testCase["base"] + "`"

    test(title, () => {
      if (testCase["failure"]) {
        if ("base" in testCase) {
          throws(() => new URL(testCase["input"], testCase["base"]))
        } else {
          throws(() => new URL(testCase["input"]))
        }
        throws(() => new URL("about:blank", testCase["input"]))
      } else {
        const url = ("base" in testCase ? new URL(testCase["input"], testCase["base"]) : new URL(testCase["input"], undefined))
        deepEqual(url.href, testCase["href"])
        if ("origin" in testCase) deepEqual(url.origin, testCase["origin"])
        deepEqual(url.protocol, testCase["protocol"])
        deepEqual(url.username, testCase["username"])
        deepEqual(url.password, testCase["password"])
        deepEqual(url.host, testCase["host"])
        deepEqual(url.hostname, testCase["hostname"])
        deepEqual(url.port, testCase["port"])
        deepEqual(url.pathname, testCase["pathname"])
        deepEqual(url.search, testCase["search"])
        deepEqual(url.hash, testCase["hash"])
      }
    })
  }

})

suite('WPT: setters_tests.json', () => {

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
          deepEqual(_getPropertyOf(url, expectedProperty as keyof URL), testCase["expected"][expectedProperty])
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
