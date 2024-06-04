import requests

# url = "https://thesephist--prism-start-app.modal.run/f/sm-v6/2622?layout=3"
url = "https://thesephist--prism-start-app.modal.run/models/sm-v6/features/2622"

response = requests.get(url)


# print the status code
print(response.status_code)

# print the content of the response
print(response.text)

data = response.json()

print("test")
print(data)

# https://thesephist--prism-start-app.modal.run/f/sm-v6/2622?layout=3
