import { suite, test } from 'node:test'
import { deepEqual, throws } from 'node:assert'
import { URL } from "../../lib"

suite('URL', () => {

  test('constructor', () => {
    let url: URL
    url = new URL("https://username:password@example.org/path/to/file.aspx?key1=value1&key2=value2#frag")
    deepEqual(url.href, "https://username:password@example.org/path/to/file.aspx?key1=value1&key2=value2#frag")
    url = new URL("/path/to/file.aspx?key1=value1&key2=value2#frag", "https://username:password@example.org/")
    deepEqual(url.href, "https://username:password@example.org/path/to/file.aspx?key1=value1&key2=value2#frag")
    url = new URL("/path/to/file.aspx", "https://example.org/")
    deepEqual(url.href, "https://example.org/path/to/file.aspx")
    throws(() => new URL("/path/to/file.aspx", "invalid url"))
    throws(() => new URL("invalid url"))
  })

  test('href', () => {
    const url = new URL("/path/to/file.aspx?key1=value1&key2=value2#frag", "https://username:password@example.org/")
    deepEqual(url.href, "https://username:password@example.org/path/to/file.aspx?key1=value1&key2=value2#frag")
    url.href = "https://username:password@example.org/path/to/file.aspx?key1=value1&key2=value2#frag"
    deepEqual(url.href, "https://username:password@example.org/path/to/file.aspx?key1=value1&key2=value2#frag")
    url.href = "https://example.org/path/to/file.aspx"
    deepEqual(url.href, "https://example.org/path/to/file.aspx")
    throws(() => url.href = "invalid url")
  })

  test('origin', () => {
    const url = new URL("/path/to/file.aspx?key1=value1&key2=value2#frag", "https://username:password@example.org:8080/")
    deepEqual(url.origin, "https://example.org:8080")
  })

  test('protocol', () => {
    const url = new URL("/path/to/file.aspx?key1=value1&key2=value2#frag", "https://username:password@example.org/")
    deepEqual(url.protocol, "https:")
    url.protocol = "ftp:"
    deepEqual(url.href, "ftp://username:password@example.org/path/to/file.aspx?key1=value1&key2=value2#frag")
  })

  test('username', () => {
    const url = new URL("/path/to/file.aspx?key1=value1&key2=value2#frag", "https://username:password@example.org/")
    deepEqual(url.username, "username")
    url.username = "somebody"
    deepEqual(url.href, "https://somebody:password@example.org/path/to/file.aspx?key1=value1&key2=value2#frag")
    url.href = "file://file.html"
    url.username = "val"
    deepEqual(url.username, "")
  })

  test('password', () => {
    const url = new URL("/path/to/file.aspx?key1=value1&key2=value2#frag", "https://username:password@example.org/")
    deepEqual(url.password, "password")
    url.password = "secret"
    deepEqual(url.href, "https://username:secret@example.org/path/to/file.aspx?key1=value1&key2=value2#frag")
    url.href = "file://file.html"
    url.password = "val"
    deepEqual(url.password, "")
  })

  test('host', () => {
    const url = new URL("/path/to/file.aspx?key1=value1&key2=value2#frag", "https://username:password@example.org:8080/")
    deepEqual(url.host, "example.org:8080")
    url.host = "ample.gov"
    deepEqual(url.href, "https://username:password@ample.gov:8080/path/to/file.aspx?key1=value1&key2=value2#frag")
    url.href = "http://example.org"
    deepEqual(url.host, "example.org")

    const mailUrl = new URL("mailto:person@example.org")
    deepEqual(mailUrl.host, "")
    mailUrl.host = "example.org"
    deepEqual(mailUrl.host, "")
  })

  test('hostname', () => {
    const url = new URL("/path/to/file.aspx?key1=value1&key2=value2#frag", "https://username:password@example.org:8080/")
    deepEqual(url.hostname, "example.org")
    url.hostname = "ample.gov"
    deepEqual(url.href, "https://username:password@ample.gov:8080/path/to/file.aspx?key1=value1&key2=value2#frag")

    const mailUrl = new URL("mailto:person@example.org")
    deepEqual(mailUrl.hostname, "")
    mailUrl.hostname = "example.org"
    deepEqual(mailUrl.hostname, "")
  })

  test('port', () => {
    const url = new URL("/path/to/file.aspx?key1=value1&key2=value2#frag", "https://username:password@example.org:8080/")
    deepEqual(url.port, "8080")
    url.port = "8081"
    deepEqual(url.href, "https://username:password@example.org:8081/path/to/file.aspx?key1=value1&key2=value2#frag")
    url.port = ""
    deepEqual(url.href, "https://username:password@example.org/path/to/file.aspx?key1=value1&key2=value2#frag")
    url.href = "http://example.org"
    deepEqual(url.port, "")

    const mailUrl = new URL("mailto:person@example.org")
    deepEqual(mailUrl.port, "")
    mailUrl.port = "8080"
    deepEqual(mailUrl.port, "")
  })

  test('pathname', () => {
    const url = new URL("/path/to/file.aspx?key1=value1&key2=value2#frag", "https://username:password@example.org:8080/")
    deepEqual(url.pathname, "/path/to/file.aspx")
    url.pathname = "/root/404.html"
    deepEqual(url.href, "https://username:password@example.org:8080/root/404.html?key1=value1&key2=value2#frag")
    url.href = "http://example.org"
    deepEqual(url.pathname, "/")

    const mailUrl = new URL("mailto:person@example.org")
    deepEqual(mailUrl.pathname, "person@example.org")
    mailUrl.pathname = "/path/to/file.aspx"
    deepEqual(mailUrl.pathname, "person@example.org")
  })

  test('search', () => {
    const url = new URL("/path/to/file.aspx?key1=value1&key2=value2#frag", "https://username:password@example.org:8080/")
    deepEqual(url.search, "?key1=value1&key2=value2")
    url.search = "?k3=v3&k4=v4"
    deepEqual(url.href, "https://username:password@example.org:8080/path/to/file.aspx?k3=v3&k4=v4#frag")
    url.search = "k3=v3&k4=v4"
    deepEqual(url.search, "?k3=v3&k4=v4")
    url.search = ""
    deepEqual(url.search, "")
  })

  test('searchParams', () => {
    const url = new URL("/path/to/file.aspx?key1=value1&key2=value2#frag", "https://username:password@example.org:8080/")
    deepEqual(url.searchParams.toString(), "key1=value1&key2=value2")
  })

  test('hash', () => {
    const url = new URL("/path/to/file.aspx?key1=value1&key2=value2#frag", "https://username:password@example.org:8080/")
    deepEqual(url.hash, "#frag")
    url.hash = "#fragment"
    url.href = "http://example.org"
    deepEqual(url.hash, "")
    url.hash = "fragment"
    deepEqual(url.hash, "#fragment")
    url.hash = ""
    deepEqual(url.hash, "")
  })

  test('toJSON()', () => {
    const url = new URL("/path/to/file.aspx?key1=value1&key2=value2#frag", "https://username:password@example.org:8080/")
    deepEqual(url.toJSON(), "https://username:password@example.org:8080/path/to/file.aspx?key1=value1&key2=value2#frag")
  })

  test('toString()', () => {
    const url = new URL("/path/to/file.aspx?key1=value1&key2=value2#frag", "https://username:password@example.org:8080/")
    deepEqual(url.toString(), "https://username:password@example.org:8080/path/to/file.aspx?key1=value1&key2=value2#frag")
  })

})
