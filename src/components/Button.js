import React from 'react';
import './Button.css';

function Button(props){
    return(<div>
        <button onClick={props.callApi}>
            Click to get Joke
        </button>
    </div>)
}

export default Button;