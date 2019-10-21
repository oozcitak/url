import { URL, algorithm } from '../src'

describe('URLImpl', () => {

  test('constructor', () => {
    let url: URL
    url = new URL("https://username:password@example.org/path/to/file.aspx?key1=value1&key2=value2#frag")
    expect(url.href).toBe("https://username:password@example.org/path/to/file.aspx?key1=value1&key2=value2#frag")
    url = new URL("/path/to/file.aspx?key1=value1&key2=value2#frag", "https://username:password@example.org/")
    expect(url.href).toBe("https://username:password@example.org/path/to/file.aspx?key1=value1&key2=value2#frag")
    url = new URL("/path/to/file.aspx", "https://example.org/")
    expect(url.href).toBe("https://example.org/path/to/file.aspx")
    expect(() => new URL("/path/to/file.aspx", "invalid url")).toThrow()
    expect(() => new URL("invalid url")).toThrow()
  })

  test('href', () => {
    const url = new URL("/path/to/file.aspx?key1=value1&key2=value2#frag", "https://username:password@example.org/")
    expect(url.href).toBe("https://username:password@example.org/path/to/file.aspx?key1=value1&key2=value2#frag")
    url.href = "https://username:password@example.org/path/to/file.aspx?key1=value1&key2=value2#frag"
    expect(url.href).toBe("https://username:password@example.org/path/to/file.aspx?key1=value1&key2=value2#frag")
    url.href = "https://example.org/path/to/file.aspx"
    expect(url.href).toBe("https://example.org/path/to/file.aspx")
    expect(() => url.href = "invalid url").toThrow()
  })

  test('origin', () => {
    const url = new URL("/path/to/file.aspx?key1=value1&key2=value2#frag", "https://username:password@example.org:8080/")
    expect(url.origin).toBe("https://example.org:8080")
  })

  test('protocol', () => {
    const url = new URL("/path/to/file.aspx?key1=value1&key2=value2#frag", "https://username:password@example.org/")
    expect(url.protocol).toBe("https:")
    url.protocol = "ftp:"
    expect(url.href).toBe("ftp://username:password@example.org/path/to/file.aspx?key1=value1&key2=value2#frag")
  })

  test('username', () => {
    const url = new URL("/path/to/file.aspx?key1=value1&key2=value2#frag", "https://username:password@example.org/")
    expect(url.username).toBe("username")
    url.username = "somebody"
    expect(url.href).toBe("https://somebody:password@example.org/path/to/file.aspx?key1=value1&key2=value2#frag")
    url.href = "file://file.html"
    url.username = "val"
    expect(url.username).toBe("")
  })
  
  test('password', () => {
    const url = new URL("/path/to/file.aspx?key1=value1&key2=value2#frag", "https://username:password@example.org/")
    expect(url.password).toBe("password")
    url.password = "secret"
    expect(url.href).toBe("https://username:secret@example.org/path/to/file.aspx?key1=value1&key2=value2#frag")
    url.href = "file://file.html"
    url.password = "val"
    expect(url.password).toBe("")
  })

  test('host', () => {
    const url = new URL("/path/to/file.aspx?key1=value1&key2=value2#frag", "https://username:password@example.org:8080/")
    expect(url.host).toBe("example.org:8080")
    url.host = "ample.gov"
    expect(url.href).toBe("https://username:password@ample.gov:8080/path/to/file.aspx?key1=value1&key2=value2#frag")
    url.href = "http://example.org"
    expect(url.host).toBe("example.org")

    const mailUrl = new URL("mailto:person@example.org")
    expect(mailUrl.host).toBe("")
    mailUrl.host = "example.org"
    expect(mailUrl.host).toBe("")
  })

  test('hostname', () => {
    const url = new URL("/path/to/file.aspx?key1=value1&key2=value2#frag", "https://username:password@example.org:8080/")
    expect(url.hostname).toBe("example.org")
    url.hostname = "ample.gov"
    expect(url.href).toBe("https://username:password@ample.gov:8080/path/to/file.aspx?key1=value1&key2=value2#frag")

    const mailUrl = new URL("mailto:person@example.org")
    expect(mailUrl.hostname).toBe("")
    mailUrl.hostname = "example.org"
    expect(mailUrl.hostname).toBe("")
  })

  test('port', () => {
    const url = new URL("/path/to/file.aspx?key1=value1&key2=value2#frag", "https://username:password@example.org:8080/")
    expect(url.port).toBe("8080")
    url.port = "8081"
    expect(url.href).toBe("https://username:password@example.org:8081/path/to/file.aspx?key1=value1&key2=value2#frag")
    url.port = ""
    expect(url.href).toBe("https://username:password@example.org/path/to/file.aspx?key1=value1&key2=value2#frag")
    url.href = "http://example.org"
    expect(url.port).toBe("")

    const mailUrl = new URL("mailto:person@example.org")
    expect(mailUrl.port).toBe("")
    mailUrl.port = "8080"
    expect(mailUrl.port).toBe("")
  })

  test('pathname', () => {
    const url = new URL("/path/to/file.aspx?key1=value1&key2=value2#frag", "https://username:password@example.org:8080/")
    expect(url.pathname).toBe("/path/to/file.aspx")
    url.pathname = "/root/404.html"
    expect(url.href).toBe("https://username:password@example.org:8080/root/404.html?key1=value1&key2=value2#frag")
    url.href = "http://example.org"
    expect(url.pathname).toBe("/")

    const mailUrl = new URL("mailto:person@example.org")
    expect(mailUrl.pathname).toBe("person@example.org")
    mailUrl.pathname = "/path/to/file.aspx"
    expect(mailUrl.pathname).toBe("person@example.org")
  })

  test('search', () => {
    const url = new URL("/path/to/file.aspx?key1=value1&key2=value2#frag", "https://username:password@example.org:8080/")
    expect(url.search).toBe("?key1=value1&key2=value2")
    url.search = "?k3=v3&k4=v4"
    expect(url.href).toBe("https://username:password@example.org:8080/path/to/file.aspx?k3=v3&k4=v4#frag")
    url.search = "k3=v3&k4=v4"
    expect(url.search).toBe("?k3=v3&k4=v4")
    url.search = ""
    expect(url.search).toBe("")
  })

  test('searchParams', () => {
    const url = new URL("/path/to/file.aspx?key1=value1&key2=value2#frag", "https://username:password@example.org:8080/")
    expect(url.searchParams.toString()).toBe("key1=value1&key2=value2")
  })

  test('hash', () => {
    const url = new URL("/path/to/file.aspx?key1=value1&key2=value2#frag", "https://username:password@example.org:8080/")
    expect(url.hash).toBe("#frag")
    url.hash = "#fragment"
    url.href = "http://example.org"
    expect(url.hash).toBe("")
    url.hash = "fragment"
    expect(url.hash).toBe("#fragment")
    url.hash = ""
    expect(url.hash).toBe("")
  })

  test('toJSON()', () => {
    const url = new URL("/path/to/file.aspx?key1=value1&key2=value2#frag", "https://username:password@example.org:8080/")
    expect(url.toJSON()).toBe("https://username:password@example.org:8080/path/to/file.aspx?key1=value1&key2=value2#frag")
  })

  test('toString()', () => {
    const url = new URL("/path/to/file.aspx?key1=value1&key2=value2#frag", "https://username:password@example.org:8080/")
    expect(url.toString()).toBe("https://username:password@example.org:8080/path/to/file.aspx?key1=value1&key2=value2#frag")
  })

})
