import { useEffect } from 'react'
import { createUpdateEffct } from '../utils/createUpdateEffct'

export const useUpdateEffect = createUpdateEffct(useEffect)
