from itertools import chain

greetings = ['hi', 'bye', 'tschuss']
numbers = [21, 43, 100, 2, 4]
languages = ['hindi', 'english', 'nepali', 'bihari']

combination = chain(greetings, numbers, languages)

print(combination)
for item in combination:
    break 

print(combination.__next__())

for item in languages:
    print(item)
    break 

for item in languages:
    print(item)