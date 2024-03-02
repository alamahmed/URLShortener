import hashlib
# import random

def hashGen(url):
    # randomBytes = random.randbytes(1)
    # url = str(randomBytes) + url
    test = hashlib.md5(url.encode('utf-8'))
    print("hash value: ", test.hexdigest())

hashGen("https://github.com/new")
