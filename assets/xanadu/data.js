function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

let dynamicNodes = [
    {
        "timeline": [
            {
                "node": 32,
                "highlight": [
                    54,
                    98
                ],
                "description": "Starts grad school at Harvard",
                "date": 1960,
                "id":uuidv4()
            },
            {
                "node":32,
                "highlight":[100,295],
                "description":"Idea of hypertext is invented",
                "date":1961,
                "id":uuidv4()
            },
            {
                "node":35,
                "highlight":[
                    0,
                    150
                ],
                "description":"Ted introduces the Hypertext concept at ACM",
                "date":1965,
                "id":uuidv4()
            },
            {
                "node":40,
                "highlight":[416,527],
                "description":"Introduced to an early word-processor at Brown University",
                "date":1969,
                "id":uuidv4()
            },
            {
                "node":41,
                "highlight":[102,218],
                "description":"Coins the term Xanadu while working at Harcourt, Brace",
                "date":1967,
                "id":uuidv4()
            },
            {
                "node":59,
                "highlight":[0,200],
                "description":"Cal Daniels completes an early prototype of Xanadu",
                "date":1972,
                "id":uuidv4()
            },
            {
                "node":60,
                "highlight":[96,161],
                "description":"Ted joins faculty at University of Illinois",
                "date":1973,
                "id":uuidv4()
            },
            {
                "node":62,
                "highlight":[331,514],
                "description":"Publishes Computer Lib/Dream Machines",
                "date":1974,
                "id":uuidv4()
            },
            {
                "node":93,
                "highlight":[0,102],
                "description":"Nelson gathers Xanadu devotees in Ann Arbor to build his dream",
                "date":1979,
                "id":uuidv4()
            },
            {
                "node":106,
                "highlight":[51,155],
                "description":"Xanadu continues to sputter along under Roger Gregory",
                "date":1982,
                "id":uuidv4()
            },
            {
                "node":117,
                "highlight":[224,335],
                "description":"Roger Gregory moves to Silicon Valley with Xanadu's remaining hardware ",
                "date":1983,
                "id":uuidv4()
            },
            {
                "node":120,
                "highlight":[0,36],
                "description":"Roger Gregory meets Autodesk CEO Alan Walker at Hackers 3.0 conference",
                "date":1987,
                "id":uuidv4()
            },
            {
                "node":127,
                "highlight":[58,164],
                "description":"Autodesk acquires a majority stake in Xanadu to complete the project",
                "date":1988,
                "id":uuidv4()
            },
            {
                "node":182,
                "highlight":[210,351],
                "description":"Autodesk stock collapses leading to the end of Xanadu investment",
                "date":1992,
                "id":uuidv4()
            },
            {
                "node":210,
                "highlight":[163,389],
                "description":"Charlie Smith's company, Memex, offers Xanadu another change to live",
                "date":1992,
                "id":uuidv4()
            },
            {
                "node":220,
                "highlight":[239,395],
                "description":"Xanadu team walks out of Memex office",
                "date":1994,
                "id":uuidv4()
            }
        ],
        "startAfter":30,
        "stay": 223
    }
]

function insertDynamicNodes() {
    dynamicNodes.forEach((nodeData, index) => {
        let newNode = document.createTextNode("");
        let keys = Object.keys(nodeData)
        if (keys.includes("image")) {
            newNode = generateDynamicImage(nodeData)
        } else if (keys.includes("timeline")) {
            newNode = generateTimeline(nodeData)
            
            // Highlight
            nodeData.timeline.forEach((element, elementIndex) => {
                highlights.push({
                    "node":element.node,
                    "highlight":element.highlight,
                    "color":[0,169,13],
                    "dynamicIndex":index,
                    "id":element.id,
                    "annotation":[]
                })
            })
        }
        
        newNode.setAttribute("id", `dynamicNode${index}`)
    
        let referenceNode = document.getElementById(`node${nodeData.startAfter}`)
        
        insertAfter(newNode, referenceNode)

        if (nodeData.stay) {
            dynamicObjects.push([nodeData, newNode])
        }
    })

}

