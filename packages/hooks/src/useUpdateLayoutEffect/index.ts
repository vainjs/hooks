import { useLayoutEffect } from 'react'
import { createUpdateEffct } from '../utils/createUpdateEffct'

export const useUpdateLayoutEffect = createUpdateEffct(useLayoutEffect)
