import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">
                        <button>Home</button>
                    </Link>
                </li>                
                <li><Link to="/queue-view">Queue View</Link></li>
            </ul>
        </nav>
    )
};

export default Nav;

