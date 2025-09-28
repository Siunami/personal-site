## interfaces

for the interfaces where you could play with them, you should have something there that can prove it.

## content

    {% assign prototypes = site.data.prototypes %} {% assign total_prototypes =
    prototypes | size %} {% assign third_of_prototypes = total_prototypes |
    divided_by: 3 %} {% assign remainder = total_prototypes | modulo: 3 %} {%
    assign start_index_list2 = third_of_prototypes %} {% assign start_index_list3
    = third_of_prototypes | times: 2 %} {% if remainder >= 1 %} {% assign
    start_index_list3 = start_index_list3 | plus: 1 %} {% endif %} {% if remainder
    == 2 %} {% assign start_index_list3 = start_index_list3 | plus: 1 %} {%
    endif%} {% assign list1 = prototypes | slice: 0, start_index_list2 %} {%
    assign list2 = prototypes | slice: start_index_list2, start_index_list3 %} {%
    assign list3 = prototypes | slice: start_index_list3, 100 %} {% assign
    string_list = "jpg,png,gif" | split: "," %}

```html
<!-- prettier-ignore-start -->
{% assign prototypes = site.data.prototypes %} {% assign total_prototypes =
prototypes | size %} {% assign third_of_prototypes = total_prototypes |
divided_by: 3 %} {% assign remainder = total_prototypes | modulo: 3 %} {% assign
start_index_list2 = third_of_prototypes %} {% assign start_index_list3 =
third_of_prototypes | times: 2 %} {% if remainder >= 1 %} {% assign
start_index_list3 = start_index_list3 | plus: 1 %} {% assign extra_proto =
third_of_prototypes | plus: 1 %}{% assign list2 = prototypes | slice:
start_index_list2, extra_proto %} {% else %} {% assign list2 = prototypes |
slice: start_index_list2, third_of_prototypes %} {% endif %} {% assign list1 =
prototypes | slice: 0, start_index_list2 %} {% assign list3 = prototypes |
slice: start_index_list3, 100 %} {% assign string_list = "jpg,png,gif" | split:
"," %}
<!-- prettier-ignore-end -->

<div class="grid-item">
	{% for prototype in list1 %} {% assign is_image = false %} {% for string in
	string_list %} {% if prototype.resource contains string %} {% assign is_image
	= true %} {% break %} {% endif %} {% endfor %}
	<div style="position: relative">
		{% if is_image %}
		<!-- Handle images -->
		<img
			src="{{ prototype.resource }}"
			alt="{{ prototype.name }}"
			class="prototype image-dimensions"
		/>
		{% else %}
		<!-- Handle videos -->
		<video
			class="prototype video-dimensions"
			src="{{ prototype.resource }}"
			autoplay
			loop
			muted
		>
			<!-- <span class="prototype-caption">{{ prototype.name }}</span> -->
		</video>

		{% endif %}
		<span class="prototype-caption"
			>{{ prototype.name }}{% if prototype.link | default: "" | strip != "" %}
			<a href="{{ prototype.link }}">🔗</a>
			{% endif %}</span
		>
	</div>
	{% endfor %}
</div>

<div class="grid-item">
	{% for prototype in list2 %} {% assign is_image = false %} {% for string in
	string_list %} {% if prototype.resource contains string %} {% assign is_image
	= true %} {% break %} {% endif %} {% endfor %}
	<div style="position: relative">
		{% if is_image %}
		<!-- Handle images -->
		<img
			src="{{ prototype.resource }}"
			alt="{{ prototype.name }}"
			class="prototype image-dimensions"
		/>
		{% else %}
		<!-- Handle videos -->
		<video
			class="prototype video-dimensions"
			src="{{ prototype.resource }}"
			autoplay
			loop
			muted
		>
			<!-- <span class="prototype-caption">{{ prototype.name }}</span> -->
		</video>

		{% endif %}
		<span class="prototype-caption"
			>{{ prototype.name }}{% if prototype.link | default: "" | strip != "" %}
			<a href="{{ prototype.link }}">🔗</a>
			{% endif %}</span
		>
	</div>
	{% endfor %}
</div>

<div class="grid-item">
	{% for prototype in list3 %} {% assign is_image = false %} {% for string in
	string_list %} {% if prototype.resource contains string %} {% assign is_image
	= true %} {% break %} {% endif %} {% endfor %}
	<div style="position: relative">
		{% if is_image %}
		<!-- Handle images -->
		<img
			src="{{ prototype.resource }}"
			alt="{{ prototype.name }}"
			class="prototype image-dimensions"
		/>
		{% else %}
		<!-- Handle videos -->
		<video
			class="prototype video-dimensions"
			src="{{ prototype.resource }}"
			autoplay
			loop
			muted
		>
			<!-- <span class="prototype-caption">{{ prototype.name }}</span> -->
		</video>

		{% endif %}
		<span class="prototype-caption"
			>{{ prototype.name }}{% if prototype.link | default: "" | strip != "" %}
			<a href="{{ prototype.link }}">🔗</a>
			{% endif %}</span
		>
	</div>
	{% endfor %}
</div>
```

{
"January 2024": [

],
"past": [
{
name: "Dynamic Documents",
link: "/dynamic_documents",
categories: [],
marking: "",
collaborators: ["Azlen Elza"]
}
]
}

http://127.0.0.1:4000/dynamic_documents

http://127.0.0.1:4000/peek/

http://127.0.0.1:4000/remix/

http://127.0.0.1:4000/interfaces/

Memory Map

Worlding Comic

Paper sketches

- Scan everything, and make an interface for nice navigation of long horizontal documents.

Interhackt

Globe Explorer

my favorite things (books, movies, music)

poems

Bookshelf

All WRITINGS

- Substack
- old website

Questions

Places

Are.na collections on urban planning

Olive Tree Writing Club

Music theory artifacts

I want to make some artifacts for my mech interp learning

- Can be curated resources
- things I made during the learning process

What is the bar for these artifacts? They should be surprising in some way.
They should spark a sense of curiosity in the individual
