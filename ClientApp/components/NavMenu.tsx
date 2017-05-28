import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <div className="main-nav">
                <div className="navbar navbar-inverse">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <Link className="navbar-brand" to={'/'}>boilerplate_typescript_react_redux_netcore_docker</Link>
                </div>
                <div className='c"clearfix"/div>
                <div className='n"navbar-collapse collapse"
                    <ul className='n"nav navbar-nav"
                        <li>
                            <NavLink exact to={'/'} activeClassName='act"active"                               <span className='gly"glyphicon glyphicon-home"pan> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/counter'} activeClassName='activ"active"                             <span className='glyph"glyphicon glyphicon-education"n> Counter
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/fetchdata'} activeClassName='active'"active"                           <span className='glyphic"glyphicon glyphicon-th-list" Fetch data
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}
