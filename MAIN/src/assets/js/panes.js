//let links = Array.from(document.getElementsByClassName('nav-link')).reduce((p, c) => ({...p, [c.href.slice(c.href.lastIndexOf('#')+1)]: c}), {});
let links = Array.from(document.getElementsByClassName('nav-link')).reduce((p, c) => {
    let indexOfHash = c.href.lastIndexOf('#');
    if (indexOfHash == -1) return p;
    else return {...p, [c.href.slice(indexOfHash+1)]: c}
}, {});
let panes = Array.from(document.getElementsByClassName('tab-pane')).reduce((p, c) => ({...p, [c.id]: c}), {});

Object.keys(links).forEach(id => {
    links[id].onclick = (e) => {
        e.preventDefault();
        deactiveAllLinks();
        hideAllPanes();
        links[id].classList.add('active');
        links[id].parentElement.classList.add('active');
        showPane(id);
    }
})


function deactiveAllLinks() {
    Object.keys(links).forEach(id => {
        links[id].classList.remove('active');
        links[id].parentElement.classList.remove('active');
    });
}

function hideAllPanes() {
    Object.keys(panes).forEach(id => {
        panes[id].classList.remove('show');
        panes[id].classList.remove('active');
    })
}

function showPane(id) {
    panes[id].classList.add('show');
    panes[id].classList.add('active');
}