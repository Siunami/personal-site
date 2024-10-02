<!-- prettier-ignore-start -->
You’re in the middle of a large project, and you’re stuck. You’re staring at a pile of long, unstructured documents (journals, lab notebooks, meeting notes) with a sense that the clues you need are buried somewhere within. But there’s simply too much to keep in your head as you scroll. Instead, you hatch a plan. If you could find the important snippets and gather them into one place, it would be easier to see everything at once, to notice patterns, and to figure out what to do next.

So you create a new working document, and as you read through your unstructured notes, you copy and paste key passages into it. But this process is cumbersome and disorienting: you’re constantly moving both your attention and your cursor between these documents, deciding where to put each new snippet, losing your place in your unstructured notes. The snippets in your working document are isolated from their original context, so it can be hard to remember what each means and why it matters. And as snippets pile up, your fresh document can easily produce the same kind of overwhelm you were trying to escape.

If you’d been working with books or academic papers, rather than your own notes, you might have used annotation tools instead. It’s easy to enter a satisfying flow with these tools. When some phrase strikes you as important, a highlighter lets you capture that reaction immediately, without shifting your focus. Likewise, marginal comments let you record observations as they occur to you, in context. The trouble with these tools is that your annotations end up trapped in the pages of the original documents. But when you’re trying to make sense of a confusing situation, you need to get everything into one place, where you can see, rearrange, and elaborate the pieces into a new whole.

Annotation tools feel great to use, but they don’t support the follow-up thinking you need to do. Text editors give you a flexible canvas for making sense of snippets, but their design is often cumbersome and disorienting when used in this way. If you could move fluidly between these tools, you could use each where it excels and, perhaps, get the best of both worlds. In this paper, we present Latticework, a system which unifies annotation with freeform text editing, in the context of personal knowledge management tools.

## Latticework’s Design

