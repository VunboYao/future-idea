
interface T {
  [prop: number]:number
}
type Ky = keyof T

interface T {
}

type Result = keyof ['a', 'b', 'c']
