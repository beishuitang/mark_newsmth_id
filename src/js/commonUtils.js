export function mut(targetNode, config, mutationCallback) {
    let observer = new MutationObserver(mutationCallback);
    if (targetNode != null) {
        observer.observe(targetNode, config);
    }
}
