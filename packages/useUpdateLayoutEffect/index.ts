import { useLayoutEffect } from 'react'
import { createUpdateEffct } from '../utils/createUpdateEffct'

const useUpdateLayoutEffect = createUpdateEffct(useLayoutEffect)

export default useUpdateLayoutEffect
