/**
 * useAnalytics.js
 * Re-exports the useWatchup hook from @watchupltd/react for use across the app.
 * Always call this inside a component that is a descendant of WatchupProvider.
 *
 * Usage:
 *   const watchup = useWatchup()
 *   watchup.track('CV Download')
 *   watchup.track('Section View', { section: 'Work' })
 */
export { useWatchup } from '@watchupltd/react'
