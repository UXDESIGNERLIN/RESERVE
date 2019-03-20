//require('bootstrap');
let panes = Array.from(document.getElementsByClassName('tab-pane')).reduce((p, c) => ({...p, [c.id]: c}), {});

console.log(panes);


function hideAll() {
    Object.keys(panes).forEach(id => {
        panes[id].classList.remove('show');
        panes[id].classList.remove('active');
    })
}

function show(id) {
    panes[id].classList.add('show');
    panes[id].classList.add('active');
}

window.onhashchange = (e) => {
    let url = e.newURL;
    let hash = url.slice(url.lastIndexOf('#')+1);

    hideAll();
    show(hash);
}