import PropTypes from 'prop-types'
import { X } from 'lucide-react'
import { createPortal } from 'react-dom'

export default function Modal({ children, onClose }) {
  return createPortal(<div className="modal-overlay" role="dialog" aria-modal="true" onMouseDown={onClose}><div className="cart-drawer" onMouseDown={(e) => e.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="Close cart"><X /></button>{children}</div></div>, document.getElementById('cart-root'))
}
Modal.propTypes = { children: PropTypes.node.isRequired, onClose: PropTypes.func.isRequired }
