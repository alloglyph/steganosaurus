#!/usr/bin/env python3

import re
import sys

def decode(steganosaurus):
    bitList = []
    for word in steganosaurus.split(' '):
        bareWord = re.sub('[^a-z]', '', word.lower())
        bitList.append(len(bareWord) % 2)
    letters = []
    for x in range(len(bitList) // 6):
        mySlice = bitList[x*6:((x+1)*6)]
        letterOrd = 97
        for (power, bit) in enumerate(mySlice):
            letterOrd += bit * 2 ** (5 - power)
        letters.append(chr(letterOrd))
    return ''.join(letters)

if __name__ == '__main__':
    with open(sys.argv[1]) as fp:
        stegotext = fp.read().replace("\n", " ")
    print(decode(stegotext))
