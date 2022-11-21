import { rainbow } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import SyntaxHighlighter from 'react-syntax-highlighter'

// target을 받아서
const CopyButton = ({ target }) => {
  const handleCopy = async () => {
    if (target) {
      try {
        await navigator.clipboard.writeText(target)
        alert('copied!')
      } catch (error) {
        alert(`copy failed ${error}`)
      }
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="absolute right-2 top-2 bg-white dark:text-gray-800 rounded-lg px-2"
    >
      copy
    </button>
  )
}

export default function CodeBlock({ children }) {
  return (
    <div className="relative">
      <CopyButton target={children} />
      <SyntaxHighlighter showLineNumbers style={rainbow}>
        {children}
      </SyntaxHighlighter>
    </div>
  )
}
