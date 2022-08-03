import React, {useState, useEffect} from 'react';
import Toggle from './Toggle';
import '../styles/ui.css';
import Mock from './mock';

const App = () => {
    const [inputText, setInputText] = useState('');
    const [items, setItems] = useState([]);
    const [radioState, setRadioState] = useState('tableByColumn');
    const [returnArray, setReturnArray] = useState([]);
    const [command, setCommand] = useState('');
    const [direction, setDirection] = useState(0);
    const [textMode, setTextMode] = useState(false);

    useEffect(() => {
        // This is how we read messages sent from the plugin controller
        window.onmessage = (event) => {
            const {type, message} = event.data.pluginMessage;
            if (type === 'create-table') {
                setReturnArray(message);
                // setInfo('Message from figma: ' + message.length);
            }
        };
    }, []);

    useEffect(() => {
        if (radioState === 'tableByRow') {
            tableByRow();
        } else {
            tableByColumn();
        }
    }, [inputText]);

    const tableByRow = () => {
        setItems(inputText.split('\n').map((item) => item.split('\t')));
    };

    const tableByColumn = () => {
        setItems(transposeArray(inputText.split('\n').map((item) => item.split('\t'))));
    };

    //function of tableByColumn
    const transposeArray = (arr) => {
        let newItems = [];
        for (let i = 0; i < arr[0].length; i++) {
            let newItem = [];
            for (let j = 0; j < arr.length; j++) {
                newItem.push(arr[j][i]);
            }
            newItems.push(newItem);
        }
        return newItems;
    };

    const onTable = () => {
        parent.postMessage(
            {
                pluginMessage: {
                    type: 'create-table',
                    items,
                    state: radioState,
                },
            },
            '*'
        );
    };

    const handleCommand = (input, move, selectText) => {
        setCommand(input);
        //setdirect is direction plus move
        setDirection(move);
        //settextmode is true
        setTextMode(selectText);

        parent.postMessage(
            {
                pluginMessage: {
                    type: 'command',
                    command: input,
                    direction: move,
                    textMode: selectText,
                },
            },
            '*'
        );
    };

    return (
        <>
            <Mock />
        </>
        // <div>
        //     {/* <img src={require('../assets/logo.svg')} /> */}

        //     <p>Hello World</p>
        //     <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} />
        //     {/* radio button of 2 options, tabeByRow and tableByColumn, default selected to tableByRow */}
        //     <div>
        //         <input
        //             type="radio"
        //             name="radio"
        //             value="tableByRow"
        //             checked={radioState === 'tableByRow'}
        //             onChange={() => {
        //                 tableByRow();
        //                 setRadioState('tableByRow');
        //             }}
        //         />
        //         <label>Autolayout by Row</label>
        //         <input
        //             type="radio"
        //             name="radio"
        //             value="tableByColumn"
        //             checked={radioState === 'tableByColumn'}
        //             onChange={() => {
        //                 tableByColumn();
        //                 setRadioState('tableByColumn');
        //             }}
        //         />
        //         <label>by Column</label>
        //     </div>
        //     <button onClick={onTable}>Create table</button>
        //     {/* button set command to all */}
        //     <br />
        //     Select:
        //     <br />
        //     <button onClick={() => handleCommand('all', 0, textMode)}>All cells</button>
        //     <button onClick={() => handleCommand('topHeader', 0, textMode)}>Top Header</button>
        //     <button onClick={() => handleCommand('sideHeader', 0, textMode)}>Side Header</button>
        //     {/* if command is topheader, render button up and down */}
        //     <br />
        //     {command === 'topHeader' && (
        //         <>
        //             <button onClick={() => handleCommand(command, direction - 1, textMode)}>Up</button>
        //             <button onClick={() => handleCommand(command, direction + 1, textMode)}>Down</button>
        //         </>
        //     )}
        //     {/* if command is sideheader, render button left and right */}
        //     {command === 'sideHeader' && (
        //         <>
        //             <button onClick={() => handleCommand(command, direction - 1, textMode)}>Left</button>
        //             <button onClick={() => handleCommand(command, direction + 1, textMode)}>Right</button>
        //         </>
        //     )}
        //     {/* if command is either all, topHeader, sideHeader, show checkbox set select text to true*/}
        //     {(command === 'all' || command === 'topHeader' || command === 'sideHeader') && (
        //         <>
        //             {/* <input
        //                 type="checkbox"
        //                 checked={textMode}
        //                 onChange={() => handleCommand(command, direction, !textMode)}
        //             />
        //             <label>Select text</label> */}
        //             <Toggle
        //                 checked={textMode}
        //                 onChange={() => handleCommand(command, direction, !textMode)}
        //                 label="Select text"
        //             />

        //         </>
        //     )}
        // </div>
    );
};

export default App;
