import React from 'react'
import '../../css/signin.css'
import {FaGithub,FaGoogle,FaTwitter} from 'react-icons/fa6'
const SignIn = () => {
  return (
  <>
  <div class="form-container">
	<p class="title">Login</p>
	<form class="form">
		<div class="input-group">
			<label for="username">Email</label>
			<input type="email" name="email" id="email" placeholder=""/>
		</div>
		<div class="input-group">
			<label for="password">Password</label>
			<input type="password" name="password" id="password" placeholder=""/>
			<div class="forgot">
				<a rel="noopener noreferrer" href="#">Forgot Password ?</a>
			</div>
		</div>
		<button class="sign">Sign in</button>
	</form>
	<div class="social-message">
		<div class="line"></div>
		<p class="message">Login with social accounts</p>
		<div class="line"></div>
	</div>
	<div class="social-icons">
		<button aria-label="Log in with Google" class="icon">
			<FaGoogle/>
		</button>
		<button aria-label="Log in with Twitter" class="icon">
			<FaGithub/>
		</button>
		<button aria-label="Log in with GitHub" class="icon">
			<FaTwitter/>
		</button>
	</div>
	<p class="signup">Don't have an account?
		<a rel="noopener noreferrer" href="/auth/SignUp" class="">Sign up</a>
	</p>
</div>
  </>
  )
}

export default SignIn;
