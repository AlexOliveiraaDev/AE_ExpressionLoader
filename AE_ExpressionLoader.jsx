(function (thisObj) {
    // Initial Configuration
    var scriptName = "AE_ExpressionLoader";
    var settingKey = "ae_expressionFolder";
    var folderPath = "";

    // Function to load the saved path
    function loadFolderPath() {
        if (app.settings.haveSetting(scriptName, settingKey)) {
            folderPath = app.settings.getSetting(scriptName, settingKey);
        }
    }

    // Function to save the path
    function saveFolderPath(path) {
        app.settings.saveSetting(scriptName, settingKey, path);
    }

    // Function to apply the expression
    function applyExpression(expression) {
        var selectedProperties = app.project.activeItem.selectedProperties;
        if (selectedProperties.length > 0) {
            for (var i = 0; i < selectedProperties.length; i++) {
                selectedProperties[i].expression = expression;
            }
        } else {
            alert("Select a property to apply the expression.");
        }
    }

    // Function to replace variables in the expression
    function replaceVariables(expression, variables) {
        for (var key in variables) {
            var regex = new RegExp("{{" + key + "}}", "g");
            expression = expression.replace(regex, variables[key]);
        }
        return expression;
    }

    function expressionPanel(thisObj) {
	loadFolderPath();
        var win = (thisObj instanceof Panel) ? thisObj : new Window('palette', 'Expression Loader', undefined);
        win.spacing = 6;

        // Create main panel
        var mainGroup = win.add('group');
        mainGroup.orientation = 'column';
        mainGroup.margins = [10, 10, 10, 10];
        
        // Group for selecting the folder
        var folderGroup = mainGroup.add('group');
        folderGroup.orientation = 'row';
        folderGroup.add("statictext", undefined, "Folder:");
        var folderText = folderGroup.add("edittext", [0, 0, 300, 20], folderPath);
        var browseButton = folderGroup.add("button", undefined, "Browse");

        // Listbox to show .txt files
        var listbox = mainGroup.add("listbox", [0, 0, 300, 150]);

        // Button to refresh the list of files
        var refreshButton = mainGroup.add("button", undefined, "Refresh List");

        // Panel for customizable variables
        var varsPanel = mainGroup.add("panel", undefined, "Custom Variables");
        varsPanel.orientation = "column";
        varsPanel.alignChildren = ["left", "fill"];

        // Button to apply the expression
        var applyButton = mainGroup.add("button", undefined, "Apply Expression");

        // Function to update the list of files
        function updateFileList() {
            listbox.removeAll();
            if (folderText.text != "") {
                var folder = new Folder(folderText.text);
                if (folder.exists) {
                    var files = folder.getFiles("*.txt");
                    for (var i = 0; i < files.length; i++) {
                        // Replace %20 with space in the file name
                        var fileName = files[i].name.replace(/%20/g, " ");
                        listbox.add("item", fileName);
                    }
                }
            }
        }

        // Function to update the customizable variables fields
        function updateVariablesPanel(expression) {
            // Clear existing content
            while (varsPanel.children.length > 0) { // Keep the statictext "Custom Variables" intact
                varsPanel.remove(varsPanel.children[0]);
            }

            // Add debug information
            var variableRegex = /{{(.*?)}}/g;
            var match;
            var variablesFound = false;

            while ((match = variableRegex.exec(expression)) !== null) {
                variablesFound = true;
                var variableName = match[1];
                var group = varsPanel.add("group");
                group.orientation = "row";
                group.add("statictext", undefined, variableName + ":");
                var input = group.add("edittext", [0, 0, 200, 20], "");
                input.name = variableName;
            }

            if (!variablesFound) {
                varsPanel.add("statictext", undefined, "No variables found.");
            }

            // Update the variables panel layout
            varsPanel.layout.layout(true);
            win.layout.layout(true); // Update the main window layout
        }

        // Event when clicking Browse
        browseButton.onClick = function () {
            var folder = Folder.selectDialog("Select the folder with expressions");
            if (folder) {
                folderText.text = folder.fsName;
                saveFolderPath(folder.fsName);
                updateFileList();
            }
        };

        // Event when clicking Refresh List
        refreshButton.onClick = function () {
            updateFileList();
        };

        // Event when selecting a file from the list
        listbox.onChange = function () {
            if (listbox.selection) {
                var fileName = listbox.selection.text;
                // Replace space with %20 in the file name
                var file = new File(folderText.text + "/" + fileName.replace(/ /g, "%20"));
                if (file.exists) {
                    file.open("r");
                    var expression = file.read();
                    file.close();
                    updateVariablesPanel(expression); // Update the customizable variables fields
                }
            }
        };

        // Event when clicking Apply
        applyButton.onClick = function () {
            if (listbox.selection) {
                var fileName = listbox.selection.text;
                // Replace space with %20 in the file name
                var file = new File(folderText.text + "/" + fileName.replace(/ /g, "%20"));
                if (file.exists) {
                    file.open("r");
                    var expression = file.read();
                    file.close();
                    var variables = {};
                    for (var i = 0; i < varsPanel.children.length; i++) {
                        var group = varsPanel.children[i];
                        if (group.children.length > 1) {
                            var input = group.children[1];
                            variables[input.name] = input.text;
                        }
                    }
                    var finalExpression = replaceVariables(expression, variables);
                    applyExpression(finalExpression);
                } else {
                    alert("The selected file does not exist.");
                }
            } else {
                alert("Select an expression from the list.");
            }
        };

        updateFileList();
        win.layout.layout(true);
        win.onResizing = win.onResize = function () {
            this.layout.resize();
        };
        if (win instanceof Window) {
            win.center();
            win.show();
        } else {
            win.layout.layout(true);
        }
    }

    expressionPanel(thisObj);
})(this);
