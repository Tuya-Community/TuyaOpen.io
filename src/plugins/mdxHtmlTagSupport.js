const fs = require('fs')
const path = require('path')

/**
 * Docusaurus plugin to support HTML-style self-closing tags in MDX
 *
 * This plugin automatically converts HTML-style self-closing tags (like <img>)
 * to JSX-compatible format (<img />) during the build process, allowing
 * MDX to parse them correctly without requiring manual changes to markdown files.
 *
 * Supported tags: img, br, hr, input, meta, link, area, base, col, embed, source, track, wbr
 */
function mdxHtmlTagSupport() {
  return {
    name: 'mdx-html-tag-support',
    async loadContent() {
      // Process blog directory
      const blogDir = path.join(__dirname, '../../blog')
      await processMarkdownFiles(blogDir)

      // Process docs directory if it exists
      const docsDir = path.join(__dirname, '../../docs')
      if (fs.existsSync(docsDir)) {
        await processMarkdownFiles(docsDir)
      }
    },
  }
}

/**
 * Process markdown files in a directory recursively
 * @param {string} dirPath - Directory path to process
 */
async function processMarkdownFiles(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return
  }

  const files = fs.readdirSync(dirPath)

  for (const file of files) {
    const filePath = path.join(dirPath, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      // Recursively process subdirectories
      await processMarkdownFiles(filePath)
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      await processMarkdownFile(filePath)
    }
  }
}

/**
 * Process a single markdown file to fix HTML tags
 * @param {string} filePath - Path to the markdown file
 */
async function processMarkdownFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8')
    let modified = false

    // List of self-closing HTML tags that need JSX-style closing
    const selfClosingTags = [
      'img',
      'br',
      'hr',
      'input',
      'meta',
      'link',
      'area',
      'base',
      'col',
      'embed',
      'source',
      'track',
      'wbr',
    ]

    // Fix each type of self-closing tag
    for (const tag of selfClosingTags) {
      const regex = new RegExp(`<${tag}([^>]*[^/])>`, 'g')
      const newContent = content.replace(regex, `<${tag}$1 />`)

      if (newContent !== content) {
        content = newContent
        modified = true
      }
    }

    // Only write back if content was modified
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8')
      console.log(`[mdx-html-tag-support] Fixed HTML tags in: ${path.relative(process.cwd(), filePath)}`)
    }
  } catch (error) {
    console.warn(`[mdx-html-tag-support] Warning: Could not process file ${filePath}:`, error.message)
  }
}

module.exports = mdxHtmlTagSupport
