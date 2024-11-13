import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <div>
        <footer className="d-flex flex-wrap justify-content-center align-items-center py-3 my-4 border-top">
            <div className="col-12 d-flex justify-content-center align-items-center">
              Designed and Built with ❤️ in India
                <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                    <span style={{ fontSize: '1.25rem' }}>© 2024 MediKart, Inc</span>
                </Link>
            </div>
            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            </ul>
        </footer>
    </div>
  )
}
