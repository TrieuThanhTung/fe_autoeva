import "./signup.scss"
import { Link } from "react-router-dom"

const Signup = () => {
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Auto Eva.</h1>
          <p>
            Finding the perfect used car has never been easier. 
            Browse thousands of listings from verified sellers, compare prices, and get the best deals.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
          <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="First name" />
            <input type="text" placeholder="Last name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm password" />
            <button>Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup