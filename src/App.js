import React from "react";
import {TopBar} from "./components/topBar";
import Objects from "./components/objects";
import {Submit} from "./components/submit";
import Alert, {openAlert} from "simple-react-alert";
import {addObjects, showGroups} from "./static/js/checkPointInteractions";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            ip: "",
            comment: "",
            id: 0,
            parsedObjects: [],
            objects: [],
            dropdown: {
                groups: [],
                selected: "Submit To Group"
            }
        };
    }

    componentDidMount() {
    }

    getGroups = () => {
        (async () => {
            console.log("get groups started")
            if (this.state.dropdown.groups.length > 0)
                return;

            await addObjects(["show groups limit 500 offset 0 --format json"]).then(groups => {
                let groupNames = [];
                this.alerts(`Fetched ${groups.length} Groups`, "danger");
                try {
                    groupNames = groups[0].objects.map(group => group.name);
                    this.alerts(`Fetched ${groups.length} Groups`);
                } catch (e) {
                    this.alerts(`No Object Fetched (API Error)`, "danger");
                    groupNames = [];
                }
                this.setState({dropdown: {groups: groupNames}});
            });

        })();
    };

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    resetTable = () => {
        let objects = [];
        this.setState({objects});
    };

    handleCellChange = (id, name, value) => {
        let objects = this.state.objects.map(obj => {
            if (obj.id === id) {
                obj[name] = value;
            }
            return obj;
        });
        this.setState(objects);
    };

    checkIfNameExists = (name) => {
        let counter = "1";
        let tmp_name = name;
        for (let i = 0; i < this.state.objects.length; i++) {
            if (this.state.objects[i].name === tmp_name) {
                parseInt(counter);
                counter++;
                tmp_name = name + "_" + counter.toString();
                i = 0;
            }
        }
        return tmp_name;
    };

    checkIfIpExists = ip => {
        let ip_tmp = ip;
        for (let i = 0; i < this.state.objects.length; i++) {
            if (this.state.objects[i].ip === ip_tmp) {
                let lastDigit = parseInt(ip_tmp.match(/\d+$/).toString());
                lastDigit++;
                ip_tmp = ip.replace(/\d+$/, lastDigit.toString());
                i = 0;
            }
        }
        return ip_tmp;
    };

    addObject = () => {
        let name = this.checkIfNameExists(this.state.name.trim());
        let ip = this.checkIfIpExists(this.state.ip.trim());
        let comment = this.state.comment;

        if (name && ip) {
            let objects = [...this.state.objects];
            let id = this.state.id + 1;
            this.setState({id});

            objects.push({
                id: id,
                name: name,
                ip: ip,
                comment: comment
            });
            this.setState({objects: objects});
        }
    };

    deleteObject = objName => {
        let objects = [...this.state.objects];
        objects = objects.filter(obj => obj.name !== objName);
        this.setState({objects: objects});
    };

    parseObjects = () => {
        return this.state.objects.map(obj => {
            const {name, ip, comment} = {...obj};
            return `add host name ${name} ip-address ${ip} comments "${comment}" --format json`;
        });
    };

    parseObjectsGroup = () => {
        return this.state.objects.map(obj => {
            const {name, ip, comment} = {...obj};
            return `add host name ${name} ip-address ${ip} comments "${comment}" groups.1 "${this.state.dropdown.selected}" --format json`;
        });
    };

    alerts = (message, type) => {
        openAlert({message: message, type: type, duration: 20000});
    };

    submitGroup = () => {
        (async () => {
            if (this.state.dropdown.selected.includes("Submit To Group")){
                this.alerts("Please choose a group first", 'warning')
                return;
            }
            let parsedObjects = this.parseObjectsGroup();
            await this.setState({parsedObjects});
            this.invokeChanges();
        })();
    };

    submit = () => {
        (async () => {
            let parsedObjects = this.parseObjects();
            await this.setState({parsedObjects});
            this.invokeChanges();
        })();
    };

    changeDropdownValue = value => {
        let dropdown = {...this.state.dropdown};
        dropdown.selected = value;
        this.setState({dropdown});
    };

    invokeChanges = () => {
        (async () => {
            await addObjects(this.state.parsedObjects).then(message => {
                message = JSON.stringify(message);
                let messageLower = message;
                if ((messageLower.includes("code") && messageLower.includes("message")) || messageLower.includes("error") || messageLower.includes("fail") || messageLower.includes("err") || messageLower.includes("reject") || messageLower.includes("denied"))
                    this.alerts(message, "danger");
                else
                    this.alerts("Success", "success");
            });
        })();
    };

    render() {
        return (
            <div>
                <Alert/>
                <TopBar/>
                <Objects
                    state={this.state}
                    addObject={this.addObject}
                    deleteObject={this.deleteObject}
                    handleCellChange={this.handleCellChange}
                    handleChange={this.handleChange}
                    resetTable={this.resetTable}
                />
                <Submit
                    submit={this.submit}
                    submitGroup={this.submitGroup}
                    groupName={this.state.groupName}
                    handleChange={this.handleChange}
                    groups={this.state.dropdown.groups}
                    selected={this.state.dropdown.selected}
                    showGroups={this.getGroups}
                    changeDropdownValue={this.changeDropdownValue}
                />
            </div>
        );
    }
}

export default App;
