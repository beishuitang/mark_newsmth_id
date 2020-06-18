export function mut(targetNode, config, mutationCallback) {
    let observer = new MutationObserver(mutationCallback);
    if (targetNode != null) {
        observer.observe(targetNode, config);
    }
}
export function splitName(users) {
    for (let index = 0; index < users.length; index++) {
        const user = users[index];
        user.innerHTML = user.innerHTML.replace(/\|\s/, '');
    }
}
export function relayTableAll(tableEl, tdIndexsToMergeArr, tdIndexToDelete) {
    relayTable(tableEl.querySelector('thead'), tdIndexsToMergeArr, tdIndexToDelete);
    relayTable(tableEl.querySelector('tbody'), tdIndexsToMergeArr, tdIndexToDelete);
}
function relayTable(trWrapper, tdIndexsToMergeArr, tdIndexToDelete) {
    let trs = trWrapper.children;
    for (let index = 0; index < trs.length; index++) {
        const tr = trs[index];
        relayTr(tr, tdIndexsToMergeArr, tdIndexToDelete);
    }
}
function relayTr(tr, tdIndexsToMergeArr, tdIndexToDelete) {
    let tds = tr.children;
    tdIndexsToMergeArr.forEach(tdIndexsToMerge => {
        if (tdIndexsToMerge.length > 1) {
            let target = tds[tdIndexsToMerge[0]];
            for (let index = 1; index < tdIndexsToMerge.length; index++) {
                const td_index = tdIndexsToMerge[index];
                target.innerHTML += ('<br>' + tds[td_index].innerHTML);
            }
        }
    });
    for (let index = tdIndexToDelete.length - 1; index >= 0; index--) {
        const i = tdIndexToDelete[index];
        tds[i].remove();
    }
}
