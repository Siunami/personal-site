function generateNumbers() {
    document.querySelectorAll(".numbering").forEach(e => e.parentNode.removeChild(e));

    let children = text.children
    for (let element of children) {
        // console.log(element)
        let id = element.getAttribute("id")
        if (!id.includes("dynamic")) {
            let top = element.offsetTop;
            // console.log(top)
            let number = id.replace("node","");
            // console.log(number)

            // sidebar numbering
            // let node = document.createElement("span")
            // node.setAttribute("class", "numbering")
            // node.innerText = number;
            // node.setAttribute("style",`position:absolute; top:${top}px; right:0px;`)
            document.body.appendChild(node)
        }
    }
}

window.addEventListener('keypress', function (ev) {
    if (ev.key === 'Enter') {
        let text;

        let sel = window.getSelection()
        let endRange = sel.extentOffset;
        let startRange = sel.anchorOffset;
        let node = sel.anchorNode.parentElement;
        let number = node.getAttribute("id").replace("node","");
        
 
    
        if (startRange > endRange){
            let save = startRange;
            startRange = endRange;
            endRange = save;
        }
    
        text = window.getSelection().toString();

    
        console.log(JSON.stringify({
            node: parseInt(number),
            highlight: [startRange, endRange],
            description:text,
            date:""
        }))
    }
});

window.addEventListener("resize", generateNumbers)

function getSelectedText(ev) {
    let oldNode = document.getElementById("addSelectionNode")
    if (oldNode) document.body.removeChild(oldNode)

    let text;

    let sel = window.getSelection()
    console.log(sel)
    let endRange = sel.extentOffset;
    let startRange = sel.anchorOffset;
    let node = sel.anchorNode.parentElement;
    let number = node.getAttribute("id").replace("node","");
    
    console.log(startRange, endRange)
    console.log(number)

    if (startRange > endRange){
        let save = startRange;
        startRange = endRange;
        endRange = save;
    }

    text = window.getSelection().toString();
    console.log(text)
    console.log(ev)

    console.log(JSON.stringify({
        node: parseInt(number),
        highlight: [startRange, endRange],
        annotation:[text]
    }))

// let addSelectionNode = document.createElement("div");

// let offsetY = ev.offsetY;
// let offsetX = ev.offsetX;

// addSelectionNode.setAttribute("style", `position:fixed, top:${offsetY}px, left:${offsetX}px`)
// addSelectionNode.setAttribute("id", "addSelectionNode")

// let annotationText = document.createElement("input");
// annotationText.setAttribute("id","annotationText");

// addSelectionNode.appendChild(annotationText);

// let addButton = document.createElement("button");
// addButton.innerHTML = "add selection";

// addSelectionNode.appendChild(addButton);


// const nodeController = new AbortController();

// const handleClick = (ev) => {
//     ev.preventDefault();
//     console.log({
//         node: number,
//         highlight: [startRange, endRange],
//         annotation:[text]
//     })
//     let oldNode = document.getElementById("addSelectionNode")
//     if (oldNode) document.body.removeChild(oldNode)
//     nodeController.abort()
// }
// addButton.addEventListener("click",handleClick,{ signal: nodeController.signal })
// console.log(addSelectionNode)
// document.body.appendChild(addSelectionNode)
}

document.addEventListener("mouseup", getSelectedText)