import requests


def get_api_data(url, headers=None, params=None):
    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()  # Raises a HTTPError if the status is 4xx, 5xx

        return response.json()  # Returns the response as a JSON object

    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
    except Exception as err:
        print(f"An error occurred: {err}")


# Usage
url = "https://curius.app/api/users/524/links"
headers = {}
params = {"page": "10"}

data = get_api_data(url, headers, params)

print(data)
# while (data["userSaved"])
