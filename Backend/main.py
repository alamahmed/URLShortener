import hashlib

def hashGen(url):
    test = hashlib.md5(url.encode('utf-8'))
    print("hash value: ", test.hexdigest())

hashGen("https://github.com/new")
