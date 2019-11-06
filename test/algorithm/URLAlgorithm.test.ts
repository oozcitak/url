import { URLAlgorithm } from '../../src'

describe('URLAlgorithm', () => {

  test('constructor', () => {
    const messages: string[] = []
    const algo = new URLAlgorithm((message) => messages.push(message))
    algo.basicURLParser("https://username:password@example.org")
    expect(messages.length).toBe(1)
  })

})
