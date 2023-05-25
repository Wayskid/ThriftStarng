import { BsFacebook, BsInstagram, BsWhatsapp } from "react-icons/bs";
import "../sassStyles/footer.scss";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerLeft">
          <p className="footerLogo">
            ThriftStar<small className="logoSmall">ng</small>
          </p>
          <ul className="footerDet">
            <p>&copy; 2023</p>
            <p>Made by Ways</p>
          </ul>
      </div>
      <div className="footerRight">
          <div className="socials">
            <div className="social">
              <BsWhatsapp />
              <p>(+234) 07080598310</p>
            </div>
            <div className="social">
              <BsInstagram />
              <p>ThriftStarng</p>
            </div>
            <div className="social">
              <BsFacebook />
              <p>ThriftStarng</p>
            </div>
          </div>
          <ul className="footerLinks">
            <Link to="/new_arrivals">New Arrivals</Link>
            <Link to="/sales">Sales</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/about">About</Link>
          </ul>
      </div>
    </footer>
  );
}
