import time
import keyboard
import random
import os.path
from os import path

def sendKeystrokes(s):
    return

def allChatBot():
    filePath = "log.txt"
    if (path.exists(filePath)):
        while not os.path.exists(filePath):
            time.sleep(.001)
        if os.path.isfile(filePath):
            os.remove(filePath)
        else:
            raise ValueError("%s isn't a file!" % filePath)
    file = open(filePath, "w")
    print("Collecting Logs")
    totalDelay = 15
    for i in range(totalDelay):
        print (totalDelay-i)
        time.sleep(1)
    try:
        with open(filePath) as f:
            lines = f.readlines()
            val = random.choice(lines)
            print(val)
            sendKeystrokes(val)
    except:
        print("no messages")
    while not os.path.exists(filePath):
        time.sleep(.001)
    if os.path.isfile(filePath):
        os.remove(filePath)
    else:
        raise ValueError("%s isn't a file!" % filePath)
    return

while True:
    if keyboard.is_pressed('p'):  # if key 'q' is pressed
        print('Time to allchat')
        allChatBot()

