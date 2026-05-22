/**
 * Client module: pan and zoom for Mermaid diagrams with bottom-right control buttons.
 * Runs after route update so mermaid containers are rendered.
 */
import Panzoom from '@panzoom/panzoom'

const MERMAID_SELECTOR = '.docusaurus-mermaid-container'
const DATA_INIT = 'data-mermaid-panzoom-init'
const WRAPPER_CLASS = 'mermaid-panzoom-wrapper'
const BUTTONS_CLASS = 'mermaid-panzoom-buttons'

function createButton(label, title, onClick) {
  const btn = document.createElement('button')
  btn.type = 'button'
  btn.className = 'mermaid-panzoom-btn'
  btn.setAttribute('aria-label', title)
  btn.title = title
  btn.textContent = label
  btn.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()
    onClick()
  })
  return btn
}

function initMermaidPanZoom() {
  const containers = document.querySelectorAll(MERMAID_SELECTOR)
  containers.forEach((el) => {
    if (el.getAttribute(DATA_INIT) === 'true') return

    const wrapper = document.createElement('div')
    wrapper.className = WRAPPER_CLASS
    el.parentNode.insertBefore(wrapper, el)
    wrapper.appendChild(el)

    const panzoom = Panzoom(el, {
      maxScale: 5,
      minScale: 0.5,
      step: 0.2,
      cursor: 'move',
      touchAction: 'none',
    })

    wrapper.addEventListener('wheel', (e) => {
      e.preventDefault()
      panzoom.zoomWithWheel(e)
    })
    wrapper.addEventListener('dblclick', () => panzoom.reset())

    const bar = document.createElement('div')
    bar.className = BUTTONS_CLASS
    bar.appendChild(createButton('+', 'Zoom in', () => panzoom.zoomIn({ animate: true })))
    bar.appendChild(createButton('−', 'Zoom out', () => panzoom.zoomOut({ animate: true })))
    bar.appendChild(createButton('⟲', 'Reset view', () => panzoom.reset()))
    wrapper.appendChild(bar)

    el.setAttribute(DATA_INIT, 'true')
  })
}

export default {
  onRouteDidUpdate() {
    setTimeout(initMermaidPanZoom, 800)
  },
}
