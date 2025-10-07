import { suite, test } from 'node:test'
import { deepEqual } from 'node:assert'
import { setValidationErrorCallback, basicURLParser } from '../../lib/URLAlgorithm'

suite('URLAlgorithm', () => {

  test('setValidationErrorCallback', () => {
    const messages: string[] = []
    setValidationErrorCallback((message) => messages.push(message))
    basicURLParser("https://username:password@example.org")
    deepEqual(messages.length, 1)
  })

})
