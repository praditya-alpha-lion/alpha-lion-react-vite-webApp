import React from 'react';
import './Sidebar.css';

const SidebarCustom = () => {
    return (
        <div className="sidebar">
            <ul className="sidebar-nav">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li className="has-dropdown">
                    <a href="#">Products</a>
                    <ul className="dropdown">
                        <li><a href="#">Product 1</a></li>
                        <li><a href="#">Product 2</a></li>
                        <li className="has-dropdown">
                            <a href="#">Product 3</a>
                            <ul className="dropdown">
                                <li><a href="#">Subproduct 1</a></li>
                                <li><a href="#">Subproduct 2</a></li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default SidebarCustom;
