import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className='footer-box'>
        <div className='home-tab'>
            <span>
            <Link to="/" className="link-style">Home</Link>
            </span>
        </div>
        <div className='spend-tab'>
            <span>
            <Link to="/details" className="link-style">Hours</Link>
            </span>
        </div>
    </footer>
  )
}

export default Footer