import { Link } from "react-router-dom"

const SpendFooter = () => {
  return (
    <footer className="spend-footer" >
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

export default SpendFooter