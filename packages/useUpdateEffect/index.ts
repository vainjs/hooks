import { useEffect } from 'react'
import { createUpdateEffct } from '../utils/createUpdateEffct'

const useUpdateEffect = createUpdateEffct(useEffect)

export default useUpdateEffect
