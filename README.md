# rp-dashboard-tha

Front end dashboard exercise

###### Stack: TypeScript, Redux, ReduxToolkit, Tailwind

###### How to Use: Try it out live [here](https://ssjkhan.github.io/rp-dashboard-tha/)!

![App Screenshot](https://raw.githubusercontent.com/ssjkhan/rp-dashboard-tha/main/images/screenshot.png?raw=true)

## Features

- Data driven component and state design with redux and redux toolkit
- Loosely coupled components for modularity and agile development
- Custom React TS hook for modal click behaviour
- Robust removal and insertion of data and rows
- Cascading deletion and error checking when removing data that an existing
  evalStatement references

## Design

- The dashboard state consists of two slices, the raw data a user needs to
  analyze, and evaluation statements they need to execute
- Data:
  - data is 2D, with an arbitary number of features available (E1, ..., EN) and
    parameters (R1, ..., RN)
  - each datum is a binary value, and represented in state as one of (1,0)
  - on the user input, entering the string "X" or "x" in a cell is interpreted
    as 1, and all other entries as 0
- EvalStatements:
  - Statements are basic addition operations on any two version for the same
    feature
  - Statements are evaluated for all features, and then those below the passing
    threshold of at least one feature are listed as missing for this
    evalStatement
  - Statements are any combination of available parameters for all features

## Next Steps

- Persisting state to localStorage and server
- Integration with GoogleSheets and Zapier for automated workflow

## Key TakeAways

- Data driven design greatly aids development timelines and processes, making
  application logic easier to reason about
- Layouts and understanding client requirements are essential at the planning
  phase of the project. Changes later in the development pipeline are more
  costly in dev time.
