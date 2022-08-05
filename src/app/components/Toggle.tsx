//import react
import React from 'react';
import '../styles/Toggle.css';

//export Toggle, it's a checkbox with label
export default function Toggle(props) {
    return (
        <div>
            <div className="switch">
                <div className="switch__1">
                    <input id="switch-1" type="checkbox" checked={props.checked} onChange={props.onChange} />
                    <label htmlFor="switch-1"></label>
                </div>
            </div>
        </div>
    );
}
