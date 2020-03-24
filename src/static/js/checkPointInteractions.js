import SmartConsoleInteractions from "smart-console-interactions";


// export function showGroups() {
//     // eslint-disable-next-line no-undef
//     console.log(JSON.stringify(smxProxy));
//     let command = {
//         "command": "show groups",
//         "parameters": {"offset": 0, "limit": 500, "details-level": "standard"}
//     };
//     // eslint-disable-next-line no-undef
//     smxProxy.sendRequest("run-readonly-command",command, "onCommit");
// }


export async function addObjects(objects) {
    const interactions = new SmartConsoleInteractions();
    try {
        let obj = await interactions.requestCommit(objects).then();
        console.log("-> obj", JSON.stringify(obj));
        return obj;
    } catch (e) {
        return e;
    }
}



