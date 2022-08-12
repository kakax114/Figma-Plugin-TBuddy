# Figma Plugin React Template

![62862431-71537f00-bd0e-11e9-85db-d97c0fb729a4](https://user-images.githubusercontent.com/16322616/62862692-46b5f600-bd0f-11e9-93b0-75955d1de8f3.png)


This template contains the react example as shown on [Figma Docs](https://www.figma.com/plugin-docs/intro/), with some structural changes and extra tooling.

## Quickstart
* Run `yarn` to install dependencies.
* Run `yarn build:watch` to start webpack in watch mode.
* Open `Figma` -> `Plugins` -> `Development` -> `Import plugin from manifest...` and choose `manifest.json` file from this repo.

⭐ To change the UI of your plugin (the react code), start editing [App.tsx](./src/app/components/App.tsx).  
⭐ To interact with the Figma API edit [controller.ts](./src/plugin/controller.ts).  
⭐ Read more on the [Figma API Overview](https://www.figma.com/plugin-docs/api/api-overview/).

## Toolings
This repo is using:
* React + Webpack
* TypeScript
* Prettier precommit hook


# About T-buddy
T-buddy
Creating real tables in figma simplified, select power up.

Reality
making data more believable is a way to improve the quality of prototype, get buy-ins from nitpicking stakehodlers, think about edge cases and 
you might enjoy crunching data and forumla in Excel to contruct a belieable financal statemen, 
or you might enjoy braindumping ideas and manucel cells and columns t before bringin to figma. 
Perference aside, your data tools like Excel, powerBI, sheets, has the effiency edge for data-related tasks over figma
You got handed over a table and re-create that in Figma, CVS are some the the most common export format for report or table designer


Figma chanllenge
2 of the decisions designer often have to make when Visualizations a table
1. table layout
figma's auto layout it more powerful than ever
though the element cell for both are the same 
row
duplicate rows is easy, fill data screen quickly

column
easy column re-ordering and resizing
columns are huge content column 

table layout is when you decide if you should use a row based layout or column based, it's a major decision to make for design library



2. select to style
2 things, make select cells across-grain easy, and fullyleverage figma's built-in styleing tools. Across-the-grain is a makeup word, but essentially it's chanllege of selecting cells against the your layout direction ie select all cells in a row when the table in colum based.

it's a CLEAN plugin, no buldware on unneassry layers, no pre-define styles, front-end only processing, developer will never get your data. 

reduce the pitfall of any decision you make in autolayout
it makes duplicating row easy for column-based layouts
and it can make column adjustment easy for row-based table layouts
all these are done without breaking the layer structure

select all cells to style the table look and feel, such as background color, underline border, horitonzal and vertical paddings. 

Obviously it can help you with styling text, in text mode, it's drill in text based on your selected cells. size, fonts, color and the table dynamatically fit to the new adjustments

top header select the tabl header where can use apply different design stylee to stand out, you can also use the arrow to traverse the the row if you wish to select other rows of cells. 

side header select the first colum on the left, you can treat it alike column selector by using the left and right arrows


