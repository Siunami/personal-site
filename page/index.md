---
layout: post
title: Page
---

{% newthought 'In this first iteration'%} of the _Tufte-Jekyll_ theme, a post and a page have exactly the same layout. That means that all the typographic and structural details are identical between the two.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">The result of a quick test run with Principle: created a book reader app where books gather dust if you don&#39;t read them for a while. <a href="https://t.co/jXIyXUQm7k">pic.twitter.com/jXIyXUQm7k</a></p>&mdash; Petr Andrianov (@UXpetr) <a href="https://twitter.com/UXpetr/status/1742661520310354004?ref_src=twsrc%5Etfw">January 3, 2024</a></blockquote>

## Pages and Posts

Jekyll provides for both pages and posts in its default configuration. I have left this as-is.

### Posts

Conceptually, posts are for recurring pieces of similar content such as might be found in a typical blog entry. Post content all sits in a folder named `_posts` and files are created in this folder{% sidenote 1 'Yes, a page has essentially the same old shit as a post'%} that are names with a date pre-pended to the title of the post. For instance `2105-02-20-this-is-a-post.md` is a perfectly valid post filename.

Posts will always have a section above the content itself consisting of YAML front matter, which is meta-data information about the post. Minimally, a post title must always be present for it to be processed properly.

```
---
Title: Some Title
---
## Content

Markdown formatted content *here*.
```

### Pages

Pages are any HTML documents _or_ Markdown documents with YAML front matter that are then converted to content. Page material is more suited to static, non-recurring types of content. Like this

I am not going to re-write the Jekyll documentation. Read it and you will figure out how the site is structured.

<!-- <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> -->
