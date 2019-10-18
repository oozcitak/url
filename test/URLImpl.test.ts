import { URL } from '../src'

describe('URLImpl', () => {

  test('constructor', () => {
    let url: URL
    url = new URL("https://username:password@example.org/path/to/file.aspx?key1=value1&key2=value2#frag")
    expect(url.href).toBe("https://username:password@example.org/path/to/file.aspx?key1=value1&key2=value2#frag")
    url = new URL("/path/to/file.aspx?key1=value1&key2=value2#frag", "https://username:password@example.org/")
    expect(url.href).toBe("https://username:password@example.org/path/to/file.aspx?key1=value1&key2=value2#frag")
  })

})
