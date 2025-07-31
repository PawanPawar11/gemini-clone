import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // You can choose different themes

const MarkdownRenderer = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        // Custom styling for different elements
        h1: ({ children }) => (
          <h1
            style={{
              fontSize: "1.875rem",
              fontWeight: "600",
              marginBottom: "1rem",
              color: "var(--color-gray-900)",
            }}
          >
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              marginBottom: "0.75rem",
              marginTop: "1.5rem",
              color: "var(--color-gray-900)",
            }}
          >
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "0.5rem",
              marginTop: "1.25rem",
              color: "var(--color-gray-900)",
            }}
          >
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p
            style={{
              marginBottom: "1rem",
              lineHeight: "1.6",
              color: "var(--color-gray-800)",
            }}
          >
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul
            style={{
              marginBottom: "1rem",
              paddingLeft: "1.5rem",
              listStyleType: "disc",
            }}
          >
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol
            style={{
              marginBottom: "1rem",
              paddingLeft: "1.5rem",
              listStyleType: "decimal",
            }}
          >
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li
            style={{
              marginBottom: "0.25rem",
              color: "var(--color-gray-800)",
            }}
          >
            {children}
          </li>
        ),
        blockquote: ({ children }) => (
          <blockquote
            style={{
              borderLeft: "4px solid var(--color-gray-300)",
              paddingLeft: "1rem",
              margin: "1rem 0",
              fontStyle: "italic",
              color: "var(--color-gray-600)",
            }}
          >
            {children}
          </blockquote>
        ),
        code: ({ inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");
          return !inline ? (
            <pre
              style={{
                background: "var(--color-gray-100)",
                padding: "1rem",
                borderRadius: "var(--border-radius)",
                overflow: "auto",
                marginBottom: "1rem",
                border: "1px solid var(--color-gray-200)",
              }}
            >
              <code className={className} {...props}>
                {children}
              </code>
            </pre>
          ) : (
            <code
              style={{
                background: "var(--color-gray-100)",
                padding: "0.125rem 0.25rem",
                borderRadius: "var(--border-radius)",
                fontSize: "0.875em",
                color: "var(--color-gray-800)",
              }}
              {...props}
            >
              {children}
            </code>
          );
        },
        table: ({ children }) => (
          <div style={{ overflowX: "auto", marginBottom: "1rem" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                border: "1px solid var(--color-gray-200)",
              }}
            >
              {children}
            </table>
          </div>
        ),
        th: ({ children }) => (
          <th
            style={{
              padding: "0.75rem",
              textAlign: "left",
              borderBottom: "2px solid var(--color-gray-200)",
              backgroundColor: "var(--color-gray-50)",
              fontWeight: "600",
            }}
          >
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td
            style={{
              padding: "0.75rem",
              borderBottom: "1px solid var(--color-gray-200)",
            }}
          >
            {children}
          </td>
        ),
        a: ({ children, href }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--color-black)",
              textDecoration: "underline",
              textDecorationColor: "var(--color-gray-400)",
            }}
          >
            {children}
          </a>
        ),
        strong: ({ children }) => (
          <strong style={{ fontWeight: "600", color: "var(--color-gray-900)" }}>
            {children}
          </strong>
        ),
        em: ({ children }) => (
          <em style={{ fontStyle: "italic" }}>{children}</em>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
