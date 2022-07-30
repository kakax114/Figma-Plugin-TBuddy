figma.showUI(__html__);

figma.ui.onmessage = (msg) => {
    if (msg.type === 'create-table') {
        //listening on 'Create Table' button pressed
        const input = [
            [1, 2],
            [3, 4],
            [5, 6],
            [7, 8],
        ];
        const arr = [];
        // const input = msg.items

        // console.log(msg.state)
        if (msg.state === 'tableByRow') {
            autoByRow(input, arr);
            console.log('autobyrow');
        } else if (msg.state === 'tableByColumn') {
            autoByCol(input, arr);
            console.log('autobycol');
        }

        figma.ui.postMessage({
            type: 'create-table',
            message: msg.items,
        });
    }
};

const autoByRow = (input, arr) => {
    const mainFrame = figma.createFrame();
    mainFrame.layoutMode = 'VERTICAL';
    mainFrame.counterAxisSizingMode = 'AUTO';
    getRow(input, arr).forEach((row) => {
        mainFrame.appendChild(row);
    });
};

const autoByCol = (input, arr) => {
    const mainFrame = figma.createFrame();
    mainFrame.layoutMode = 'HORIZONTAL';
    mainFrame.counterAxisSizingMode = 'AUTO';
    getCol(input, arr).forEach((col) => {
        mainFrame.appendChild(col);
    });
};

//return a list with frames
const getRow = (input, row) => {
    for (let i = 0; i < input.length; i++) {
        const col = [];
        for (let j = 0; j < input[i].length; j++) {
            col.push(getText(input[i][j]));
        }
        row.push(getColFirst(col));
    }

    return row;
};

const getCol = (input, col) => {
    for (let i = 0; i < input.length; i++) {
        const row = [];
        for (let j = 0; j < input[i].length; j++) {
            row.push(getText(input[i][j]));
        }
        col.push(getRowFirst(row));
    }
    return col;
};

//return a frame with some texts
const getColFirst = (arr) => {
    const frame = figma.createFrame();
    Promise.all(arr).then((nodes) => {
        // console.log(nodes);

        frame.layoutMode = 'HORIZONTAL';
        nodes.forEach((node) => {
            frame.appendChild(node);
        });
        frame.counterAxisSizingMode = 'AUTO';
        // figma.currentPage.selection = nodes;
        // figma.viewport.scrollAndZoomIntoView(nodes);
    });
    return frame;
};

const getRowFirst = (arr) => {
    const frame = figma.createFrame();
    Promise.all(arr).then((nodes) => {
        // console.log(nodes);

        frame.layoutMode = 'VERTICAL';
        nodes.forEach((node) => {
            frame.appendChild(node);
        });
        frame.counterAxisSizingMode = 'AUTO';
    });
    return frame;
};

// figma.closePlugin();

//return a text
const getText = async (i) => {
    const text = figma.createText();
    await figma.loadFontAsync(text.fontName);
    text.characters = i.toString();
    // text.fontSize = 18
    text.fills = [{type: 'SOLID', color: {r: 1, g: 0, b: 0}}];
    return text;
};
