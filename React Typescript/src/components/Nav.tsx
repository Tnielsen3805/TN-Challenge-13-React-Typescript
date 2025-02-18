import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <ul className='nav'>
        <li className='nav-item'>
          <Link to='/'>Home</Link>
        </li>
        <li className='nav-item'>
          <Link to='/potential-candidates'>Potential Candidates</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
