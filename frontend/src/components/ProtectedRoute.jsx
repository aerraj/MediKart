import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const location = useLocation()
  if (!localStorage.getItem('user')) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  return children
}

ProtectedRoute.propTypes = { children: PropTypes.node.isRequired }
