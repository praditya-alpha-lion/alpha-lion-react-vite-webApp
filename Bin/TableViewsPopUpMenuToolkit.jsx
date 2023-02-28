import React, { useState } from 'react'

export default function TableViewsPopUpMenuToolkit() {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className='flex relative'>
            <button onClick={() => setShowMenu(!showMenu)}>
                Show Menu
            </button>
            {showMenu && (
                <div className="absolute top-6 -right-0 bg-white p-4  z-50 shadow-lg border-gray-200 rounded border">
                    <ul>
                        <li>Menu Item 1</li>
                        <li>Menu Item 2</li>
                        <li>Menu Item 3</li>
                    </ul>
                </div>
            )}
        </div>
    );
}
