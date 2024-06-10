import React from 'react'
import './Footers.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
export const Footer = () => {
  return (
   <>
     <div class="footer">
            <div class="container">     
                <div class="row">                       
                    <div class="col-lg-4 col-sm-4 col-xs-12">
                        <div class="single_footer">
                            <h4>Contact Information</h4>
                            <ul>
                                <li><a href="#">Email : Chanakya@gmail.com</a></li>
                                <li><a href="#">Phone : 8967354787</a></li>
                                </ul>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-12">
                        <div class="single_footer single_footer_address">
                            <h4>Page Link</h4>
                            <ul>
                                <li><a href="#">Home</a></li>
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Episodes</a></li>
                                <li><a href="#">Blog</a></li>
                              
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-12">
                        <div class="single_footer single_footer_address">
                            <h4>Subscribe today</h4>
                            <div class="signup_form">                           
                                <form action="#" class="subscribe">
                                    <input type="text" class="subscribe__input" placeholder="Enter Email Address"/>
                                    <button type="button" class="subscribe__btn"><i class="fas fa-paper-plane"></i></button>
                                </form>
                            </div>
                        </div>
                        <div className="social_profile">
            <ul className="social-icons">
                <li><a href="https://facebook.com" className="facebook" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} /></a></li>
                <li><a href="https://twitter.com" className="twitter" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} /></a></li>
                <li><a href="https://instagram.com" className="instagram" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a></li>
            </ul>
        </div>               
                    </div>    
                </div>
                <div class="row">
                    <div class="col-lg-12 col-sm-12 col-xs-12">
                        <p class="copyright">Copyright © 2024 <a href="#">Chanakya-Niti</a>.</p>
                    </div>             
                </div>          
            </div>
        </div>

   </>
    
  )
}