[https://youtu.be/RHsBH9iYqCQ](https://youtu.be/RHsBH9iYqCQ)

Latticework is built to support the workflow we described in the introduction. You _forage_ through messy **source documents**, accumulating key snippets into a **working document** for _sensemaking_ (i.e. rearranging and elaborating that material for insight). But, as [prior work has described](https://andymatuschak.org/files/papers/Pirolli,%20Card%20-%202005%20-%20The%20sensemaking%20process%20and%20leverage%20points%20for%20analyst%20technology%20as.pdf), this process isn’t linear. It’s often convenient to do a bit of preliminary sensemaking in the midst of foraging; conversely, observations you uncover during sensemaking will often lead to another round of foraging, and so on, in a loop.

Latticework’s main goal, then, is to enable fluid movement between these foraging and sensemaking stances. By extension, that means fluid movement between acting on source documents (which emphasize foraging) and on your working document (which emphasizes sensemaking). Ideally, you should be able to shift your focus as it makes sense in the moment, and the work you do in each place should remain visible in the other.

### **Interchangeable highlights and copied snippets**

In the introduction, we described two different workflows people might use to capture what’s important from a messy pile of material: highlighting key snippets in a source document, and copying key snippets into a working document. Highlighting is more convenient when foraging, while copying prepares a manipulable canvas for sensemaking. Latticework unifies these operations, so that you can use whichever is most convenient in the moment, while retaining the benefits of the other.

<!-- image-pair: highlight.png -->
When you highlight a snippet in a source document, a linked copy of that snippet is inserted into your working document, open in the opposite pane. Then, when you shift to sensemaking, you can rearrange the link within that document as you would any ordinary text.

<!-- image-pair: copy_paste.png -->
Once you’ve done some sensemaking, it may be more convenient to use the other workflow. Suppose that you see an important snippet as you scan through a source document, and you know just where it should go in your emerging structure. If you highlight the snippet, a link will be inserted at the bottom of the working document, which isn’t quite what you want. Instead, you can select the snippet, invoke the “Copy Snippet Link” command (Command+Option+C), and paste into the working document wherever you’d like. Then—unlike in a typical copy-and-paste workflow—you’ll see that snippet highlighted in the source document, so that you can keep track of your work as you continue reading.

You’ll get the same result no matter which direction you go—a highlight in the source document and a snippet link in the working document. Conceptually, highlighting doesn’t actually modify the source document. Highlights are a dynamic style applied to all the snippets linked in your working document. So if you delete a snippet link, the corresponding highlight will disappear, too.

### **Interchangeable marginalia and textual elaborations**

While you’re gathering these snippets, you may also want to capture observations about them. Each workflow has a natural way to handle this. If you’re reading a source document with a highlighter, you can write comments in the margins. If you’re copying snippets into a working document, you can type observations alongside them. As with highlighting and copying, Latticework makes these operations interchangeable.

<!-- image-pair: comments.png -->
When you create a comment on some text in a source document, Latticework inserts your comment alongside a snippet link in your working document. The same is true in reverse. If you’re focused on your working document, you can type observations next to a snippet link, and those remarks will appear at the snippet’s location in its source document. You’ll get the same result no matter which direction you go, so you can always view and edit comments from either the source document or your working document.

As with highlighting, comments don’t modify the source document. Instead, Latticework comments are like editable “portals” into your working document. This approach frees comments from the margins of source documents, so that they can be re-arranged and manipulated like any other text in your working document.

### **Pane-based bidirectional navigation and previews**

One important challenge for fluid movement in this complex process is _disorientation_. Latticework attempts to combat this problem by integrating navigation interactions with its side-by-side layout.

Clicking a snippet link in a working document will navigate to that snippet within the source document, as you might expect. By default, though, the destination will open in the _opposite_ pane. This makes it possible to view a snippet’s original context without disturbing the working document.

You can also navigate backwards, from highlights in a source document to the corresponding snippet links in your working document. These “backlinks” likewise open in the opposite pane by default, to avoid disrupting the source document you were reading.

<!-- image-pair: peeking.png -->
Latticework uses a similar pane-aware interaction to support quick peeking into the context surrounding a link or backlink. While hovering over a link with the Command key held, the opposite pane will display a preview of the destination. The preview disappears when you move your cursor away or release the Command key. Or, if you want to dig deeper into that spot, you can click to make the navigation stick.

This design is similar to typical popover-based link previews. But in those designs, if you start reading the preview’s text, then click the link to navigate, the text moves to a new location and reflows. Latticework’s pane-based preview design ensures that the preview’s text doesn’t move upon navigation, so you can keep reading without losing your place.

### **Collapsible snippet links**

Alongside disorientation, working memory overload is one of the biggest problems when distilling these large unstructured documents. We believe that’s why people in these situations so often try to collect everything important into once place: that way, everything can be viewed at once, and it’s possible to notice connections and themes without relying on working memory. Unfortunately, as snippets accumulate, the working document itself can become quite long—leaving you stuck scrolling around, trying to remember where everything is.

<!-- image-pair: collapse.png -->
To help with this challenge, Latticework makes it possible to “collapse” snippet links. By default, snippet links show the full content of the snippet. But as you work with your snippets—paraphrasing, recontextualizing, and distilling them—you may find that you no longer need to see the full text all the time. Your own comments have superseded the original material. In these cases, you can click the snippet link while holding Shift to collapse it to a small icon. You can still view or preview its full contents by clicking or hovering. Shift-clicking again will restore its expanded form.

Collapsed links are particularly useful when you have long snippets. But they also make it easy to capture a simple citation, a compact link to supporting material with extra context.

## The Latticework Prototype

We prototyped Latticework as a plugin to [Obsidian](https://obsidian.md), a popular and extensible personal knowledge management system. Many people already use this sort of tool, both to capture notes into unstructured documents, and also for the kind of synthesis we’ve been discussing. Implementing Latticework as a plugin let us watch how experts incorporated our design into serious use cases, without a long learning curve.

### Expressing Latticework’s snippet links in Markdown

One of Obsidian’s key principles is data portability and ownership. There’s no proprietary graph database or mandatory backend API. An Obsidian library is just a folder of plaintext files, formatted in the human-readable [Markdown](https://commonmark.org) syntax. To implement features like backlinks, which require graph-like understanding of the library, Obsidian computes indexes of the plaintext files as needed. This approach frees users to share and manipulate their documents with other tools.

We’ve been careful to implement Latticework’s features in the same spirit. Snippet links are stored as ordinary links using [standard W3C Selector URL fragments](https://www.w3.org/TR/selectors-states/#json-examples-converted-to-fragment-identifiers) to specify an arbitrary text range. In this table, you can see how that aligns with pre-existing link types:

| Link to                                                                                                                             | Markdown (wiki-style)                                                                                           |
| ----------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| note                                                                                                                                | [[Fruit]]                                                                                                       |
| heading                                                                                                                             | [[Fruit#Stone fruit]]                                                                                           |
| block ([Obsidian Extension](https://help.obsidian.md/Linking+notes+and+files/Internal+links#Link%20to%20a%20block%20in%20a%20note)) | [[Fruit#^sfs]]                                                                                                  |
| snippet (Latticework)                                                                                                               | [[Fruit#selector(type=TextQuoteSelector,exact=strawberries,prefix=Blueberries%2C%20,suffix=%2C%20raspberries)]] |

```markdown
# Fruit

## Stone fruit

In season June-August ^sfs

## Berries

Blueberries, strawberries, raspberries
```

These `selector()` fragments aren’t elegant when read in plaintext, but they’re portable, machine-readable/writable, and human-readable in a pinch. Within Obsidian, the Latticework plugin takes care of creating and displaying these fragments, so users won’t generally see them. Other standards-based tools will be able to manipulate Markdown containing these snippet links, even if those tools don’t support navigation to W3C Selector URL fragments.

One downside of links to arbitrary text ranges is that they can easily break when their target document is edited. That’s one reason why these systems are usually limited to block-level links. But in the specific use case we’ve been discussing, source material is generally considered read-only, so broken links should be rare. More stable solutions, like [Automerge cursors](https://automerge.org/automerge/api-docs/js/functions/next.getCursor.html), lack widely supported plaintext forms.

At the moment, Latticework only supports text. But the materials you accumulate during the course of a project often include video, audio, images, and other data types. W3C Selectors support a huge range of formats, so by leaning on that standard, Latticework’s model can in principle support annotation across many contexts.

By default, Latticework copies snippet links which _embed_ the snippet. That is, the link displays the content of the linked snippet inline. Here we use [the same format that Obsidian uses for other embedded links](https://help.obsidian.md/Linking+notes+and+files/Embed+files):

| Type                  | Link                    | Embed (note the ! prefix) |
| --------------------- | ----------------------- | ------------------------- |
| note                  | [[Fruit]]               | ![[Fruit]]                |
| heading               | [[Fruit#Stone fruit]]   | ![[Fruit#Stone fruit]]    |
| snippet (Latticework) | [[Fruit#selector(...)]] | ![[Fruit#selector(...)]]  |

Obsidian’s `!` link embedding syntax isn’t standard Markdown, but it’s consistent with Markdown’s image syntax (`![alt text](img.png)`), and easy enough for both machines and humans to parse.

When you collapse a snippet link, we use a simple trick. We just set the text of the link to a single character, using the standard wikilink alias syntax: `[[Fruit#selector(...)|↗]]`.

Now that we understand how snippet links work, we can see that Latticework’s interactions need not apply only to that new link type. For example: because any Markdown link can have an alias, Latticework’s collapse interaction can be apply to any link, not just snippet links. The same is true for Latticework’s pane-based navigation and preview interactions. Likewise, the portal-based marginalia can also apply to block-level backlinks. We haven’t implemented any of these elaborations, but we felt it was important to reconcile this new link type—at least in principle—with pre-existing primitives.

### Observing Latticework in action

Latticework’s design evolved through many iterations, driven in large part by user interview and observation sessions. Through our personal networks and the Obsidian forum, we recruited experienced Obsidian users who needed to distill some insight from a large collection of unstructured notes. We’d like to discuss some observations from those sessions, and from our own use of the system.

**Shifting from highlights to copying links as structure emerges.** Most fundamentally, our test users naturally picked up the symmetry between highlighting and copying snippet links. They’d often begin by highlighting key passages, letting snippets accumulate without structure into their working document. These users typically began without any clear shape in mind, so a simple list worked well initially. Over time, they would loosely arrange the pieces, moving related snippets closer to each other and eventually arranging an outline. As sections became more clearly defined, users would increasingly paste snippet links directly into specific locations. People moved back and forth between these two methods as their intuitions developed and changed—leaning more on highlighting when snippets’ roles seemed unclear, and pasting links when snippets fit well within their structure.

**Incremental structure.** Our test users created structure informally and incrementally as they gathered snippets. They’d often begin by arranging snippets with the “Move Line Up/Down” command, and by adding extra newlines to separate loosely related groups. As groups developed, many users labeled them with section headings or by creating nested lists. Within the working document, different sections would gain structure at different rates, often with an informal “unsorted” pile left at the bottom. Some users manipulated their snippets as hierarchical bulleted lists, while others preferred to keep them as flat plaintext. Others mixed those forms freely. These loose strategies for developing structure seemed to match the nonlinear, looping nature of the sensemaking process we discussed earlier.

**Mixing up copy commands.** In Latticework, users can copy a link to a snippet by adding an extra modifier: Command+Shift+C. One advantage of building on top of the traditional copy-and-paste interaction is familiarity. People started copying snippet links immediately, in situations where they’d usually use the ordinary copy command. But one downside of our approach is that people sometimes mixed up the copy commands. They’d invoke the ordinary copy command, not realizing they’d forgotten the extra modifier until they pasted. Latticework’s snippet copying command presents a visual confirmation when it’s invoked, but it’s currently in the corner of the screen. The feedback might be more effective if presented at the user’s cursor.

**Rapidly peeking and orienting with pane-based navigation.** We saw our test users make heavy use of pane-based previews when they wanted to get more context on a particular snippet. Most commonly, they would use previews to re-read surrounding material in a source document. We also saw test users follow backlinks to orient themselves within the working document from a source document. Pane-based navigation also had an unexpected benefit. When people were looking for a passage they’d seen before, following these links was sometimes more effective than a textual search—for example, when they couldn’t remember a passage’s exact text, but they knew it was near another particular snippet.

**Phrases and sentences, not blocks.** Because users were trying to keep their working document high density, so they could see everything at once, they rarely excerpted whole paragraph blocks. Often they’d snip one phrase from the middle of a sentence. This behavior reinforces the need for Latticework’s range-based snippet links in personal knowledge management tools, beyond the common page- and block-level links.

**Emergent patterns with collapsible snippets.** Latticework’s collapsible link feature was motivated by early test sessions, in which we saw some users’ working documents quickly grow unmanageably long with long snippets and commentary. Once we introduced collapsible links, our users quickly adopted it in a few common patterns:

1. **Compression.** Snippets from unedited source material were often wordy and not clearly related to the current problem-solving context. Many users would distill their snippets into shorter phrases which more clearly emphasized their current context. Once they’d subsumed a snippet’s content, they didn’t need to see it all the time, but they still wanted to keep it around as a reference. Collapsing worked well in these cases.
2. **Task list.** Some of our users treated their collection of uncollapsed snippets like a to-do list of material they still needed to process more carefully.
3. **Example collection.** Another pattern arose when people noticed a recurring theme in their materials. Some test users collected examples of a theme by pasting and immediately collapsing snippet links into a single line. They’d end up with a description of the theme, followed by a string of compact links to instances of the theme. They could quickly view those examples with our preview interaction, by scrubbing their mouse across the line.

## Related work

### Digital text editors

Snippet links are a kind of hypertext, and embedded snippet links are a kind of transclusion. [Originally proposed by Ted Nelson as part of his Xanadu system](https://en.wikipedia.org/wiki/Literary_Machines), transclusions present part of one document within another, while maintaining bi-directional links for navigation and orientation. Transclusion primitives exist today in knowledge management systems like [Notion](https://notion.so), [Roam](https://roamresearch.com), and [Obsidian](https://obsidian.md), but Latticework’s design differs in five key ways from both Xanadu and the modern implementations we’re aware of:

1. Latticework’s portal-based marginalia allow commentary to be created and viewed from either “side” of a snippet link, interchangeably.
2. Snippet links can be serialized to standard URLs in standard Markdown plaintext. (Modern systems only support links to blocks, not arbitrary text ranges. For block links, Obsidian uses non-standard anchors; others use proprietary database formats.)
3. Snippet links can be quickly created (either from source or at the destination) using key commands.
4. Transcluded snippets can be collapsed to increase density, and re-expanded when needed.
5. Pane-based navigation allows users to preview and visit links while maintaining a consistent view of the linking pane.

We’d also like to note some differences with specific modern systems:

- In Notion, transclusions (”[synced blocks](https://www.notion.so/help/synced-blocks)”) often take several seconds to load in large documents. Our user testing suggests that peeking into a link’s destination is a common task, but this delay makes that behavior impractical.
- In Obsidian, when users create a [block link](https://help.obsidian.md/Linking+notes+and+files/Internal+links#Link%20to%20a%20block%20in%20a%20note), a hexadecimal identifier is inserted into the referenced block. This identifier creates a more stable link than our snippet references. But many of our test users mentioned that they don’t use Obsidian’s block references because they find these identifiers messy, and because they worry about accidentally “losing” the identifier when editing the file.
- In Roam, users have improvised annotation-like operations. For example, to “highlight” a block from within a source document, you can edit the block to include a link to your working document. Then the block will appear as a backlink when viewing your working document. Likewise, if you want to “comment” on a block from within a source document, you can add a child node with your note. But in both cases, these “annotations” can’t be rearranged or grouped from within the working document. They’re presented as the result of a database query, not as elements in an editable canvas. Likewise, because they’re stuck in the backlink list, these “annotations” can’t be intermingled with snippets you copied into the working document. This means users can’t move fluidly between the annotating and link-copying workflows we’ve discussed.

### Physical tools: sticky notes and index cards

Many people prefer to use physical materials for synthesis. If you copy snippets onto sticky notes or index cards, you can rearrange them into incremental structure with pleasing tactility, and you can see more at once than you can fit on a computer screen. Why not just print everything out and proceed this way?

**No bulk operations.** Physical space allows you to make loose arrangements: piles and clusters, columns and rows, overlapping and connected. This flexibility can be quite effective for early stages of the process, when the structure of the whole is still unclear. But these arrangements are less flexible when it’s time to refine the structure and articulate new insights. If you want to elaborate on a snippet when working in physical space, you have to make space for it, shifting and moving other clusters aside while maintaining their structure. In a text editor, by contrast, you can just press the “Return” key to create more space for an extra point.

**No undo, no copy-and-paste.** Another problem is that re-arrangement in physical space is a destructive action. If you want to try a different grouping, there’s no easy way for you to undo it, and no easy way to view the new arrangement alongside your old one in parallel. In a text editor, you can just make a copy and try a new variation without disturbing the old one.

**No hypertext.** Looking at a snippet copied onto a sticky note, there’s no easy way to quickly view its surrounding context in the source material. Likewise, when browsing the source material, there’s no way to quickly locate the sticky notes corresponding to a particular passage.

**Storage limitations.** Many people don’t have a space where they can leave their sticky notes up. This has become a bigger issue as working from home has become more common.

### Digital spatial canvases

Digital spatial canvases like [Muse](https://museapp.com) and [Kinopio](https://kinopio.club) aim to resolve many of the problems we raised with physical tools. These tools support bulk operations, undo, copy-and-paste, and hypertext. You can create as many canvases as you want, without worrying about space constraints or tidiness. Unfortunately, existing digital canvases introduce some significant issues.

**Costly insertion.** When we’re elaborating on material, these digital canvas tools often feel more cumbersome than text editors. That’s because inserting new ideas becomes more costly as the canvas becomes more full, since more items must be moved to make space for new material. This shuffling feels more unwieldy in digital canvases than with physical canvases: with index cards, we can use our spread fingers to slide many items at once, or to gently nudge one by sliding another into it. At the computer, we have only our mouse cursor. It’s a bit like using only your pointer finger to manipulate index cards in physical space. Clever interaction design like [Kinopio’s paint selection tool](https://blog.kinopio.club/posts/magic-paint-select/) can help, but we still find it much easier to work with physical cards. In a text editor, by contrast, it’s easy to make space anywhere in the document without disrupting the organization.

**Low information density.** When arranging sticky notes, we often cover a large wall; when arranging index cards, we often cover a large table. Digital canvases feel quite constrained by comparison, even on an expensive 5K display. [Zoomable user interfaces in tools like Muse](https://museapp.com/memos/2020-12-infinite-canvas/) help, but they can’t overcome the fundamental physical limitations. Perhaps head-mounted displays will someday resolve this issue for digital canvases. For now, even on the Apple Vision Pro, display resolutions are currently too low to display text at the physical size of a sticky note. On a given screen, we find that we can see and manipulate more information in a multi-column text editor than in a digital canvas. Text editors are more tightly packed: on digital canvases, we need to leave more empty space, so that it’s possible to re-arrange and insert without moving many items out of the way. This argument may no longer hold on ultrawide displays, since lines can’t be made arbitrarily longer while maintaining legibility, but it seems to apply on our 27” displays.

**Discontinuity with source material.** Most digital canvases, like Muse and Kinopio, aren’t designed for the workflow we’ve been discussing. They’re not tightly integrated with a reading environment. If you just paste plaintext snippets into them, the resulting cards aren’t linked to the source document. Muse does make it possible to excerpt linked viewports of PDFs (not text documents) into your workspace, but the process requires navigating from the PDF to your canvas, which adds disorienting friction. [LiquidText](https://www.liquidtext.net) and [MarginNote](https://marginnote.com) are two interesting exceptions here. Both are designed for deep engagement with long documents. Both allow the user to directly excerpt material onto a spatial canvas, with bidirectional linkages. But in both cases, our experience is that the other digital canvas problems we’ve discussed—costly insertion and low information density—pose significant friction in the sensemaking process.

### Qualitative data analysis tools

Anthropologists, ethnographers, and user experience researchers often use _qualitative data analysis_ (QDA) tools like [MAXQDA](https://www.maxqda.com), [ATLAS.ti](https://atlasti.com), and [Dovetail](https://dovetail.com) to distill insight from large collections of raw material.

In a typical workflow with these tools, users annotate documents by highlighting, tagging (”coding”), and making inline comments. Those tags may be determined in advance (e.g. ”pain points”, “priorities”, “praise”) or created on the fly in response to the content (”[open coding](https://en.wikipedia.org/wiki/Grounded_theory)”). Users arrange and merge those tags to make sense of the themes, generally using tabular and canvas-style interfaces. Then, in some tools, users can create artifacts describing their findings to others, with links back to the relevant passages of source material.

All this sounds quite a lot like Latticework, but there are some important differences:

**Text as a medium for sensemaking.** In QDA tools, the “working document” where you make sense of your excerpts might be a spreadsheet, or a database query, or a whiteboard. By contrast, Latticework emphasizes a textual canvas, where freeform notes and snippets can mix arbitrarily. That mainly comes from a difference in the role of the snippets: we view them less as “evidence” or “data points”, and more as “kindling” which might be consumed and discarded on the way to insight. In the latter setting, when even the problem being solved is undefined, the only way forward is often to write in circles, until some sense starts to emerge. This writing may weave chaotically between new observations and snippets from old documents. Some QDA tools, like Dovetail, include freeform text editors, but their affordances emphasize communication to stakeholders, rather than sensemaking. For example, Dovetail’s editor presents snippets as large, attention-grabbing blocks—appropriate for a finished artifact, but inappropriate for manipulating many snippets at once. These writing surfaces are separate from the interfaces which permit rearrangement and structuring of snippets. That’s in part because QDA tools are intended to work with hundreds or thousands of snippets—for qualitative research projects with so much data that they start to become quantitative. Latticework’s text-centric interface doesn’t scale well past a few dozen snippets.

**Looser, more informal structure.** Just as Latticework treats snippets less seriously than QDA tools, it also treats tags much less seriously. In the messy situations we’ve described, we rarely know the shape of our categories in advance. Often we’re just reacting: “this seems important”; “this is related to that”; “this makes me think of…”; and so on. Giving a cluster a name can impose formality prematurely, adding friction to the process. QDA tools are used in situations which aim for somewhat more rigorous boundaries around categories, for instance so that an analyst can confidently find all the instances where a particular problem occurred. Even in “open coding” practices, where tags work more like snippets, the aim is generally to refine these bottom-up tags into a meaningful taxonomy. In these situations, Latticework’s loose structure will likely serve users less well.

[Reduct](https://reduct.video) is closer to Latticework than other tools in this category, though it’s focused on audiovisual source material rather than text. It includes some features of QDA tools, such as tabular tab hierarchies. But like Latticework, it emphasizes a freeform canvas where audiovisual snippets and commentary can be freely intermingled, and a side-by-side layout for parallel viewing.

## Limitations and future work

**Scaffolded synthesis.** Some test users began their foraging process by performing a search. To use Latticework’s tools, they had to navigate to each result and highlight or copy accordingly. Future iterations could extend Latticework’s annotation tools into the search interface. AI could also scaffold the foraging stage, producing summaries of source documents section by section. Critically, Latticework’s primitives allow AI-generated text to reference supporting passages for quick reorientation, and to do so with the same snippet links which the user themselves can create and manipulate. In this way, an AI assistant and the user _share_ a representation for synthesis, which [Jeffrey Heer argues](https://andymatuschak.org/files/papers/Heer%20-%202019%20-%20Agency%20plus%20automation%20Designing%20artificial%20intel.pdf) can help resolve tensions in mixed-initiative systems.

**Multi-document workflows.** Latticework’s navigation interactions were designed for a two-pane layout, but test users often moved between many documents. Some wished they could “pin” a particularly important source document, to keep it in view as they navigated. Future work should extend our scheme to better support working with many documents simultaneously.

**Recursive synthesis.** Collapsible snippets helped maintain density in working documents, but some test users found this still wasn’t enough. These users tried to treat their working document as another source document, creating recursive rounds of synthesis. This is a behavior we’d like to support, but our current implementation has trouble with excerpts containing excerpts, so we haven’t yet been able to observe how people would use Latticework for these recursive cases. Even if we resolved that technical issue, we’d face a more conceptual problem: our snippet link design may break if the region around the snippet is edited in the target document. Source documents are mostly read-only, so we haven’t encountered broken links, but that’s probably not a safe assumption to make for recursive synthesis.

**Expanded annotation tools.** Latticework only supports annotating plaintext Markdown documents now, but the use case we’ve described often involve working with PDFs, books, and perhaps video as well. In principle, the same core interactions should extend to those other media. Also, our highlighter is limited to a single color right now, but some test users wanted multiple colors, which should then be reflected in the working document’s snippet links. It would be even better to find a way to represent more expressive annotation, like inking, in the interchangeable way we’ve shown.

**More informative snippet links.** It would be easier to stay oriented among these documents if a snippet link made clear which document it came from. And when both a snippet link and its source are visible, it’s unfortunate that one can’t instantly see the correspondence between the two. Prior related work, like Xanadu, has experimented with drawing explicit visual connections between transclusions and their sources. These solutions are quite visually noisy, but perhaps some other approach can help users immediately orient to a snippet link’s source.

**Adjustable snippet ranges.** After working with a snippet link, some test users found that they wanted to shift its endpoints, to include more context or to tighten its focus. Latticework doesn’t currently allow this, but one could create an interaction which modified its current snippet links accordingly.

**Deeper evaluation.** To what extent does Latticework actually help with the difficult process we’ve described? Our test users were largely quite enthusiastic, but our sessions with them usually lasted less than an hour. Future work should be informed by extended use in demanding situations.

## Conclusion

We had a strong personal motivation for this project: we often find ourselves stuck in our own creative work. Latticework’s links might make you think of citations and primary sources—tools for finding the truth in a rigorous research process. But our work on Latticework was mostly driven by the problems of getting _emotionally_ stuck, of feeling disconnected from our framing of the project or our work on it. Why were we so excited about this project in the first place? What was it like to feel conviction and enthusiasm?

Answers are often hiding in our discursive notebooks, buried over time in reams of the mundane. One key motivation for Latticework was how wonderful it feels to stumble upon a past moment of shining clarity, to point and revel. We want to be able to carry those moments with us, to see them all at once when we’re lost, and to use them as landmarks as we navigate our messy notebooks. We’ve used Latticework to do this in small ways so far, and we’re excited to see how our upcoming projects might feel different with its extra affordances.

In our projects, important ideas aren’t confined to plaintext notes. Inspiration often comes from books, papers, videos, group chats, Figma documents, blogs, and Twitter threads. After living with Latticework for months, we can’t help wondering: what if the bidirectional highlighting–linking interaction were an operating-system-level primitive? We imagine being able to highlight and comment on anything, anywhere, and paste links to anything, anywhere. From those links, we’d be able to peek into the surrounding context, no matter whether it’s video or a web page or some more exotic document. All this would be sharable with our collaborators. It would be distributed across all our devices, and, ideally, connect with books and other artifacts in the physical world as well. The dream of hypertext, begun so long ago, still takes on new color.

## Acknowledgments

Thanks to Alicia Guo, Gytis Daujotas, Max Krieger, Peter van Hardenberg, Robert Ochshorn, and Victoria Kim for helpful comments on drafts of this report. Also to Jacky Zhao, Jon Bo, Kasra Koushan, Spencer Chang and others for their feedback at different stages of the research process.

This work was supported by Andy’s [Patreon community](https://patreon.com/quantumcountry). You can [become a member](https://patreon.com/quantumcountry) to help make more work like this possible. You'll get in-depth monthly essays, previews of prototypes, and events like seminars and unconferences.

Andy would like to extend special thanks to his sponsor-level patrons as of publication: [Adam Marblestone](http://www.adammarblestone.org), [Adam Wiggins](https://twitter.com/hirodusk), [Andrew Sutherland](https://asuth.com/), Andy Schriner, [Ben Springwater](https://twitter.com/benspringwater), [Bert Muthalaly](http://somethingdoneright.net/), Boris Verbitsky, [Calvin French-Owen](http://calv.info/), [Dan Romero](https://danromero.org/), [David Wilkinson](https://david.wilkinson.xyz/about), [fnnch](https://fnnch.com/), Greg Vardy, [Heptabase](https://heptabase.com),  [James Hill-Khurana](https://jameshk.com/), James Archer, James Lindenbaum, [Jesse Andrews](https://m4ke.org), [Kevin Lynagh](https://kevinlynagh.com/), [Kinnu](http://kinnu.xyz), [Lambda AI Hardware](https://lambdalabs.com/),  [Ludwig Petersson](https://twitter.com/ludwig), [Maksim Stepanenko](http://maksim.ms/), [Matt Knox](http://mattknox.com/), Michael Slade, [Mickey McManus](http://www.t-1ventures.com/),  [Mintter](http://mintter.com/), [Patrick Collison](https://patrickcollison.com/), [Peter Hartree](https://peterhartree.co.uk/), [Ross Boucher](http://rossboucher.com), [Russel Simmons](https://github.com/rsimmons/), [Salem Al-Mansoori](https://twitter.com/uncomposition), [Sana Labs](https://www.sanalabs.com/), [Thomas Honeyman](https://thomashoneyman.com/), Todor Markov, [Tooz Wu](https://twitter.com/toozwu), William Clausen, [William Laitinen](https://www.exigeinternational.com/), [Yaniv Tal](https://twitter.com/yanivgraph).

## Appendix

While we've made this research prototype [available on GitHub](https://github.com/Siunami/Latticework), it's important to note that it doesn't fully implement all the features described in this report. We're sharing it primarily as a reference implementation that provided us insights during the research process.
<!-- prettier-ignore-end -->
