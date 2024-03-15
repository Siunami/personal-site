function $(selector) {
	return document.querySelector(selector);
}

function $$(selector) {
	return [].slice.call(document.querySelectorAll(selector));
}

function uuidv4() {
	return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
		(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
	);
}

let h, svg;
(function() {
	function _generateElement(args, el) {
		let e = null;
		let _tci = args.shift().split(/\s*(?=[.#])/); // tag, class, id
		if(/[.#]/.test(_tci[0])) e = el('div');
		_tci.forEach(function(v) {
			if(!e) e = el(v);
			else if(v[0] === '.') e.classList.add(v.slice(1));
			else if(v[0] === '#') e.setAttribute('id', v.slice(1));
		});
		function item(l) {
			switch (l.constructor) {
				case Array:
					l.forEach(item);
					break;
				case Object:
					for(let attr in l) {
						if(attr === 'style') {
							for(let style in l[attr]) {
                                let value = l[attr][style]
                                if(value.constructor == Node) {
                                    value.listen("content", () => e.style.setProperty(style, value.get()), true)
                                }else{
                                    e.style.setProperty(style, value);
                                }
							}
						}else if(attr.substr(0, 2) === 'on'){
                            let value = l[attr]
                            if(value.constructor == Node) console.error("h() does not yet support nodes as event listener callbacks")

                            let fn = value
                            let event = attr.substr(2).split('.')
                            
                            if(event[0].includes('key')) { // allow keydown.enter syntax ... :)
                                fn = ((k,e) => {
                                    if(k.map(key=>e.key.toLowerCase()===key.toLowerCase()).reduce((a,b)=>a||b)) {
                                        value(e)
                                    }
                                }).bind(null, event.slice(1))
                            }
							
                            e.addEventListener(event[0], fn);
						}else{
                            let setAttr = (attr, val) => {
                                if(attr === 'value') {
                                    e[attr] = val
                                } else {
                                    e.setAttribute(attr, val)
                                }
                            }

                            let value = l[attr]
                            if(value.constructor == Node) {
                                value.listen("content", () => setAttr(attr, value.get()), true)
                            }else{
                                setAttr(attr, l[attr]);
                            }
						}
					}
					break;
				default:
					if(l.nodeType != undefined) {
                        e.appendChild(l)
                    }else if(l.constructor == Node) {
                        let textNode = document.createTextNode(l.get())
                        l.listen("content", () => textNode.textContent = l.get())

                        e.appendChild(textNode)
                    }else{
                        e.appendChild(document.createTextNode(l))
                    }
			}
		}
		while(args.length > 0) {
			item(args.shift());
		}
		return e;
	}

	h = function() {
		return _generateElement([].slice.call(arguments), function(tagName) {
			return document.createElement(tagName);
		});
	}

	svg = function() {
		return _generateElement([].slice.call(arguments), function(tagName) {
			return document.createElementNS('http://www.w3.org/2000/svg', tagName);
		});
	}
})(); // h, svg