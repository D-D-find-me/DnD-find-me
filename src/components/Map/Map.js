import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Map = () => {
    const [zipcode, setZipcode] = useState('');

    // Need a method to return nearby adventures

    return(
        <div>
            <form>
                <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={e => setZipcode(e.target.value)}
                />
            </form>
            <div>
                Map will appear here
            </div>
        </div>
    )
}

export default Map;
