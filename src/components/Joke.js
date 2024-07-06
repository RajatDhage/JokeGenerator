// import React from 'react';
// import Button from './Button';
// import axios from 'axios';
// import './Joke.css'
// import { useState } from 'react';

// function Joke(){

//     const [Joke, setJoke] = useState("");

//     async function apiHandler(){
//         // fetch("https://v2.jokeapi.dev/joke/Programming,Dark,Spooky")
//         // .then((res) => res.json())
//         // .then((data) => {
//         //     if (data.type === "single") {
//         //         setJoke(data.joke);
//         //     } else {
//         //         setJoke(`${data.setup} - ${data.delivery}`);
//         //     }
//         // })
//         // .catch((error) => console.error('Error fetching joke:', error));

//         try {
//             const response = await axios.post(
//                 'https://api.openai.com/v1/engines/davinci-codex/completions',
//                 {
//                     prompt: "Tell me a joke in Marathi.",
//                     max_tokens: 50,
//                     n: 1,
//                     stop: null,
//                     temperature: 0.7,
//                 },
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             );

//             console.log('API Response:', response.data);
//             const jokeText = response.data.choices[0].text.trim();
//             setJoke(jokeText);
//         } catch (error) {
//             console.error('Error fetching joke:', error);
//         }
//     };

//     return(
//         <div>
//             <Button callApi = {apiHandler} />
//             <div className='jokePara'>
//                 <p>{Joke}</p>
//             </div>
//         </div>
//     );
// }

// export default Joke;

import React, { useState } from 'react';
import Button from './Button';
import axios from 'axios';
import './Joke.css';

function Joke() {
    const [joke, setJoke] = useState("");
    const [error, setError] = useState("");

    async function apiHandler() {
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/engines/text-davinci-003/completions',
                {
                    prompt: "Tell me a joke in Marathi.",
                    max_tokens: 50,
                    n: 1,
                    stop: null,
                    temperature: 0.7,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('API Response:', response.data);

            if (response.data.choices && response.data.choices.length > 0) {
                const jokeText = response.data.choices[0].text.trim();
                setJoke(jokeText);
            } else {
                throw new Error('No joke found in the response');
            }
        } catch (error) {
            console.error('Error fetching joke:', error);
            setError('Failed to fetch joke. Please try again later.');
        }
    }

    return (
        <div>
            <Button callApi={apiHandler} />
            <div className='jokePara'>
                <p>{joke}</p>
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
}

export default Joke;
