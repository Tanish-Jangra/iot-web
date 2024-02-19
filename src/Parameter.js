const Decimal = require('decimal.js');

export function Parameter(title, jsonArray) {

    let subParameterArrayList = new Array();


    function getTitle() {
        return title;
    }


    for (let i = 0; i < jsonArray?.length; i++) {
        let subParameterJson = jsonArray[i];
        addSubParameter(subParameterJson);
    }


    function getSubParameter(name) {
        for (let j = 0; j < subParameterArrayList.length; j++) {
            if (subParameterArrayList[j].getName === name) {
                return subParameterArrayList[j];
            }
        }
        return null;
    }

    function addSubParameter(subParameterJsonObject) {
        // Check if subParameter already exists
        let pos = -1;
        let name = subParameterJsonObject.name;
        let sp = getSubParameter(name);

        // Add a new subParameter if it does not exist
        if (sp === null) {
            subParameterArrayList.push(
                SubParameter(name
                    , 'prefix' in subParameterJsonObject ? subParameterJsonObject.prefix : ""
                    , subParameterJsonObject.value
                    , 'suffix' in subParameterJsonObject ? subParameterJsonObject.suffix : ""
                    , subParameterJsonObject.type
                    , 'editable' in subParameterJsonObject ? subParameterJsonObject.editable : false
                    , 'format' in subParameterJsonObject ? subParameterJsonObject.format : null
                    , 'logged' in subParameterJsonObject ? subParameterJsonObject.logged : false));
                    //console.log(subParameterArrayList[subParameterArrayList.length-1]);

        }
        // Change the value of the existing parameter if it already exists
        else {
            sp.setValue(subParameterJsonObject.value);
            //    sp.setLogged(subParameterJsonObject.getBoolean("logged"));
        }
    }

    function getSubParameterArrayList() {
        return subParameterArrayList;
    }


    function getReadableValues() {
        let value=[];
        subParameterArrayList.forEach((subParameter) => {
            value.push(subParameter.getReadableValue());
        })
        return value;
    }
    function getModelName() {
        let value;
        subParameterArrayList.forEach((subParameter) => {
            if (subParameter.name === "Model")
                value=subParameter.getReadableValue();

        })
        return value;
    }
    function getFirmwareName() {
        let value;
        subParameterArrayList.forEach(subParameter => {
            if (subParameter.name === "Firmware")
                value=subParameter.getReadableValue();
        })
        return value;
    }

    function numOfValues() {
        return subParameterArrayList.length;
    }

    function SubParameter(name, prefix, value, suffix, type, editable, format, logged) {

        let min, max, step;  // Bigdecimal was used in java
        let options;

        if (!(type === "trig")) {
            if (format != null) {
                max = 'max' in format ? format.max : 0;
                min = 'min' in format ? format.min : 0;
                step = 'step' in format ? format.step : 0;
                options = new Array();
                formatOptions(format, jsonArray);
                if ('option' in format) {
                    let arr = format.option;
                    for (let i = 0; i < arr.length; i++) {
                        options.push(arr[i]);
                    }
                }
                options = getValidOptions();
            } else {
                max = 0;
                min = 0;
                options = new Array();
                step = 0;
            }
        }


        function getType() {
            return type;
        }

        function isEditable() {
            return editable;
        }

        function isLogged() {
            return logged;
        }

        function getOptions() {
            return options;
        }

        function formatOptions(format, jsonArray) {
            if (format.hasOwnProperty("option")) {
                let arr = format.option;
                for (let i = 0; i < arr.length; i++) {
                    options.push(arr[i]);
                }
            } else if (format.hasOwnProperty("reference")) {
                let s = format.reference;
                for (let i = 0; i < jsonArray.length; i++) {
                    let subParameterJson = jsonArray[i];
                    let s1 = subParameterJson.name;
                    if (s1 === s) {
                        let jsonObject = subParameterJson.format;
                        if (jsonObject.hasOwnProperty("option")) {
                            let arr = jsonObject.option;
                            for (let j = 0; j < arr.length; j++) {
                                options.push(arr[j]);
                            }
                        } else {
                            formatOptions(jsonObject, jsonArray);
                        }
                        break;
                    }
                }
            }
        }


        function getValue() {
            if (type.toLowerCase() === "float") {
                let bd = new Decimal(value);
                bd = bd.toFixed(3);

                return bd.toString();










                // let bd = value;

    // Use toFixed to ensure the number has a maximum of 3 decimal digits
                // const formattedNumber = bd.toFixed(3);

    // Optionally, you can convert the formatted number to a string
                // return formattedNumber.toString();
                // let bd = value;
                // bd.toFixed(3);

                //df.setMaximumFractionDigits(3);
                //df.setMinimumFractionDigits(0);
                //df.setGroupingUsed(false);
                // return bd.toString();  // check return type later
            } else if (type.toLowerCase() === "int") {
                return value.toString();
            } else if (type.toLowerCase() === "bool") {
                if ("1" === value || "yes" === value.toString().toLowerCase() || "true" === value.toString().toLowerCase() || "on" === value.toString().toLowerCase()) {
                    return "Yes";
                }
                else {
                    return "No";
                }
            } else if (type.toLowerCase() === "datetime") {
                //     Date date = new Date(Long.parseLong(value));
                //     DateFormat simple = new SimpleDateFormat("dd MMM yyyy HH:mm:ss:SSS", Locale.getDefault());
                // return simple.format(date);
                return value;
            } else if (type.toLowerCase() === "time") {
                return value;
            } else {
                return value;
            }
        }

        function getValidOptions() {
            let optList = new Array();

            if (!editable) {
                return optList;
            }

            if (options.length != 0) {
                for (let i = 0; i < options.length; i++) {
                    optList.push(appendPrefixSuffix(options[i]));
                }
            } else if (type === "bool") {
                optList.push(appendPrefixSuffix("No"));
                optList.push(appendPrefixSuffix("Yes"));
            } else {
                for (let i = min; i <= max; i += step) {
                    if (type === "int") {
                        optList.push(appendPrefixSuffix(i.toString()));
                    } else {
                        let bd = new Decimal(i);
                        bd = bd.toFixed(3);
                        optList.push(appendPrefixSuffix(bd));
                        // return bd.toString();
                        // const formattedNumber = i.toFixed(3);
                        // optList.push(appendPrefixSuffix(formattedNumber));
                        // i.toFixed(3);
                        //     DecimalFormat df = new DecimalFormat();
                        // df.setMaximumFractionDigits(3);
                        // df.setMinimumFractionDigits(0);
                        // df.setGroupingUsed(false);
                        // optList.push(appendPrefixSuffix(i.toString()));
                    }
                }
            }

            return optList;
        }

        function appendPrefixSuffix(value) {
            let text="";
            if (!(prefix === "")) {
                text+=(prefix+" ");
            }
            text+=value;
            if (!(suffix === "")) {
                text+=(" "+suffix);
            }
            return text;
        }


        function getPrefixValueSuffix() {
            return appendPrefixSuffix(getValue());
        }

        function convertOptionToValue(option) {
            let res = option;
            if (!(prefix === "")) {
                res = res.slice(prefix.length + 1);
            }
            if (!suffix.equals("")) {
                res = res.slice(0, res.length - (suffix.length + 1));
            }
            return res;
        }


        function getUnformattedValue() {
            return value;
        }


        function setValue(value) {
            window.value = value.toString();
        }

        function setLogged(value) {
            logged = value;
        }

        function getName() {
            return name;
        }

        function getReadableValue() {
            let text = "";
            
            text+=(name+": ");
         //   console.log(text);
            if (!(prefix === "")) {
                text+=(prefix+" ");
            }
            text+=(getValue()+" ");
            if (!(suffix === (""))) {
                text+=(suffix+" ");
            }
            //console.log(text);
            return text.toString();
        }
        return {
            getReadableValue: getReadableValue,
            getName: getName,
            getPrefixValueSuffix:getPrefixValueSuffix,
            getOptions:getOptions,
            isLogged:isLogged,
            isEditable:isEditable,
            getValue:getValue
        };

    }
    return {
        title: getTitle(),
        subTitle: getReadableValues(),
        getSubParameterArrayList:getSubParameterArrayList
    };
}