// Process data inside the fetch and pass to view renderer
fetch("/assets/xanadu/xanadu2.json").then((res) => res.json()).then((data) => {
    renderData(data)
    insertDynamicNodes()
    renderHighlights()
    generateNumbers()
}).catch((err) => console.log(err))


// Store highlights on same node in increasing index order
var highlights = [
    {
        "node": 0,
        "highlight": [
            131,
            140
        ],
        "annotation": [
            {
                type:"iframe",
                data: "https://en.m.wikipedia.org/wiki/Hypertext"
            }
        ]
    },
    {
        "node": 2,
        "highlight": [
            147,
            156
        ],
        "annotation": [
            {
                type:"iframe",
                data: "https://www.google.com/maps/embed/v1/place?q=place_id:ChIJdSbJMVOEhYAR7lGPgm2qA7k&key=AIzaSyA0MHGq83BGFwqngHKNM6gTBYEjfhn42LI"
            }
        ]
    },
    {
        "node": 3,
        "highlight": [
            1069,
            1079
        ],
        "annotation": [
            {
                type:"text",
                data:`Ted Nelson had a whole taxonomy of information. All items were labeled in red or silver ink. Each would go into different categories: items to buy right away; items related to accounting, such as receipts; items to be acted upon. Every time he went to a trade show, all the information he gathered would be labeled. He would put a start on things that were big or important, which was about 30 percent of the things. A worker at his office described it as "a chaos of paper."`
            }
        ]
    },
    {
        "node": 4,
        "highlight": [
            501,
            519
        ],
        "annotation": [
            {
                type:"iframe",
                data:"https://archive.org/details/GeneralSchematicsIntroductionToTerminology1990/page/n1/mode/2up"
            }
        ]
    },
    {
        "node": 5,
        "highlight": [
            370,
            376
        ],
        "annotation": [
            {
                type:"text",
                data:`Xanadu is the great hacker dream. It is supposed to provide a universal library, collaborative editing, the ability to trace the changes in documents through successive versions, a means to track and credit authorship, a royalty system, and nonsequential writing.`
            }
        ]
    },
    {
        "node": 6,
        "highlight": [
            69,
            78
        ],
        "annotation": [
            {
                type:"iframe",
                data: "https://en.m.wikipedia.org/wiki/Vaporware"
            }
        ]
    },
    {
        "node": 7,
        "highlight": [
            272, 283
        ],
        "annotation": [
            {
                type:"iframe",
                data: "https://en.m.wikipedia.org/wiki/John_Walker_(programmer)"
            }
        ]
    },
    {
        "node": 7,
        "highlight": [
            250,
            263
        ],
        "annotation": [
            {
                type:"iframe",
                data: "https://en.m.wikipedia.org/wiki/Autodesk"
            }
        ]
    },
    {
        "node": 8,
        "highlight": [
            122,
            135
        ],
        "annotation": [
            {
                type:"iframe",
                data: "https://www.google.com/maps/embed/v1/place?key=AIzaSyD-izIkgvyunHdEg7KSIrbw5MNy6ot825U&q=100%20Spinnaker%20Drive%2CSausalito%2C%20CA%2094965"
            }
        ]
    },
    {
        "node": 15,
        "highlight": [
            550,
            573
        ],
        "annotation": [
            {
                type:"text",
                data: `"By 'hypertext' mean nonsequential writing - text that branches and allows choice to the reader, best read at an interactive screen." - Ted Nelson, Literary Machines`
            }
        ]
    },
    {
        "node": 20,
        "highlight": [
            240,
            553
        ],
        "annotation": [
        ]
    },
    {
        "node": 21,
        "highlight": [
            444,
            543
        ],
        "annotation": [
        ]
    },
    {
        "node": 22,
        "highlight": [
            109,
            143
        ],
        "annotation": [
            {
                type:"iframe",
                data: "https://en.m.wikipedia.org/wiki/Gravity%27s_Rainbow"
            }
        ]
    },
    {
        "node": 26,
        "highlight": [
            377,
            393
        ],
        "annotation": [
            {
                type:"iframe",
                data: "https://en.m.wikipedia.org/wiki/Thomas_Schelling"
            }
        ]
    },
    {
        "node": 27,
        "highlight": [
            563,
            592
        ],
        "annotation": [
            {
                type:"iframe",
                data: "https://www.youtube.com/embed/rFgul6rwNbQ"
            }
        ]
    },
    {
        "node": 27,
        "highlight": [
            447,
            459
        ],
        "annotation": [
            {
                type:"iframe",
                data: "https://en.m.wikipedia.org/wiki/Soldier_Blue"
            }
        ]
    },
    {
        "node": 27,
        "highlight": [
            417,
            442
        ],
        "annotation": [
            {
                type:"iframe",
                data: "https://en.m.wikipedia.org/wiki/Requiem_for_a_Heavyweight"
            }
        ]
    },
    {
        "node": 27,
        "highlight": [
            141,
            153
        ],
        "annotation": [
            {
                type:"iframe",
                data: "https://en.m.wikipedia.org/wiki/Orson_Welles"
            }
        ]
    },
    {
        "node": 27,
        "highlight": [
            122,
            135
        ],
        "annotation": [
            {
                type:"iframe",
                data: "https://en.m.wikipedia.org/wiki/H._L._Mencken"
            }
        ]
    },
    {
        "node": 27,
        "highlight": [
            109,
            120
        ],
        "annotation": [
            {
                type:"iframe",
                data: "https://en.m.wikipedia.org/wiki/Walt_disney"
            }
        ]
    },
    {
        "node": 27,
        "highlight": [
            91,
            107
        ],
        "annotation": [
            {
                type:"iframe",
                data: "https://en.m.wikipedia.org/wiki/Bertrand_Russell"
            }
        ]
    },
    {
        "node": 27,
        "highlight": [
            71,
            89
        ],
        "annotation": [
            {
                type:"iframe",
                data: "https://en.m.wikipedia.org/wiki/Buckminster_Fuller"
            }
        ]
    },
    {
        "node":28,
        "highlight":[303,458],
        "annotation":[
        ]},
    {
        "node": 29,
        "highlight": [
            164,
            180
        ],
        "annotation": [
            {
                type:"iframe",
                data: "https://en.m.wikipedia.org/wiki/Alfred_Korzybski"
            }
        ]
    },
    {
        "node":30,
        "highlight":[368,515],
        "annotation":[
        ]
    },
    {
        "node":30,
        "highlight":[266,284],
        "annotation": [{
            type:"iframe",
            data: "https://en.m.wikipedia.org/wiki/Cryonics"
        }]
    },
    {
        "node":34,
        "highlight":[301,322],
        "annotation":[
            {
                type:"iframe",
                data: "https://www.brainpickings.org/2009/11/19/christian-swinehart-choose-your-own-adventure/"
            }
        ]
    },
    {
        "node":36,
        "highlight":[77,87],
        "annotation":[
            {
                type:"iframe",
                data: "https://en.m.wikipedia.org/wiki/Talmud"
            }
        ]
    },
    {"node":37,"highlight":[255,260],"annotation":[{
        type:"iframe",
        data: "https://en.m.wikipedia.org/wiki/Memex"
    }]},
    {"node":37,"highlight":[130,145],"annotation":[{
        type:"iframe",
        data: "https://www.theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/"
    }]},
    {"node":38,"highlight":[127,178],"annotation":[{
        type:"text",
        data: "Paper: Complex information processing: a file structure for the complex, the changing and the indeterminate https://dl.acm.org/doi/10.1145/800197.806036"
    }]},
    {"node":42,"highlight":[71,81],"annotation":[{
        type:"text",
        data: `In Xanadu did Kubla Khan
            A stately pleasure dome decree:
            Where Alph, the sacred river, ran
            Through caverns measureless to man
            Down to a sunless sea.
            So twice five miles of fertile ground
            With walls and towers were girdled round:
            And there were gardens bright with sinuous rills,
            Where blossomed many an incense-bearing tree;
            And here were forests ancient as the hills,
            Enfolding sunny spots of greenery.
        `
    },{
        type:"text",
        data: "----"
    },{
        type:"text",
        data: "Full poem:"
    },{
        type:"iframe",
        data: "https://www.poetryfoundation.org/poems/43991/kubla-khan"
    }]},
    {
        "node":51,
        "highlight":[195,212],
        "annotation":[{
            type:"iframe",
            data: "https://www.resistors.org/index.php/Main_Page"
    }]},
    {
        "node":56,
        "highlight":[23,31],
        "annotation":[{
            type:"text",
            data: `The 1959 American Heritage Dictionary defines enfilade as "the firing of a gun or guns so as to sweep the length of a target, such as a column of troups." Enfilade comes from the French word enfiler, to thread. To exemplify another of enfilade's meanings,the Oxford English Dictionary quotes Swinburne: "The trees have swelled out the line traced for them, and destroyed the enfilade, by advancing in the walks or retiring from them."`
        }]
    },
    {
        "node":64,
        "highlight":[117,129],
        "annotation":[{
            type:"iframe",
            data:"https://archive.org/details/computer-lib-dream-machines"
    }]},
    {
        "node":65,
        "highlight":[515,538],
        "annotation":[{
            type:"iframe",
            data:"https://en.m.wikipedia.org/wiki/Whole_Earth_Catalog"
        },{
            type:"text",
            data:"The last issue: https://archive.org/details/B-001-013-719/page/n387/mode/2up"
        }
    ]},
    {
        "node":65,
        "highlight":[470,483],
        "annotation":[{
            type:"iframe",
            data:"https://en.m.wikipedia.org/wiki/Stewart_Brand"
        }
    ]},
    {
        "node":67,
        "highlight":[185,198],
        "annotation":[{
            type:"image",
            data:"https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fdynamic-computing%2FVLIeItOTCW.png?alt=media&token=f89ef917-3a7c-4b85-b219-21638867fffc"
        }]
    },
    {
        "node":79,
        "highlight":[0,13],
        "annotation":[{
            type:"iframe",
            data:"https://en.m.wikipedia.org/wiki/Roger_Gregory_(programmer)"
        }]
    },
    {
        "node":90,
        "highlight":[9,20],
        "annotation":[{
            type:"iframe",
            data:"https://en.m.wikipedia.org/wiki/Mark_S._Miller"
        }
    ]},
    {"node":113,"highlight":[198,374],"annotation":[]},
    {"node":123,"highlight":[306,517],"annotation":[]},
    {
        "node":134,
        "highlight":[179,189],
        "annotation":[{
            type:"iframe",
            data:"https://en.m.wikipedia.org/wiki/PARC_(company)"
        }]
    },
    {
        "node":137,
        "highlight":[39,52],
        "annotation":[{
            type:"iframe",
            data:"https://en.m.wikipedia.org/wiki/Marc_Stiegler"
        }]
    },
    {"node":147,"highlight":[317,326],"annotation":[{
        type:"iframe",
        data:"https://en.wikipedia.org/wiki/Smalltalk"
    }]},
    {"node":153,"highlight":[284,838],"annotation":[]},
    {"node":166,"highlight":[0,327],"annotation":[]},
    {"node":167,"highlight":[19,49],"annotation":[{
        "type":"text",
        "data":"Paper: https://onlinelibrary.wiley.com/doi/abs/10.1002/9781118555927.ch27"
    }]},
    {"node":185,"highlight":[490,501],"annotation":[{
        type:"iframe",
        data:"https://en.m.wikipedia.org/wiki/Carol_Bartz"
    }]},
    {
        "node":218,
        "highlight":[523,628],
        "annotation":[]}
]
