import { setValidationErrorCallback, basicURLParser } from '../../src/URLAlgorithm'

describe('URLAlgorithm', () => {

  test('setValidationErrorCallback', () => {
    const messages: string[] = []
    setValidationErrorCallback((message) => messages.push(message))
    basicURLParser("https://username:password@example.org")
    expect(messages.length).toBe(1)
  })

})
