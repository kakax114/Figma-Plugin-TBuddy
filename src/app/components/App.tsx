import React, {useState, useEffect} from 'react';
// import '../styles/ui.css';

const App = () => {
    const [info, setInfo] = useState('');
    const [inputText, setInputText] = useState('');
    const [items, setItems] = useState([]);
    const [radioState, setRadioState] = useState('tableByRow');

    useEffect(() => {
        // This is how we read messages sent from the plugin controller
        window.onmessage = (event) => {
            const {type, message} = event.data.pluginMessage;
            if (type === 'create-table') {
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
            <p>{info}</p>
        </div>
    );
};

export default App;
