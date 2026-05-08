# @vainjs/hooks

[![NPM version](https://img.shields.io/npm/v/@vainjs/hooks.svg?style=flat)](https://npmjs.org/package/@vainjs/hooks)
[![NPM downloads](http://img.shields.io/npm/dm/@vainjs/hooks.svg?style=flat)](https://npmjs.org/package/@vainjs/hooks)

## Install

```sh
$ npm install @vainjs/hooks
```

## Available Hooks

### State Management

- useDeepCompareValue - Compare values deeply and only update state when deep changes occur
- useLocalStorage - Persist state in localStorage
- useSessionStorage - Persist state in sessionStorage

### Effects and Lifecycle

- useDeepCompareEffect - Like useEffect but with deep comparison
- useDeepCompareLayoutEffect - Like useLayoutEffect but with deep comparison
- useUpdateEffect - Run an effect only on updates
- useUpdateLayoutEffect - Run a layout effect only on updates
- useMounted - Hook to check if component is mounted
- useUnmounted - Hook to execute code when component unmounts

### Performance

- useDebounce - Debounce a value
- useDebounceFn - Debounce a function
- useThrottle - Throttle a value
- useThrottleFn - Throttle a function
- useMemoize - Memoize values with custom comparison
- useDeepCompareMemo - Like useMemo with deep comparison

### DOM and Events

- useClickAway - Detect clicks outside an element
- useEventListener - Add event listeners declaratively
- useIntersectionObserver - Track element visibility
- useMutationObserver - Watch for DOM mutations
- useResizeObserver - Track element size changes

### Timing

- useInterval - Set intervals declaratively
- useTimeout - Set timeouts declaratively

### Rendering

- useBatchRender - Render large lists in batches
- useLazyRender - Lazy load and render content
- useWaterfallFlow - Create waterfall layout flows

### Utilities

- useLatest - Always get the latest value
- useLockFn - Prevent function from being called while it's running
- usePagination - Handle pagination logic
- useSearchParams - Handle URL search parameters

## LICENSE

MIT
