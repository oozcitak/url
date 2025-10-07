import { basicURLParser, setValidationErrorCallback } from './src/URLAlgorithm'
import { domainToASCII, domainToUnicode } from "url"

const yy = domainToUnicode('http://256.256.256.256.256')
console.log(yy)

setValidationErrorCallback(a => console.log(a))
basicURLParser('http://256.256.256.256.256')