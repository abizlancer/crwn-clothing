import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import './navigation.styles.scss'

const Navigation = () => {
  return (
    <Fragment>
      <nav className="nav">
        <Link className="nav-logo-container" to='/'>
          <CrwnLogo className='logo' />
        </Link>
        <ul className="nav-links-container">
          <li><Link className="nav-link" to="/shop">shop</Link></li>
          <li><Link className="nav-link" to="/shop">contact</Link></li>
          <li><Link className="nav-link" to="/sign-in">sign in</Link></li>
          <li><Link className="nav-link" to="/shop">shop</Link></li>
        </ul>
      </nav>
      <Outlet />
    </Fragment>
  );
}
export default Navigation