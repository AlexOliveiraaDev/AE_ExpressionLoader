# Expression Loader for After Effects

![print.png](https://i.postimg.cc/W4BF05TF/print.png)
## Overview

Expression Loader is an After Effects addon designed to simplify the application of expressions by creating a centralized library of reusable expressions. This tool enhances your workflow by allowing you to easily manage and apply expressions directly within After Effects.

## Features

- **Expression Library**: Organize your expressions in a dedicated folder and access them easily from within After Effects.
- **Customizable Variables**: Automatically detects and allows customization of variables wrapped in `{{variable}}` within your expression files.
- **Dockable Panel**: Integrated directly into After Effects as a dockable panel for convenient access.
- **Open Source**: Free to use and open for contributions. Improve and extend the tool as needed!

## Installation

1. **Download**: Clone or download the repository to your local machine.
2. **Add to After Effects**:
   - Move the `ExpressionLoader.jsx` file to your After Effects `Scripts` folder:
     - On Windows: `C:\Program Files\Adobe\Adobe After Effects <version>\Support Files\Scripts\ScriptUI Panels`
     - On macOS: `/Applications/Adobe After Effects <version>/Scripts`
   - Restart After Effects if it was running.

## Usage

1. **Setup Expression Files**: 
   - Create a folder to store your `.txt` expression files.
   - Write your expressions, and use the `{{variable}}` format for variables you wish to customize.

2. **Open the Addon**:
   - Go to `Window` > `Expression Loader` to open the panel.

3. **Select the Folder**:
   - Click the "Browse" button in the panel to choose the folder containing your expression files.
   - The panel will list all `.txt` files available in the selected folder.

4. **Choose and Apply Expressions**:
   - Select an expression file from the list.
   - The panel will display input fields for variables wrapped in `{{variable}}`. Customize these values as needed.
   - Click the "Apply Expression" button to apply the expression with the customized values to your selected properties in After Effects.

## Example

Given an expression file `wiggle.txt` with the following content:

```
timeX = {{timeX}};
timeY = {{timeY}};

valueX = {{valueX}};
valueY = {{valueY}};

x = wiggle(timeX, valueX);
y = wiggle(timeY, valueY);
[x[0], y[1]]
```

When you select this file in the panel, you'll be prompted to enter values for `timeX`, `timeY`, `valueX`, and `valueY`. These values will then be applied to the expression.

## Contributing

Expression Loader is an open-source project, and contributions are welcome! If you'd like to help improve the tool, please:

1. Fork the repository.
2. Create a new branch for your changes.
3. Submit a pull request with a detailed description of your modifications.

Feel free to report issues or suggest features by opening an issue in the GitHub repository.

## License

Expression Loader is licensed under the [MIT License](LICENSE.md). Feel free to use, modify, and distribute it as per the terms of this license.

## Contact

For any questions or support, please reach out via [GitHub Issues](https://github.com/AlexOliveiraaDev/AE_ExpressionLoader/issues).

Happy animating!
