import secrets
import string
def generate_random_string(length):
    characters = string.ascii_letters + string.digits
    random_string = ''.join(secrets.choice(characters) for _ in range(length))
    return random_string

import hashlib

def generate_short_url_pattern(url):
    # Generate unique pattern
    sha256_hash = hashlib.sha256(url.encode()).hexdigest()

    # Store only first 6 letters
    short_pattern = sha256_hash[:6]

    return short_pattern