import React, {useState, useEffect} from 'react';
// import '../styles/ui.css';

const App = () => {
    const [inputText, setInputText] = useState('');
    const [items, setItems] = useState([]);
    const [radioState, setRadioState] = useState('tableByColumn');
    //returnArray usestate
    const [returnArray, setReturnArray] = useState([]);
    const [command, setCommand] = useState('');

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

    const handleCommand = (input) => {
        setCommand(input);
        parent.postMessage(
            {
                pluginMessage: {
                    type: 'command',
                    command: input,
                },
            },
            '*'
        );
    };

    // const getHeaders = () => {
    //     const temp = [];
    //     returnArray.map((item) => {
    //         temp.push(item[0]);
    //     });
    //     return temp;
    // };

    return (
        <div>
            {/* <img src={require('../assets/logo.svg')} /> */}
            <h2>Hello World</h2>
            <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} />
            {/* radio button of 2 options, tabeByRow and tableByColumn, default selected to tableByRow */}
            <div>
                <input
                    type="radio"
                    name="radio"
                    value="tableByRow"
                    checked={radioState === 'tableByRow'}
                    onChange={() => {
                        tableByRow();
                        setRadioState('tableByRow');
                    }}
                />
                <label>Autolayout by Row</label>
                <input
                    type="radio"
                    name="radio"
                    value="tableByColumn"
                    checked={radioState === 'tableByColumn'}
                    onChange={() => {
                        tableByColumn();
                        setRadioState('tableByColumn');
                    }}
                />
                <label>by Column</label>
            </div>
            <button onClick={onTable}>Create table</button>
            {/* button set command to all */}
            <br />
            Select:
            <br />
            <button onClick={() => handleCommand('all')}>All cells</button>
            <button onClick={() => handleCommand('topHeader')}>Top Header</button>
            <button onClick={() => handleCommand('sideHeader')}>Side Header</button>
        </div>
    );
};

export default App;
