import React from 'react';
import '../../css/Auth.css';
import { FaGithub, FaGoogle, FaTwitter } from 'react-icons/fa6';

const SignUp = () => {
	return (
		<div className="form-container mb-4">
			<p className="title">Sign Up</p>

			<form className="form">
				<div className="input-group">
					<label htmlFor="username">Username</label>
					<input type="text" name="username" id="username" placeholder="" />
				</div>
				<div className="input-group">
					<label htmlFor="username">Email</label>
					<input type="email" name="email" id="email" placeholder="" />
				</div>
				<div className="input-group">
					<label htmlFor="password">Password</label>
					<input type="password" name="password" id="password" placeholder="" />
					<div className="forgot">
						<a rel="noopener noreferrer" href="#">Forgot Password ?</a>
					</div>
				</div>
				<button className="sign">Sign In</button>
			</form>

			<div className="social-message">
				<div className="line"></div>
				<p className="message">Login with social accounts</p>
				<div className="line"></div>
			</div>

			<div className="social-icons">
				<button aria-label="Log in with Google" className="icon">
					<FaGoogle />
				</button>
				<button aria-label="Log in with Twitter" className="icon">
					<FaGithub />
				</button>
				<button aria-label="Log in with GitHub" className="icon">
					<FaTwitter />
				</button>
			</div>

		</div>
	)
}

export default SignUp;
