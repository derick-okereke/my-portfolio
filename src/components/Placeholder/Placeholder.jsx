export default function Placeholder({ children, text }) {
  if (!import.meta.env.DEV) {
    return null
  }

  return (
    <span className="placeholder" title="Development placeholder (hidden in production)">
      {text || children}
    </span>
  )
}
