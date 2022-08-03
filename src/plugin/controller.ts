figma.showUI(__html__, {width: 277, height: 503});

//global variables
var message = null;
var command = '';
var input = [
    [1, 2],
    [3, 4],
    [5, 6],
    [7, 8],
];

figma.ui.onmessage = (msg) => {
    if (msg.type === 'command') {
        command = msg.command;
        console.log(command);
        console.log(msg.textMode);

        const selection = figma.currentPage.findAll((node) => node.name === 'Cell');
        if (command === 'all') {
            figma.currentPage.selection = selection;
            if (msg.textMode) {
                figma.currentPage.selection = selectText(selection);
            }
        }
        if (command === 'sideHeader') {
            const nodes = colSelect(selection, input, msg.direction);
            figma.currentPage.selection = nodes;
            if (msg.textMode) {
                figma.currentPage.selection = selectText(nodes);
            }
        }
        if (command === 'topHeader') {
            const nodes = rowSelect(selection, input, msg.direction);
            figma.currentPage.selection = nodes;
            if (msg.textMode) {
                figma.currentPage.selection = selectText(nodes);
            }
        }
    }
    if (msg.type === 'create-table') {
        //listening on 'Create Table' button pressed

        // input = msg.items;
        message = msg;
        const arr = [];

        if (message.state === 'tableByRow') {
            autoByRow(input, arr);
        } else if (message.state === 'tableByColumn') {
            autoByCol(input, arr);
        }

        figma.ui.postMessage({
            type: 'create-table',
            message: arr,
        });
    }
};

const colSelect = (selection, input, number) => {
    const select = [];
    if (message.state === 'tableByColumn') {
        const base = input[number].length;
        for (let i = 0; i < base; i++) {
            select.push(selection[number * base + i]);
        }
    } else if (message.state === 'tableByRow') {
        const base = input.length;
        for (let i = 0; i < base; i++) {
            select.push(selection[number + i * input[number].length]);
        }
    }
    return select;
};

const selectText = (nodes) => {
    const text = [];
    nodes.forEach((node) => {
        node.findChildren((child) => {
            if (child.type === 'TEXT') {
                text.push(child);
            }
        }, true);
    });
    return text;
};

const rowSelect = (selection, input, number) => {
    const select = [];
    if (message.state === 'tableByColumn') {
        const base = input.length;
        for (let i = 0; i < base; i++) {
            select.push(selection[number + i * input[number].length]);
        }
    } else if (message.state === 'tableByRow') {
        const base = input[number].length;
        for (let i = 0; i < base; i++) {
            select.push(selection[number * base + i]);
        }
    }
    return select;
};

const autoByCol = (input, arr) => {
    const mainFrame = figma.createFrame();
    mainFrame.layoutMode = 'HORIZONTAL';
    mainFrame.counterAxisSizingMode = 'AUTO';
    getCol(input, arr).forEach((col) => {
        mainFrame.appendChild(col);
    });
    mainFrame.name = 'Mainframe';
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

const getRowFirst = (arr) => {
    const frame = figma.createFrame();
    Promise.all(arr).then((nodes) => {
        frame.layoutMode = 'VERTICAL';
        nodes.forEach((node) => {
            frame.appendChild(node);
        });
        frame.counterAxisSizingMode = 'AUTO';
    });
    return frame;
};

const getText = async (i) => {
    const cell = figma.createFrame();
    cell.name = 'Cell';
    const text = figma.createText();
    await figma.loadFontAsync(text.fontName);
    text.characters = i.toString();
    cell.appendChild(text);
    cell.layoutMode = 'HORIZONTAL';
    if (message.state === 'tableByColumn') {
        cell.primaryAxisSizingMode = 'FIXED'; //horizontal
        cell.counterAxisSizingMode = 'AUTO'; //vertical
        cell.layoutAlign = 'STRETCH';
    } else if (message.state === 'tableByRow') {
        cell.primaryAxisSizingMode = 'FIXED'; //horizontal
        cell.resizeWithoutConstraints(150, 30);
        cell.counterAxisSizingMode = 'AUTO'; //veritcal
    }
    return cell;
};

const autoByRow = (input, arr) => {
    const mainFrame = figma.createFrame();
    mainFrame.layoutMode = 'VERTICAL';
    mainFrame.counterAxisSizingMode = 'AUTO';
    getRow(input, arr).forEach((row) => {
        mainFrame.appendChild(row);
    });
    mainFrame.name = 'Mainframe';
};

// return a list with frames
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

// return a frame with some texts
const getColFirst = (arr) => {
    const frame = figma.createFrame();
    Promise.all(arr).then((nodes) => {
        frame.layoutMode = 'HORIZONTAL';
        nodes.forEach((node) => {
            frame.appendChild(node);
        });
        frame.counterAxisSizingMode = 'AUTO';
    });
    return frame;
};

// figma.closePlugin();
