/* Bytewise — "In plain English" openers. One short, jargon-free, everyday-analogy intro per lesson section.
   PLAIN[chapterId][sectionIndex] is shown above that section's technical text (engine.js learnView). A `plain`
   field on a section (Sec(...).plain) overrides the entry here. */
'use strict';
const PLAIN = {
  /* ---------- Programming Fundamentals ---------- */
  k1: [
    "A computer is like a kitchen. The processor is the cook following a recipe one step at a time, memory is the counter where ingredients sit while you work, and the hard drive is the pantry where things are kept for later. Software is the recipe itself: the instructions that tell the cook what to do.",
    "Writing a program is like writing a letter in English for someone who only reads Morse code. A few helper tools translate your text, check it for mistakes, and staple in pieces other people already wrote, until the computer has a version it can actually follow.",
    "Before you cook, you plan: what goes in, what you do to it, and what dish comes out. Programmers plan the same way, either in plain step-by-step sentences or as a drawing of boxes and arrows, so writing the real code is mostly copying the plan.",
  ],
  k2: [
    "Everyday counting uses ten digits, one for each finger. Computers only have two, off and on, so each place in a number is worth double the place to its right (1, 2, 4, 8…) instead of ten times. Hexadecimal is shorthand: one symbol stands for a group of four of those on/off switches.",
    "Think of a car's odometer rolling backward past zero: 0000 turns into 9999. Computers store negative numbers the same way, so going one below zero wraps around to 'all ones,' and ordinary adding still works for positive and negative numbers alike.",
    "Every letter on your keyboard secretly has a number, like seats in a theater: 'A' sits in seat 65 and 'a' in seat 97. Decimal numbers are stored like scientific notation with a fixed number of digits, so some values, like 0.1, are only stored approximately, the way 1/3 never quite fits as 0.333…",
  ],
  k3: [
    "A variable is a labeled box that holds one value, and the label also says what kind of thing fits (whole numbers, decimals, letters). Dividing two whole numbers works like splitting cookies among friends: everyone gets whole cookies, and the leftovers are a separate answer.",
    "Reading input is like a cashier taking items off a conveyor belt: one way grabs a single item and stops at the first gap, another grabs everything up to the end of the belt. The catch is the leftover Enter key press still sitting on the belt, which can get grabbed by mistake.",
  ],
  k4: [
    "Decisions in code work like a bouncer reading a list of rules from the top. The first rule that matches decides what happens, and nobody reads the rest, so the order of your checks matters.",
    "'And' means both things must be true (you need a ticket and an ID). 'Or' means either one is enough. The computer is lazy in a smart way: if the first half already settles the answer, it never even looks at the second half.",
    "A switch is like an elevator: press a floor and the doors open there. But unless something says 'stop here,' the doors keep opening on every floor below it too, and that surprise is what this section is about.",
  ],
  k5: [
    "A loop repeats instructions, like running laps until the coach says stop. One kind checks the rule before the first lap (so you might run zero), one checks after (you always run at least one), and the counting kind is for when you know exactly how many laps.",
    "A counter is a tally clicker at a door, and an accumulator is a running total on a receipt. A sentinel is a 'stop' signal, like typing -1 to say you're done. Nested loops are a clock: the minute hand goes all the way around for every single step of the hour hand.",
    "Reading a file is like reading a book out loud: open it, read one word at a time until you run out of pages, then close it. Writing is the same with a blank notebook. Always check that the book actually opened before you start reading.",
  ],
  k6: [
    "A function is a recipe card with a name. Once it's written, anyone can say 'make the area recipe with 2' and get the result back, instead of rewriting the steps every time. You just have to tell the computer the recipe exists before anyone asks for it.",
    "Passing by value is handing someone a photocopy: they can scribble on it, but your original stays clean. Passing by reference is handing over the original itself, so any change they make is a change to yours.",
    "A variable made inside a function is like a whiteboard in a meeting room: it's wiped clean when the meeting ends. A 'static' one is a whiteboard nobody erases, so it remembers between meetings. A global is a poster in the hallway that every room can see, and mess with.",
  ],
  k7: [
    "An array is a row of numbered mailboxes, all the same size, side by side. The numbering starts at 0, not 1, and nothing stops you from reaching into a mailbox past the end of the row, which is a common and sneaky bug.",
    "Finding a name in a messy pile of cards means checking every card. In a phone book sorted A to Z, you can open to the middle, see whether the name comes before or after, and throw away half the book each time, so even a huge book takes only a handful of steps.",
    "Bubble sort is kids in a line swapping with their neighbor whenever the taller one is in front, over and over until nobody needs to swap. Selection sort is picking the shortest kid left in the group and sending them to the next spot in line.",
  ],
  /* ---------- Programming in C++ ---------- */
  g2: [
    "A C++ program is laid out like a formal letter: a standard heading listing the tools you're borrowing, a main body where the action starts, and a sign-off. Printing to the screen is simply how the program talks out loud.",
    "A variable is a labeled jar on a shelf: the name is the label and what's inside can change. A literal is a value written straight into the code, like the number 5 printed on a recipe. Names follow a few rules, like name tags: no spaces, and they can't start with a digit.",
    "There are different jars for different things: a tiny jar for one letter, a bigger one for whole numbers, an even bigger one for decimals. Each jar has a fixed size, so it can only hold numbers up to a certain limit.",
    "Math in C++ looks like calculator math with one surprise: dividing whole numbers throws away the fraction, like asking how many full boxes you can fill. A separate operator gives you the leftovers. Comments are sticky notes for humans that the computer ignores.",
  ],
  g3: [
    "This is how the program listens to the keyboard. It reads one 'word' at a time and stops at the first space, like someone jotting down a phone number who stops at the first pause.",
    "It's the same order of operations from math class: multiplying and dividing happen before adding and subtracting, and parentheses beat everything. When two steps are tied, you go left to right, like reading.",
    "Mixing whole numbers with decimals is like mixing dollars with cents: the computer converts everything to the more detailed one first. Pour too big a number into a small jar and it spills over and wraps around like an odometer. A cast is you saying 'treat this as a decimal, on purpose.'",
    "'x += 5' is shorthand for 'add 5 to whatever is already in x,' like topping up a gas tank instead of refilling it from empty. A chain like a = b = c = 0 is passed down the line from right to left, like a bucket brigade.",
    "Formatting is like setting up a printed table: you choose how wide each column is and how many decimal places to show, so money prints as 3.50 instead of 3.5. Some settings last for one item only; others stick until you change them.",
    "Reading a number leaves your Enter key press sitting in line, like a leftover receipt on the counter. If the next thing you read is a whole line of text, it grabs that empty leftover and thinks you typed nothing. The fix is to throw the leftover away first.",
    "C++ comes with a built-in calculator for square roots, powers and rounding, so you don't write them yourself. Random numbers work like a deck of cards: shuffle once at the start (using the clock), then deal as many cards as you need.",
  ],
  g4: [
    "Comparisons are yes-or-no questions: is the score at least 90? An 'if' is a gate that only opens when the answer is yes. One quirk: the computer treats any number other than zero as a yes.",
    "An if/else-if chain is a ladder of rules checked from the top; the first rung that fits is the only one used. When you tuck ifs inside other ifs, an 'else' always belongs to the closest 'if' above it, no matter how the spacing looks.",
    "'And' needs both parts true, 'or' needs just one, and 'not' flips the answer. Like a busy teacher grading a two-part question, the computer stops early once the first part already decides the result.",
    "Letters are compared by their secret seat numbers, which is why a capital 'Z' comes before a lowercase 'a.' Words are compared like a dictionary, letter by letter. The conditional operator is a one-line 'this or that' choice.",
    "A switch is a vending machine: punch in a number and it jumps straight to that slot. Without a 'break,' it keeps dropping snacks from every slot below. Variables made inside curly braces only exist inside those braces, like a note left in one room.",
  ],
  g5: [
    "'++' means 'add one.' Putting it after the name means use the old value first and then update the scoreboard; putting it before means update the scoreboard first and then read it. On a line by itself, both do the same thing.",
    "A while loop checks the weather before going for a run, so it might not run at all. A do-while runs one lap first and checks afterward. A for loop has the lap counter built right in.",
    "A running total is a tip jar you keep adding to. A sentinel is a 'last call' signal that ends the input. Input validation is a polite bouncer that keeps asking until you give a sensible answer.",
    "Nested loops are like a clock: the minute hand makes a full trip for every single step of the hour hand. 'break' means leave the loop entirely; 'continue' means skip the rest of this lap and start the next one.",
    "Files work just like the keyboard and the screen, only pointed at a document instead. Opening for writing is grabbing a fresh notebook (it erases what was there); opening for reading is picking up one that's already filled in. Always check that it actually opened.",
  ],
  g6: [
    "A function is a named recipe you can use over and over. The computer reads your file from top to bottom, so either write the recipe before you use it, or put a one-line 'this recipe exists' note at the top.",
    "Normally a function gets a photocopy of what you send, so it can't mess up your original. It can hand back exactly one result, like a vending machine giving you one item.",
    "A variable made inside a function is a scratch pad that's thrown away when the function finishes. A static one is a scratch pad kept in a drawer between uses. A global is a whiteboard in the hallway that everyone can read and change, which is handy but risky.",
    "Default values are like a coffee order that assumes 'medium, regular milk' unless you say otherwise, but you can only leave things off the end of the order. Passing by reference hands over your actual cup, not a copy, so changes stick.",
    "Several recipes can share one name as long as they take different ingredients, like 'make a sandwich' with bread or with a wrap; the computer picks the one that fits what you handed it. exit() is the emergency stop button for the whole program.",
  ],
  g7: [
    "An array is a row of numbered lockers, all the same size, next to each other. Numbering starts at 0, and C++ won't stop you from opening locker 10 in a row of 5; it just hands you whatever junk happens to be there.",
    "If you fill in only the first few lockers when you build the row, the rest start out as zero. If you fill in none, they hold random leftover junk. The shortcut loop here is a quick way to say 'do this for every locker.'",
    "Most array jobs are the same few chores: add everything up, find the biggest, count matches. Parallel arrays are like two class lists where line 3 of one (names) lines up with line 3 of the other (grades).",
    "Handing an array to a function is like giving someone the location of your lockers, not a copy of what's inside, so they can rearrange your real stuff. They also don't know how many lockers there are unless you tell them.",
    "A two-dimensional array is a spreadsheet grid of rows and columns. Behind the scenes it's stored as one long line, row after row, the way a page of text is one row of words after another.",
    "A vector is an array that grows itself, like an accordion folder that adds a pocket whenever you need another one. It also knows its own size and can check that you aren't reaching past the end.",
  ],
  g8: [
    "Linear search is looking for your keys by checking every pocket one by one. It works no matter how messy things are, but in the worst case you check every single pocket.",
    "Binary search is the number-guessing game: guess the middle, hear 'higher' or 'lower,' and throw away half the options each time. It only works when the list is already in order, but it finds things in very few steps.",
    "Picture a line of kids where any two neighbors in the wrong height order swap places. After each trip down the line, the tallest kid left has 'bubbled' to the end, so the sorted part grows from the back.",
    "Selection sort is like picking teams: look over everyone left, choose the smallest, put them in the next spot, repeat. It always does the same amount of looking, but very little swapping.",
  ],
  g9: [
    "Every variable lives at a street address in memory. A pointer is a sticky note with an address written on it, and following the note to the house lets you read or change what's inside.",
    "An array's name is really the location of its first locker. 'Go three lockers down' is the same as reading locker number 3, and the computer automatically steps by the width of one locker, not one inch at a time.",
    "If every house on a street is 4 lots wide, the third house after #1000 is #1012, not #1003. Moving a pointer forward always jumps one whole item's width at a time.",
    "Giving a function a pointer is like giving a friend your address so they can rearrange your living room. Adding 'const' puts up a 'look, don't touch' sign.",
    "'new' is renting a storage unit while the program runs, and you get back the unit's address. It stays rented until you hand the key back with 'delete'; forgetting to is a leak, like paying for units you'll never visit again.",
    "A smart pointer is a storage-unit key that returns itself when you're done, so you can't forget. One kind allows a single owner only; another keeps count of how many people share the unit and returns it when the last one leaves.",
  ],
  g10: [
    "C++ has quick yes-or-no questions for a single character: is it a letter? a digit? a space? There are also helpers that hand you the uppercase or lowercase version without changing the original.",
    "An old-style C string is a row of letter boxes with a special 'end here' marker after the last letter, like a period telling the reader the sentence is over. Forget the marker, or run out of boxes, and things go badly.",
    "The text '42' and the number 42 look the same to you but not to a computer, like a photo of a coin versus the coin itself. These helpers convert between the two, reading digits until they hit something that isn't one.",
    "The string class is a smart text container that handles its own size, like a notebook that grows pages as you write. It comes with tools to measure, join, cut out pieces and search for words inside.",
  ],
  g11: [
    "A struct is like a form with labeled blanks: name, ID, GPA. It bundles the facts about one thing together, so you can pass the whole form around at once.",
    "An array of structs is a stack of filled-in forms, one per student. When all you have is the location of a form, the arrow '->' means 'go to that form and read this blank.'",
    "An enumerated type gives friendly names to a short list of choices, like naming the days of the week instead of remembering that 0 means Monday. Behind the scenes they're still just numbers counting up.",
  ],
  g12: [
    "Opening a file is like deciding how to open a notebook: to read it, to write it fresh, or to add to the end. The file also keeps little warning lights (reached the end, something went wrong) that you can check.",
    "Normally you read a file front to back, like a cassette tape. When every record is the same size, it's more like a CD: you can jump straight to track 7 because you know exactly where it starts.",
  ],
  g13: [
    "A class is a blueprint for a kind of object, like a house blueprint: it says what's inside (the data) and what you can do with it (the functions). Private parts are behind locked doors; public parts are the doorbell and windows anyone can use.",
    "A constructor is the setup crew that shows up automatically when a new object is built, and the destructor is the cleanup crew when it's thrown away. You never call them yourself.",
    "You can offer several ways to build an object, like ordering a pizza plain or with toppings. Building a whole row of objects uses the plain version for each one. Big programs keep the blueprint and the building instructions in separate files.",
  ],
  g14: [
    "A static member is one shared item for the whole class, like a single tally board in the break room that every employee updates. A 'friend' is someone outside the class you trust with the keys to its private rooms.",
    "Copying an object normally copies each part. But if one part is the address of a storage unit, both copies end up sharing the same unit, so changing one changes the other. A deep copy rents a second unit and moves a full copy of the stuff in.",
    "This teaches your own types to use symbols like + and <, so adding two Money amounts reads just like adding numbers. 'this' is how an object refers to itself, the way you'd say 'me.'",
    "This is about 'has-a' relationships: a car has an engine. The parts are built before the whole thing is finished, just as the engine is assembled before the car rolls off the line.",
  ],
  g15: [
    "Inheritance is like a family recipe: Circle starts from the general Shape recipe and adds its own details. The parent's part is built first and then the child's, like pouring the foundation before adding the second floor.",
    "Imagine telling something you only know is 'an animal' to speak. Without 'virtual,' the computer goes by the label on the box (animal); with 'virtual,' it checks what's really inside (a dog) and lets it bark.",
    "An abstract class is a template with blanks you must fill in, like a form that says 'describe your shape's area here.' You can't build one directly, only the specific shapes that fill in the blanks.",
  ],
  g16: [
    "An exception is a fire alarm. When something goes badly wrong deep inside the code, it pulls the alarm and jumps straight out to whoever is set up to handle it, skipping everything in between.",
    "A template is a cookie cutter that works with any dough: write 'find the bigger of two things' once, and it works for whole numbers, decimals or words. You just can't mix two different doughs in one cut.",
    "The standard library is a ready-made toolbox: containers to hold things (lists, sets, lookup tables), bookmarks for walking through them, and common chores like sorting already written for you.",
  ],
  g17: [
    "A linked list is a scavenger hunt: each clue holds a piece of data plus directions to the next clue. To see everything, you start at the first clue and follow the directions until one says 'the end.'",
    "Adding a clue to the hunt means first copying the old 'next' directions onto the new clue, then pointing the clue before it at the new one. Do it in the wrong order and you lose the rest of the trail.",
    "A doubly linked list has directions forward and backward, like a train where every car is coupled at both ends. A circular list's last clue points back to the first, like a running track with no finish line.",
  ],
  g20: [
    "Recursion is like Russian nesting dolls: to open the big one, you open a slightly smaller one inside, and so on, until you reach the tiny solid doll that doesn't open. That smallest doll is the 'stop here' rule every recursive function needs.",
    "To find what a recursive function returns, follow the dolls all the way down, then carry the answers back up one level at a time. To count how many times it runs, sketch it like a family tree of who called whom.",
    "Some problems are just smaller copies of themselves: moving a tower of disks, searching half of a sorted list, or sorting each side of a split pile. Recursion lets you solve the smaller copy and trust it to handle the rest.",
  ],
  /* ---------- Discrete Mathematics ---------- */
  ro1: [
    "A proposition is any statement you could stamp TRUE or FALSE, like '7 is prime.' Questions and commands can't be stamped, so they don't count. Connectives are the glue words (and, or, not, if…then) that build bigger statements out of small ones.",
    "'If it's raining, the ground is wet' makes the same promise as 'if the ground isn't wet, it isn't raining.' But flipping it to 'if the ground is wet, it's raining' is a different claim, since a sprinkler could have done it.",
    "A truth table checks every possible combination, like testing every position of a row of light switches. Each new switch doubles the number of combinations. A statement that comes out true in every row is true no matter what.",
    "Two statements are equivalent if they always agree, like two different routes that always end at the same place. De Morgan's rule: 'not (tea and coffee)' means 'no tea, or no coffee.' The 'not' flips 'and' into 'or.'",
  ],
  ro2: [
    "A predicate is a sentence with a blank, like '___ is even.' Quantifiers fill the blank for a whole group at once: 'for every' means it must work for everyone, and 'there exists' means one example is enough.",
    "'Everyone has someone they love' is very different from 'there's someone everyone loves.' Same words, different order, different meaning, and that's the whole point of this section.",
    "These are the moves a detective is allowed to make. If 'whenever it rains, the street gets wet' and 'it rained,' then the street is wet. Each rule is a guaranteed-safe step from facts you know to a new fact.",
  ],
  ro3: [
    "A direct proof walks forward step by step from what you're given to what you want, like following a map. Sometimes it's easier to walk the route backward: show that if the ending is false, the starting point must be false too.",
    "Proof by contradiction is the lawyer's move: 'suppose my client was there; then he'd have been in two places at once, which is impossible.' Assume the opposite, follow it until something absurd happens, and the original must be true.",
    "Proof by cases splits the world into a few piles that cover everything (even numbers, odd numbers) and handles each pile. To show 'all swans are white' is false, you only need one black swan.",
  ],
  ro4: [
    "A set is a bag of different things where order doesn't matter and repeats don't count. A subset is a smaller bag you can fill from it, and the power set is the collection of every possible smaller bag, including the empty one.",
    "Picture two overlapping circles: the union is everything in either circle, the intersection is just the overlap, and the difference is one circle with the overlap cut out.",
    "If 20 students play soccer and 15 play tennis, there aren't necessarily 35 players, because anyone who plays both was counted twice. Add the groups, subtract the overlap, and with three groups add back the middle piece you subtracted too many times.",
  ],
  ro5: [
    "A function is a rule that pairs every input with exactly one output, like giving each student a seat. One-to-one means no two students share a seat; onto means no seat is left empty. Both together make a perfect pairing.",
    "Composition is doing one step after another, like 'put on socks, then shoes.' The inverse is the undo button, and undoing a chain happens in reverse order: shoes off first, then socks.",
    "Floor rounds down to the nearest whole number and ceiling rounds up. Ceiling answers 'how many boxes do I need?': 25 eggs in cartons of 12 needs 3 cartons, even though the last one isn't full.",
  ],
  ro6: [
    "An arithmetic sequence adds the same amount each step, like saving $5 every week. A geometric one multiplies each step, like a rumor where every person tells two more. The formulas here add up long lists instantly instead of one item at a time.",
    "A recurrence describes each step using the one before, like 'this year's savings = last year's times two, plus one.' Give it a starting value and you can compute every term, and often find a shortcut formula.",
    "Two groups are the same size if you can pair them up perfectly, like matching every chair to a person. Some endless groups can still be listed one by one (first, second, third…), but the decimal numbers are so packed that no list can ever catch them all.",
  ],
  ro7: [
    "Big-O is about how work grows as the job gets bigger, ignoring small details. Washing dishes one at a time grows with the pile; having every guest at a party shake hands with every other guest grows much faster. We care about the shape of the growth, not the exact seconds.",
    "To estimate how slow a method is, count how often its main step happens as the input grows. One pass through a list grows with its length, a loop inside a loop is like everyone shaking hands with everyone, and halving the work each time grows very slowly.",
  ],
  ro8: [
    "'a divides b' just means b splits into equal groups of a with nothing left over. The division algorithm is grade-school long division: any number equals some whole number of groups plus a leftover smaller than one group.",
    "Modular arithmetic is clock math: 3 hours after 11 o'clock is 2, not 14. Two numbers are 'congruent' if they land on the same spot on the clock, and you can wrap around at any step to keep the numbers small.",
    "We use ten digits because of ten fingers; other bases just use a different number. To convert, keep dividing by the new base and collect the leftovers, like making change using one coin size at a time.",
    "Raising a number to a huge power one multiplication at a time is slow. Instead you square, square, square (like folding paper in half again and again) and wrap around the clock after each step, so the numbers never get huge.",
  ],
  ro9: [
    "Primes are the building blocks of numbers, like LEGO bricks that can't be broken down further. The greatest common divisor is the biggest piece two numbers share; the least common multiple is the first time two repeating schedules line up.",
    "To find the biggest square tile that exactly covers a 48 by 18 floor, keep cutting off squares the size of the short side until nothing is left; the last tile that fits evenly is the answer. Bézout adds that this answer can always be written as a mix of the two numbers.",
    "On a clock, 'dividing' means asking which number you multiply by to land back on 1. That undo number only exists when your number and the clock size share no common factor.",
    "The Chinese remainder theorem is solving a riddle from clues like 'it's a Tuesday, and it's an odd week.' When the clues come from cycles that don't share a rhythm, exactly one answer fits per full cycle. Fermat's little theorem is a shortcut that collapses huge powers on a prime-sized clock down to 1.",
  ],
  ro10: [
    "Induction is the domino argument: show the first domino falls, and show that any falling domino knocks over the next one. Then every domino falls, however many there are.",
    "Strong induction is the same domino idea, but each domino may lean on all the earlier ones, not just the one right before it. That helps with problems like making postage from 4- and 5-cent stamps, where each amount builds on one a few steps back.",
    "A recursive definition is a recipe that says 'start with this, and here's how to build the next one from what you have.' Structural induction proves something about everything you can build by checking the starting pieces and each building step.",
  ],
  ro11: [
    "If an outfit is a shirt (3 choices) and pants (4 choices), there are 3 × 4 outfits; that's the product rule. If you choose a shirt or a jacket, you add instead. And if some outfits got counted twice, subtract the repeats.",
    "If 13 people are in a room, at least two share a birth month, since there are only 12 months to go around. Put more things into boxes than there are boxes, and some box has to double up.",
    "Choosing a president, a VP and a treasurer cares about order (who gets which job); choosing a 3-person committee doesn't. The key question is always 'does rearranging the pick change anything?'",
  ],
  ro12: [
    "Multiplying out (x + y) many times by hand gets messy fast. The binomial theorem is a shortcut that tells you every term at once, and the numbers in front come straight from Pascal's triangle.",
    "Choosing 10 donuts from 4 flavors, repeats allowed, is like lining up 10 stars and dropping 3 dividers between them to mark where each flavor ends. Counting the ways to place the dividers counts every possible order.",
    "Rearranging the letters of 'BOOK' and swapping the two O's doesn't make a new word. So you count every arrangement, then divide out the swaps among identical letters.",
  ],
  ro13: [
    "A relation is a list of who is connected to whom, like who follows whom online. The properties ask questions about that list: does everyone follow themselves? If you follow me, do I follow you back? If A follows B and B follows C, does A follow C?",
    "Picture a grid where each square is a yes/no switch for 'are these two connected?' Counting relations means counting switch settings: each free switch doubles the count, and each property just locks some switches in place.",
    "A relation can be drawn as a grid of 1s and 0s, like a seating chart of who knows whom. A 'closure' adds the fewest extra connections needed to make a property true, like adding friend-of-a-friend links until nothing more needs adding.",
    "An equivalence relation sorts things into non-overlapping piles of 'basically the same,' like sorting socks by color. Every sock lands in exactly one pile.",
    "A partial order is a 'comes before' ranking where some things simply aren't compared, like prerequisites: Calc I comes before Calc II, but Art and Chemistry have no order between them. A Hasse diagram draws it as a ladder showing only the direct steps.",
  ],
  /* ---------- Object-Oriented Programming in Java ---------- */
  li9: [
    "A class is a cookie cutter and objects are the cookies: one design, many copies, each with its own sprinkles. The constructor is the step that shapes each new cookie and sets its starting values.",
    "A simple variable holds its value directly, like cash in your pocket. An object variable holds an address card saying where the object lives. Copy the card and two people know the same address, so they share the same object.",
    "A static field is one shared item for the whole class, like one classroom clock everybody reads. Regular fields belong to each object, like each student's own watch.",
    "This is like a bank teller window: you can't walk into the vault, but you can ask the teller to deposit or withdraw. Keeping the data private and offering methods keeps each object in charge of its own rules.",
    "Java always hands over a copy, but for objects the copy is of the address card, not the house. So a method can redecorate the house you both know about, but if it scribbles a new address on its own card, your card doesn't change.",
  ],
  li10: [
    "Some objects just work together (a student takes a course). Some hold others loosely (a team has players who can exist without it). Some own their parts outright (a house has rooms that disappear with the house).",
    "Plain numbers aren't objects, so Java gives each one a gift-box version for places that only accept objects. Java wraps and unwraps them for you, but comparing two gift boxes with == asks whether they're the same box, not the same number inside.",
    "Normal number types are like a calculator with a limited screen. These two are like doing math on paper: as many digits as you need, and decimals that are exact, which matters for money.",
    "Java text can't be edited in place; every 'change' prints a brand-new sign. == asks 'is it the same sign?' while equals asks 'does it say the same thing?' A StringBuilder is a whiteboard for when you need lots of edits.",
  ],
  li11: [
    "Inheritance lets one class start from another, like a sports car starting from the plain car design and adding a spoiler. 'super' is how the child says 'do the parent's setup first.'",
    "Overriding is a child replacing a parent's recipe with its own version of the same dish. Overloading is having several recipes with the same name but different ingredients.",
    "If you hold a remote labeled 'Shape' and press 'draw,' the actual object decides how to draw itself: a circle draws a circle and a square draws a square. The choice is made while the program runs, based on what's really there.",
    "Treating a dog as 'an animal' is always safe. Treating an animal as 'a dog' needs a check first, like asking 'is it actually a dog?' before asking it to fetch. equals is where you decide what 'the same' means for your own objects.",
    "An ArrayList is a list that grows and shrinks by itself, like a playlist you keep adding songs to. It comes with handy buttons to add, remove, find and count items.",
  ],
  li12: [
    "An exception is a fire alarm in your code: when something goes wrong, normal work stops and control jumps to the 'catch' plan you set up. The 'finally' part runs no matter what, like locking up on your way out.",
    "Some problems Java insists you plan for, like a file that might not exist; the compiler won't let you ignore those. Others are mistakes in your own logic, like dividing by zero, and Java doesn't force you to plan for them.",
    "You can make your own named alarms, like 'InvalidRadius,' so problems are easy to recognize. Chaining reports a problem with the original cause attached, like a note saying 'the order was late because the truck broke down.'",
    "Scanner reads a file the way you'd read a book aloud, one word or line at a time, and PrintWriter writes into a notebook. The try-with-resources form closes the book for you automatically when you're done.",
  ],
  li13: [
    "An abstract class is a template with some blanks marked 'every kind must fill this in,' like an 'area' box that each shape completes its own way. You can't build the template itself, only the specific shapes.",
    "An interface is a promise of abilities, like a 'can be compared' badge. If a class wears the Comparable badge, anyone can sort its objects, because they know how to ask 'which one comes first?'",
    "An abstract class is like the family you're born into: you only get one, and it can hand you real belongings. An interface is like a club membership: you can join many, and each mostly lists what you promise you can do.",
  ],
  li18: [
    "Recursion is solving a problem by handing a slightly smaller version of it to yourself, like a line of people where each asks the person ahead 'how many are in front of you?' The person at the front says 'zero,' and the answers flow back.",
    "Sometimes the neat recursive version needs extra bookmarks, like 'which two letters am I comparing right now?' A helper method carries those bookmarks along so the public method stays simple.",
    "Some puzzles, like moving a stack of disks, are naturally 'do the smaller version, make the big move, do the smaller version again.' But recursion can also redo the same work over and over, so sometimes a plain loop is far faster.",
  ],
  li19: [
    "A generic class is a labeled container: a 'Box of Apples' or a 'Box of Books.' You decide what goes in when you make it, and Java checks that nobody slips a book into the apple box.",
    "A box of apples is not a 'box of any fruit,' because then someone could sneak a banana in. Wildcards are how you say 'any kind of fruit box, just for reading.' Behind the scenes, Java removes the labels once it has checked them.",
  ],
  li20: [
    "Java's collections are different kinds of containers: lists keep order and allow repeats, sets ban duplicates, and queues hand things out in line order. An iterator is a bookmark that walks through any of them one item at a time.",
    "A class can have its own natural order, like alphabetical for names. A Comparator is a separate rule you can hand over, like 'sort by age instead,' without changing the class itself.",
    "A stack is a pile of plates: the last one placed is the first one taken. A queue is the line at a coffee shop: first in, first out. A deque lets you add or remove at either end.",
    "A priority queue is an emergency room: patients aren't seen in arrival order but by how urgent they are. Whatever is 'smallest' (most urgent) always comes out first.",
  ],
  li21: [
    "A set is a guest list with no duplicates. The versions trade speed for order: one is fastest but keeps no order, one remembers who arrived first, and one keeps everyone sorted.",
    "A map is a dictionary: look up a word (the key) to get its definition (the value). Each word appears once, and looking things up is very fast.",
  ],
  li24: [
    "An array list lives in a fixed row of boxes. When the row fills up, everything moves into a bigger row, usually double the size. Inserting in the middle means sliding everyone over one box, like making room on a crowded bench.",
    "A linked list is a conga line where each person holds only the shoulders of the next. Adding someone at the front is easy: they just grab the old first person. The tricky part is keeping track of who's first and who's last.",
  ],
  li25: [
    "Think of the number-guessing game: you guess 50, and the answer is 'lower' or 'higher.' A binary search tree stores numbers so every step works like that (go left for smaller, right for bigger), so you find things fast without checking everything.",
    "Visiting every spot in a family tree can happen in different orders: yourself before your children, after them, or in between your left and right child. Using 'left, then me, then right' on a search tree reads the numbers back in sorted order.",
    "Removing a number with nothing below it is easy: just snip it off. If it has one branch below, that branch moves up into its place. If it has two, find the next-bigger number (the smallest one on its right side), move that into the gap, and remove it from where it was.",
  ],
  li27: [
    "Hashing is like a coat check: your coat goes on a hook picked by a number, so getting it back is instant instead of searching every hook. A hash function turns any key, like a name, into that hook number.",
    "Sometimes two coats get the same hook number. You can hang the second one on the next free hook down the row, or let each hook hold a short chain of coats.",
    "The load factor is how full the coat rack is. Once it gets too crowded, finding coats slows down, so you buy a bigger rack and re-hang every coat by its new number.",
  ],
  /* ---------- Computer Architecture ---------- */
  ph1: [
    "How long a program takes is like how long a road trip takes: the number of stops times how long you spend at each. Here it's how many instructions run, how many clock ticks each one needs, and how long one tick lasts.",
    "If your grade is 60% exams and 40% homework, you weight each average by its share. The average cost per instruction works the same way: weight each type's cost by how often it shows up.",
    "Speed up only the highway part of your commute and the slow city streets still take as long as before. Amdahl's law says the overall speedup is held back by the part you didn't improve.",
  ],
  ph2a: [
    "The processor keeps a small set of super-fast scratch pads, like the few things you hold in your hands while cooking. Everything else sits in memory, the pantry, and has to be fetched in and put back.",
    "The same row of on/off switches can mean two different numbers, depending on whether you agreed to allow negatives, like a thermometer that either starts at zero or has a minus side. Negatives use the odometer trick: rolling back past zero.",
    "Every instruction is packed into a fixed 32-slot form, like a shipping label with boxes for 'what to do,' 'from where' and 'to where.' There are a couple of label layouts, depending on whether the instruction carries a number of its own.",
  ],
  ph2b: [
    "Sliding bits to the left is like adding a zero to the end of a decimal number: each slide doubles the value. A mask is a stencil that keeps or blanks out exactly the bits you choose.",
    "The processor has no 'if' or 'while.' It only has 'jump somewhere if these two are (or aren't) equal,' like a choose-your-own-adventure book: 'if yes, turn to page 12.' A loop is just jumping back to an earlier page.",
    "Branches give directions relative to where you are ('go 3 steps ahead'), while jumps give an almost complete address. Since every instruction is 4 bytes wide, distances are counted in whole instructions.",
    "Calling a function is like leaving a bookmark so you know where to come back to. The stack is a pile of sticky notes where each function saves what it needs, and it clears its notes away before returning.",
  ],
  ph3: [
    "Computer adding is grade-school adding with carries, but with a fixed number of digits; if the answer doesn't fit, it rolls over like an odometer. Multiplying and dividing are done the long-hand way, one shift and add (or subtract) at a time.",
    "This is scientific notation in binary: a plus-or-minus sign, a 'times two to this power' part, and the significant digits. The power is stored with an offset added so it never needs its own minus sign.",
  ],
  ph4: [
    "Every instruction travels down the same assembly line: fetch it, read what it needs, do the math, touch memory if needed, and save the result. The control signals are switches telling each station what to do for this particular instruction.",
    "Pipelining is running the washer and the dryer at the same time: while load 1 dries, load 2 washes. Each load still takes just as long, but finished loads come out far more often.",
    "Sometimes a step needs a result the step before it hasn't finished, like needing a dish that's still in the oven. Forwarding passes it over the counter the moment it's ready; if that's still too late, the line waits a beat.",
    "At a fork in the road, the assembly line doesn't know which way to go until a decision is made, but it has already started on the next instructions. Branch prediction is guessing the likely turn and backing up if the guess was wrong.",
  ],
  ph5: [
    "A cache is a small desk drawer for things you use often, so you don't walk to the filing cabinet (main memory) every time. In the simplest design, each item has exactly one drawer slot it may go in, picked from part of its address.",
    "For each request, check the one drawer slot it belongs in. If the right item is there, it's a hit; if not, it's a miss, so you fetch it and it kicks out whatever was in that slot.",
    "Average memory time is like your average commute: most days are quick, but some days there's a traffic jam. Multiply how often the jam happens by how long it costs, then add the normal trip time.",
    "Every program gets its own pretend set of addresses that the system translates to real locations, like a hotel giving guests room numbers that map to actual floors. The TLB is a small cheat sheet of recent translations so you don't look each one up every time.",
  ],
  /* ---------- Probability & Statistics ---------- */
  ba2: [
    "Probability is a number from 0 (never) to 1 (always) for how likely something is. The rules are common sense: something always happens, chances can't be negative, and for things that can't happen together, you add their chances.",
    "When every outcome is equally likely, probability is just 'ways to win' divided by 'ways in total.' The hard part is the counting, so this reuses the counting tools: does order matter, and can things repeat?",
    "Conditional probability means 'given what I already know.' The chance a card is a king changes once you're told it's a face card. Two events are independent if knowing one tells you nothing about the other, like two separate coin flips.",
    "If a test for a rare disease comes back positive, how worried should you be? Bayes' rule flips the question around and factors in how rare the disease is to begin with, which often makes the answer surprisingly low.",
  ],
  ba3: [
    "A random variable is a number that comes from chance, like the total of two dice. The expected value is the long-run average if you repeated it forever, and the variance measures how spread out the results are around that average.",
    "Binomial counts how many times you succeed in a fixed number of tries, like heads in 10 coin flips. Geometric counts how many tries it takes to get your first success, like rolling until you see a six.",
    "Poisson is for counting rare events in a stretch of time or space, like texts you get in an hour or typos on a page. When there are lots of chances and each is unlikely, it's a handy shortcut.",
  ],
  ba4: [
    "For things measured on a smooth scale, like height, the chance of exactly 170.000 cm is zero, so we talk about ranges instead. The curve shows where values pile up, and the area under it between two points is the chance of landing there.",
    "Uniform means every value in a range is equally likely, like a spinner. Exponential describes waiting times, like the wait for a bus that arrives at random, and it has no memory: having waited 10 minutes doesn't make the bus 'due.'",
    "The normal distribution is the classic bell curve: most results cluster near the average and get rarer the farther out you go. A z-score just measures how many standard steps you are from the middle, so one table works for every bell curve.",
    "Add up lots of random things, like dice rolls or wait times, and the total starts to look like a bell curve, no matter what the pieces looked like. That's why averages of big samples are so predictable.",
  ],
  ba6: [
    "A Markov chain is a board game where your next move depends only on the square you're on now, not on how you got there. A table lists the chance of moving from each square to every other square.",
    "Play that board game long enough and you settle into a steady pattern of how often you visit each square. The steady state is that long-run share of time, and it doesn't depend on where you started.",
    "This is the math of a single checkout line where customers show up at random and each takes a random time to serve. As the cashier gets busier, the line doesn't grow gently; it explodes as arrivals get close to the serving speed.",
  ],
  ba8: [
    "Descriptive statistics sum up a pile of numbers: the average, the middle value, and how spread out they are. They're the quick summary of a data set.",
    "A confidence interval is a range you're fairly sure contains the true value, like 'the bus comes between 8:05 and 8:15.' More data shrinks the range; wanting to be more certain widens it.",
    "A hypothesis test works like a courtroom: assume nothing special is going on (innocent) unless the evidence is too surprising to explain away. The p-value measures how surprising your data would be if nothing special were happening.",
  ],
  /* ---------- Data Structures & Algorithms ---------- */
  we2: [
    "This is a way to say how work grows as the job gets bigger, while ignoring small fixed details. It's like saying a road trip grows with distance, without caring whether you stop for coffee.",
    "Anything that cuts the problem in half at each step, like the number-guessing game, takes very few steps even for huge inputs. Doubling the input adds just one more step.",
    "Given a list of daily profits and losses, what's the best run of back-to-back days? This classic problem is solved four ways, from 'try every possible run' (painfully slow) to a single clever pass through the list.",
  ],
  we4: [
    "A tree here is a family tree drawn upside down: one ancestor at the top, children below, and so on. Depth is how many generations down you are; height is how many generations hang below you.",
    "A search tree is the number-guessing game turned into a shape: go left for smaller, right for bigger. Each lookup walks one path from the top down, so a bushy, well-shaped tree is fast and a lopsided one is slow.",
    "An AVL tree is a search tree that keeps itself balanced, like a hanging mobile that gets re-hung whenever one side droops too low. The fix is a 'rotation,' a small rearrangement of a few spots that evens things out.",
    "A splay tree moves whatever you just used to the top, like keeping your favorite mug at the front of the cupboard. A B-tree is a short, wide tree that packs many items into each spot, built for disks where every trip is slow.",
  ],
  we5: [
    "Hashing is a coat check: a formula turns each key into a hook number so you can find it instantly. When two keys land on the same hook, chaining simply hangs them together in a short list on that hook.",
    "Instead of sharing a hook, a newcomer that collides goes looking for another empty hook using a fixed pattern: the next one over, jumps that grow, or a second formula. Each pattern causes its own kind of traffic jam.",
    "When the coat rack gets too full, everything slows down. Rehashing buys a rack about twice as big and re-hangs every coat by its new number: expensive once, but rare.",
  ],
  we6: [
    "A heap is like a company org chart where every boss is smaller than the people directly under them, so the very smallest is always at the top. Adding or removing just nudges one item up or down a few levels.",
    "Instead of adding items one at a time, you can dump them all in and then fix things from the bottom up. Most items sit near the bottom and barely move, so the total work is surprisingly small.",
    "A d-heap lets each boss have more than two people under them, like teams of four. That makes the chart shorter, which speeds some operations up and slows others down.",
  ],
  we7: [
    "Insertion sort is how most people sort a hand of cards: pick up the next card and slide it left into its proper place. It's fast when the hand is nearly sorted and slow when it's backward.",
    "Shellsort first sorts cards that are far apart, then closer ones, then neighbors. The early long-distance moves get cards roughly into place, so the final tidy-up is quick.",
    "Split the pile in half, sort each half, then merge them like zipping two sorted stacks together by always taking the smaller top card. Splitting again and again keeps the total work efficient.",
    "Pick one card as the dividing line, put everything smaller on its left and bigger on its right, then do the same to each side. A good dividing card splits the pile evenly; a bad one barely splits it at all.",
    "Any sort that only compares two items at a time needs a minimum number of comparisons, like a minimum number of yes/no questions in a guessing game. Bucket and radix sort get around that by dropping items into labeled bins, like a mailroom sorting letters by ZIP code one digit at a time.",
  ],
  we8: [
    "Union-find keeps track of who is in the same friend group. Each group has a leader, and to merge two groups you just make one leader report to the other, ideally with the smaller group joining the bigger one.",
    "When you ask 'who is my group's leader?' and have to climb a long chain of people, path compression tells everyone along the way to report straight to the leader next time. After that, the question is answered almost instantly.",
  ],
  we9: [
    "A graph is a map of places and roads. You can store it as a big mileage chart with a box for every pair of cities, or as a list, for each city, of just its neighbors; the lists save space when roads are few.",
    "Topological sort puts tasks in an order that respects prerequisites, like getting dressed: socks before shoes, shirt before jacket. Keep picking something that nothing else is still waiting on.",
    "Finding the route with the fewest stops is like ripples spreading out on a pond, one ring at a time. When roads have different lengths, Dijkstra's method always finishes the closest unfinished place next, like a GPS growing outward from home.",
    "This is the cheapest way to connect every town with roads so everyone can reach everyone, with no wasteful loops. Prim grows one network outward from a starting town; Kruskal keeps adding the cheapest remaining road that doesn't create a loop.",
    "Depth-first search explores a maze by always taking the next unexplored hallway as far as it goes, then backing up to the last fork. It's the go-to tool for finding loops, dead ends and connected areas.",
  ],
  /* ---------- Software Engineering ---------- */
  so2: [
    "Waterfall is like building a house: design everything, then build, then inspect, in strict order. Step-by-step models are more like writing a song: rough draft, feedback, revise, repeat.",
    "Agile teams work in short bursts, like a kitchen tasting each dish as it goes instead of serving a 10-course meal no one has tasted. Scrum adds a few routines: a quick daily check-in, a to-do list ranked by value, and a review at the end of each burst.",
  ],
  so4: [
    "Functional requirements say what the product does ('the app emails a receipt'). Non-functional ones say how well it does it ('within 2 seconds,' 'works offline,' 'keeps data private'), like a car's features versus its fuel economy and safety rating.",
    "This is figuring out what customers actually need: interviewing them, watching them work, and walking through stories of how they'd use it. Then you write it down clearly and double-check it with them before anyone builds anything.",
  ],
  so5: [
    "UML diagrams are blueprints for software: some show who uses the system and why, some show the pieces and how they connect, and some show the order things happen in over time.",
    "Architecture patterns are proven floor plans. One keeps what you see separate from the data behind it; one stacks layers that only talk to the layer below; one has many customers ordering from a central counter.",
  ],
  so7: [
    "A design pattern is a named, reusable answer to a common problem, like 'open-concept kitchen' in home design. Knowing the names lets programmers say 'use an observer here' instead of explaining the whole idea.",
    "Don't build what you can borrow: reuse can be an idea, a ready-made library, or a whole system. Configuration management is the team's change diary, tracking every edit so you can always rebuild or roll back.",
  ],
  so8: [
    "Verification asks 'did we build it the way the plan says?' Validation asks 'is the plan what the customer actually wanted?' Testing then happens at different zoom levels: single pieces, pieces working together, and the whole system.",
    "You can't test every possible input, so you group inputs that should behave the same (all valid ages, all negative ages) and test one from each group. Bugs love edges, so you also test right at the borders, like 17, 18 and 19 for an 18-and-over rule.",
    "Structural testing looks inside the code and makes sure every route through it gets used, like walking every hallway in a building. This count of separate routes tells you the minimum number of tests needed to try them all.",
    "Test-driven development writes the quiz before studying: first a small test that fails, then just enough code to pass it, then tidy up. Repeat in tiny steps so you always know what works.",
  ],
  so9: [
    "Software needs work after launch, like a car: fixing breakdowns, adapting to new roads (new phones or operating systems), and adding upgrades people ask for. Most of a program's lifetime cost is this, not the first build.",
    "When some tasks must wait for others, the critical path is the longest chain of must-wait tasks. It sets the earliest possible finish date, and any delay on it delays the whole project.",
    "COCOMO is a rule-of-thumb formula that guesses how many months of work a project needs from how much code it will have. Bigger projects cost more than proportionally, the way a 200-person party is more than twice the work of a 100-person one.",
  ],
  /* ---------- Systems Programming in UNIX ---------- */
  un1: [
    "Every file has three sets of keys: one for its owner, one for the owner's group, and one for everyone else. Each set says whether you can read it, change it or run it, and chmod is how you hand out or take back those keys.",
    "New files start out with a default set of keys, and the umask is a list of keys to take away automatically, like a house rule that says 'no new file is writable by strangers.'",
    "A hard link is a second name tag on the very same file: remove one tag and the file is still there under the other. A symbolic link is a sticky note saying 'the file is over there'; if the file moves or is deleted, the note points at nothing.",
  ],
  un2: [
    "The shell rewrites your command before running it, filling in blanks like a mail merge. Double quotes allow the fill-ins but keep spaces together; single quotes mean 'take this literally and change nothing.'",
    "Every command reports a code when it finishes: 0 means success and anything else means trouble. Shell 'if' statements and loops read those codes, like a checklist that only moves on when each step says 'done.'",
    "A regular expression is a search pattern with wildcards, like a Find box that understands 'any digit' or 'starts with.' grep scans files and shows every line that matches.",
    "sed is find-and-replace that runs over a whole file at once. awk treats each line like a spreadsheet row with columns, so you can pick, add up or print specific columns.",
  ],
  un3: [
    "Turning C code into a program is an assembly line: expand the shortcuts and included files, translate into the machine's own low-level language, package that into pieces, and finally join the pieces into one program you can run.",
    "A Makefile is a recipe book that knows which dishes use which ingredients. Change one ingredient and it only re-cooks the dishes that use it, instead of the whole meal.",
  ],
  un4: [
    "When a program opens a file, the system hands it a small claim-ticket number to use from then on. Every read or write moves a bookmark forward, and lseek lets you move the bookmark anywhere you like.",
    "Several claim tickets can lead to the same open file and share one bookmark. dup makes a copy of a ticket; dup2 swaps which file a ticket number leads to, which is how output gets redirected into a file.",
  ],
  un5: [
    "fork makes an identical twin of the running program; both carry on from the same spot, and the return value tells each one which twin it is. When the child finishes it leaves a note for its parent, and if the parent never reads it, the child lingers as a 'zombie.'",
    "Signals are taps on a program's shoulder: 'please stop,' 'you've been interrupted,' 'your timer went off.' A program can choose how to react to most taps, but a few, like 'stop right now,' can't be ignored.",
    "A pipe is a one-way tube between two programs: one writes into one end and the other reads out of the other, like the tube at a bank drive-through. It's how commands get chained together.",
  ],
  /* ---------- Programming Language Paradigms ---------- */
  se1: [
    "Judging a programming language is like judging a car: how easy it is to understand, how easy it is to build things with, how safe it is, and how much it costs to own and keep running.",
    "A compiler is a translator who translates a whole book before you start reading: slow to start, fast to read. An interpreter translates sentence by sentence as you go: quick to start, slower overall. Many languages mix the two.",
  ],
  se3: [
    "A grammar is a set of sentence-building rules, like 'a sentence is a subject followed by a verb.' A parse tree diagrams how one line of code was built from those rules, like diagramming a sentence in English class.",
    "A grammar can bake in the order of operations: whatever sits lower in the diagram happens first. How you write a rule also decides whether 'a − b − c' groups from the left or from the right.",
    "This kind of reader has one helper for each grammar rule, and each helper peeks at the next word to decide which version of its rule applies. That only works if a single peek is always enough to tell the options apart.",
  ],
  se5: [
    "Binding is the moment a name gets attached to its meaning: some are settled when the language is designed, some when you compile, and some only while the program runs. Lifetime is how long a variable's storage actually exists, like the length of a rental.",
    "When code mentions 'x,' which x does it mean? One rule looks at where the code was written (the nearest enclosing block); the other looks at whoever called it most recently, like asking whoever happens to be in the room right now.",
  ],
  se9: [
    "If a function quietly changes a variable while you're in the middle of a calculation that uses it, the answer depends on which part gets worked out first. It's like someone changing a price tag while you're still adding up your cart.",
    "Languages hand values to functions in different ways: a photocopy, the original itself, a copy that gets mailed back when the function is done, or a recipe that's re-run every time it's used.",
    "Aliasing is when two names point at the same thing, like a person with a nickname. If a function treats 'Bob' and 'Robert' as two separate people but they're the same person, the results can surprise you.",
  ],
  se15: [
    "In Scheme, a list is a train: car gives you the first car, cdr gives you the rest of the train, and cons hooks a new car onto the front. Everything else is built from those three moves.",
    "Functional programs repeat by handling the first item and then doing the same thing to the rest. Higher-order functions take other functions as inputs, like a 'do this to every item' machine you hand a recipe to.",
    "In Prolog you don't write steps; you write facts and rules ('Tom is Bob's parent'; 'a grandparent is a parent's parent') and then ask questions. Prolog searches through them like a detective to find every answer that fits.",
  ],
  /* ---------- Digital Logic & Computer Design ---------- */
  mc1: [
    "Our counting uses ten digits; other bases just use a different number of digits per place. Converting is like changing currencies: each place is worth a power of the base, and you add them up or divide them out.",
    "A complement is a trick for doing subtraction with only addition, like an odometer where going back one from 0000 lands on 9999. It's how hardware handles negative numbers without a separate minus sign.",
    "These are different ways of spelling numbers with on/off bits for special jobs: one spells each decimal digit separately, one changes only one bit between neighbors so dials don't glitch, and parity adds a check bit to catch errors, like the check digit on a credit card.",
  ],
  mc2: [
    "Boolean algebra is math with only two values, true and false (1 and 0). Its rules let you shrink a long logic expression into a shorter one that does exactly the same thing, like simplifying a fraction.",
    "A minterm describes exactly one row of a truth table where the output is 1, like the recipe for one winning combination. Any logic function can be written as a list of its winning rows, or as a list of its losing rows.",
    "Logic gates are tiny decision circuits: AND, OR, NOT. NAND and NOR are 'universal' because, like a single LEGO brick you can build anything from, either one alone can make all the others.",
  ],
  mc3: [
    "A Karnaugh map is a truth table rearranged so that neighboring squares differ by just one input. Then you can spot simplifications by eye, circling blocks of 1s like grouping matching tiles.",
    "Don't-cares are input combinations that will never happen, so you can count them as 1 or 0, whichever makes bigger groups. You can also group the 0s instead of the 1s to get the other standard form.",
    "Because NAND gates are cheap and can build anything, circuits are often rebuilt from NANDs only (or NORs only). XOR is the 'exactly one, or an odd number' gate, perfect for adding and error checks.",
  ],
  mc4: [
    "An adder circuit does grade-school addition, one column of bits at a time, passing the carry to the next column. The simple version waits for each carry in turn; the faster version predicts the carries early so nothing waits in line.",
    "A decoder turns a binary number into 'light up exactly one of these lamps,' like a hotel switchboard ringing one room. An encoder does the reverse, turning 'which button is pressed' into that button's number.",
    "A multiplexer is a TV's input switch: several signals come in, and a few select buttons choose which one goes out to the screen.",
  ],
  mc5: [
    "A flip-flop is a one-bit memory, like a light switch that remembers its position. It only updates on a clock tick, like a camera that only takes the picture when the shutter clicks.",
    "To understand a circuit with memory, make a table: 'if it's in this state and gets this input, what state comes next and what does it output?' Then draw that table as a map of states and arrows.",
    "Designing a circuit with memory works backward from the behavior you want: draw the state map, merge states that act the same, then work out what each flip-flop needs as input to make the right move.",
  ],
  mc6: [
    "A register is a row of one-bit memories that store a bigger value together. A shift register passes its bits down the row on every clock tick, like people in a row passing notes.",
    "A counter is a register that counts up with each clock tick. The ripple kind is like a row of dominoes, each bit tipping the next, which is simple but slow; the synchronous kind has every bit change on the same tick.",
    "Memory is a big set of numbered storage boxes: the number of address wires decides how many boxes there are, and the data wires decide how big each box is. Programmable logic is a chip of blank gates you wire up to make your own circuit.",
  ],
  /* ---------- Database Systems ---------- */
  el3: [
    "Designing a database starts with listing the 'things' (students, courses) and the facts about each (name, ID, phone numbers). A key is the fact that picks out exactly one of them, like a student ID number.",
    "Relationships describe how things connect: one-to-one (a person and a passport), one-to-many (a mother and her children), many-to-many (students and classes). Participation says whether every one must take part, like whether every employee must belong to a department.",
    "Once the diagram is drawn, each thing becomes a table, and each connection becomes either a column pointing to another table or its own small 'link' table for many-to-many connections.",
  ],
  el5: [
    "A key is any set of columns that tells every row apart, like an ID number. Integrity rules keep the data sane: every row needs a real ID, and a reference to another table has to point to something that actually exists.",
    "Relational algebra is a small set of moves on tables: pick the rows that match a condition, keep only certain columns, combine two tables, and so on. Every database question can be built from these moves, like a recipe built from basic cooking steps.",
  ],
  el6: [
    "A SQL query is a precise question to a table: 'show me the names and salaries of people in department 5.' NULL means 'unknown,' and comparing anything with an unknown gives 'unknown,' not true or false.",
    "Aggregates summarize groups, like the average salary per department. GROUP BY sorts rows into piles, and HAVING then throws out whole piles, like 'only departments with more than 3 people.'",
    "A join matches up rows from two tables, like matching students to their grades by ID. An outer join keeps the unmatched rows too and fills the blanks with unknowns. A nested query is a question inside a question.",
  ],
  el14: [
    "A functional dependency says 'if you know this, you know that,' like knowing a ZIP code tells you the city. The closure is everything you can figure out from a few starting facts by following those rules over and over.",
    "A candidate key is the smallest set of facts that lets you figure out everything else in a row. If you could drop any piece and still figure everything out, it wasn't the smallest.",
    "Normalization is tidying a messy table so each fact is stored in one place, like not rewriting a customer's address on every single order. Each normal form is a stricter tidiness rule that prevents update mistakes.",
  ],
  el17: [
    "Disks read data in fixed-size chunks, like moving boxes. The blocking factor is how many records fit in one box, which tells you how many boxes you'll need and how many trips a search will take.",
    "An index works like the index at the back of a textbook: instead of flipping through every page, you look up the word and jump to the right page. A multilevel index is an index of the index, for really big books.",
    "A B+ tree is a short, wide index where every real entry lives on the bottom level, and the bottom pages are linked in a chain. That makes both single lookups and 'show me everything from A to F' fast.",
  ],
  el20: [
    "A transaction is a group of steps that must all happen or none at all, like moving money: take it from one account and add it to the other, never just one half. ACID is the list of promises that keeps that safe even with many users at once.",
    "When many transactions overlap, we ask: is the result the same as if they had taken turns one at a time? Draw an arrow for every 'this one had to go first'; if the arrows never form a loop, a fair turn order exists.",
    "Two-phase locking means a transaction collects every lock it needs before it gives any back, like gathering all your ingredients before returning any to the shelf. Recovery uses a log, a diary of every change, to redo or undo work after a crash.",
  ],
  /* ---------- Operating Systems ---------- */
  si3: [
    "A running program goes through life stages: waiting in line for the processor, running, waiting on something like a file, and finally finished. The system keeps a folder on each one with everything it needs to pause it and resume it later.",
    "fork makes a twin copy of the running program, exec swaps the twin's instructions for a different program, and wait lets the parent pause until the child is done. Together they're how one program launches another.",
    "Running programs are kept apart, like neighbors in separate houses. To share information, they either set up a shared shed both can use or pass notes through the mail.",
    "Threads are several cooks in the same kitchen: they share the fridge and the stove, but each has their own notepad saying which step they're on. With several processor cores, several cooks can truly work at the same moment.",
  ],
  si5: [
    "Scheduling is deciding who gets the one checkout lane next. A schedule is judged by how long people wait in line, how long from arriving to leaving, and how soon they're first served.",
    "Shortest job first lets the customer with the fewest items go next, which keeps the average wait as low as possible. The interrupting version even lets a newcomer with fewer items cut in front of someone already checking out.",
    "Round robin gives everyone a short turn, like passing a microphone around a circle. Priority scheduling lets VIPs go first, but low-priority people could wait forever unless their priority slowly rises while they wait.",
  ],
  si6: [
    "If two people update the same spreadsheet cell at the same moment, one change can wipe out the other. The fix is a part of the code where only one worker at a time may enter, like a single-person bathroom.",
    "Peterson's solution is two polite people at a door: each says 'I'd like to go, but you first,' and whoever was polite last waits. Hardware helps with special instructions that check a lock and grab it in one unbreakable step.",
    "A mutex is the bathroom key: take it to go in, give it back when you're done. A semaphore is a counter of available keys, like a parking garage sign showing free spots; when it hits zero, you wait.",
    "These are famous sharing puzzles: bakers and customers sharing a shelf with limited space, many readers but only one writer for a document, and five philosophers sharing five chopsticks without anyone starving.",
  ],
  si8: [
    "Deadlock is four cars at a four-way stop, each waiting for the car on its right to go first: nobody moves, ever. It only happens when four conditions all line up, so breaking any one of them prevents it.",
    "The banker's algorithm is a careful bank that only grants a loan if it can still make sure every customer can eventually finish and pay it back. If saying yes could leave everyone stuck, the request waits.",
    "Instead of preventing deadlocks, you can let them happen and check every so often, like a traffic officer watching for gridlock. When you find one, you break it by stopping a program or taking something back.",
  ],
  si9: [
    "Giving each program one solid block of memory is like seating every group at tables that are side by side. Over time you get scattered empty tables too small for anyone, and that wasted space is fragmentation.",
    "Paging cuts memory into equal-size pages, like the pages of a binder, so a program's pages can sit anywhere. A lookup table translates 'page 3 of my program' into 'page 17 of real memory.'",
    "Looking up every translation in the big table doubles each trip to memory. The TLB is a tiny cheat sheet of recent translations, and when it has the answer you skip the extra trip.",
    "For big programs the translation table itself gets enormous, like a phone book for a giant city. Splitting it into levels works like chapters: you only keep the chapters you actually use.",
  ],
  si10: [
    "Demand paging only brings a page into memory when it's actually needed, like a streaming service loading the next scene instead of the whole movie. A missing page means a long pause to fetch it, so even rare misses are costly.",
    "When memory is full and you need room, which page gets kicked out? The oldest one, the one you won't need for the longest time (perfect, but it needs a crystal ball), or the one you haven't used for the longest time.",
    "Thrashing is a student with a tiny desk who spends all their time swapping books to and from the shelf and none actually studying. It happens when programs get too little memory for what they're actively using.",
  ],
  si11: [
    "A disk's read arm is like an elevator answering floor requests. Instead of going in request order, smarter plans sweep up and down, or always go to the nearest floor next, to cut down on travel.",
    "RAID teams up several disks: splitting data across them for speed, keeping mirror copies for safety, or storing a clever check value that can rebuild any one disk that dies.",
    "A file can be stored in one solid stretch, as a chain of pieces each pointing to the next, or with an index card listing every piece. Unix's inode is that index card, with direct entries for small files and extra layers of cards for big ones.",
  ],
  /* ---------- Advanced Algorithms ---------- */
  cl4: [
    "This compares how fast two functions grow once the input gets big, ignoring constant factors and small inputs. It's like comparing a bike and a car on a cross-country trip: who's ahead after the first block doesn't matter.",
    "Many divide-and-conquer methods split a job into smaller copies plus some extra work to combine the pieces. The master theorem is a quick lookup that tells you whether the splitting or the combining dominates the total.",
    "A recursion tree draws all the little jobs a divide-and-conquer method creates, level by level, so you can add up the work like adding the rows of a pyramid. Substitution is guessing the answer and then proving the guess holds.",
  ],
  cl7: [
    "Quicksort picks one value as a dividing line, sweeps through moving smaller values to the left side, then drops the dividing value right in between. Then it repeats on each side.",
    "Heapsort keeps a 'biggest on top' pile and repeatedly takes the top and sets it aside at the end. Counting sort skips comparisons entirely: it tallies how many of each value there are, like counting votes, and writes them out in order.",
    "To find, say, the 5th smallest item, you don't need to sort everything. Split around a dividing value and keep digging only on the side that must hold your answer, like the guessing game played on unsorted data.",
  ],
  cl15: [
    "Dynamic programming solves a big problem by writing down answers to smaller ones so you never solve the same piece twice. For rod cutting, the best price for a long rod is built from the best prices for shorter rods you already worked out.",
    "Multiplying a chain of tables gives the same answer however you group it, but some groupings take far less work, like choosing which errands to combine. DP tries every split point, reusing saved answers for the shorter chains.",
    "The longest common subsequence is the longest run of letters two words share in the same order, like comparing two drafts of an essay. Edit distance counts the fewest typo fixes to turn one word into another. Both fill in a grid one square at a time.",
    "You're packing a bag with a weight limit, every item has a value, and each item is either in or out. DP builds a table of 'best value using the first few items with this much room left,' one row at a time.",
  ],
  cl16: [
    "To fit the most meetings into one room, always pick the meeting that ends earliest, then repeat with what's left. Here, grabbing the best-looking choice right now happens to give the best answer overall.",
    "Huffman coding gives common letters short codes and rare letters long ones, like texting 'u' for 'you.' You keep merging the two rarest symbols together until everything forms one tree.",
    "Amortized analysis spreads a rare expensive step over many cheap ones, like a gym membership that costs a lot once but little per visit. A list that occasionally doubles in size is still cheap per added item on average.",
  ],
  cl22: [
    "Depth-first search explores a maze by going as deep as possible and noting the time you enter and leave each room. Those timestamps sort every hallway into types and help find groups of rooms where each room can reach all the others.",
    "Bellman–Ford finds the shortest routes by re-checking every road for a shortcut, again and again, which still works when some roads pay you instead of costing you, and it can spot endless money-making loops. Floyd–Warshall builds a full distance chart between every pair of places at once.",
    "Max flow asks how much water can get from a source to a drain through pipes of different widths. Keep finding any route with spare room and push more through; the bottleneck you finally hit is the narrowest 'cut' separating the two ends.",
  ],
  cl34: [
    "Some problems are easy to solve; others are only easy to check, like a sudoku, where checking a filled-in grid is quick but solving it can be hard. A reduction translates one puzzle into another, so a fast solver for the second would also solve the first.",
    "These are the famous hard puzzles (scheduling, picking groups, planning routes) that are secretly all the same difficulty. Solve any one of them quickly and you could solve them all quickly.",
  ],
  /* ---------- Automata Theory ---------- */
  sp1a: [
    "A finite automaton is a simple machine like a subway turnstile: it's always in one of a few states, and each input moves it to a next state. After reading the whole input, it either ends in an 'accept' state or it doesn't.",
    "To check something like 'the number of 1s is a multiple of 3,' the machine doesn't need to count forever; it only remembers the remainder so far, like a clock with just 3 positions.",
    "Combining patterns that a simple machine can recognize ('this or that,' 'this then that,' 'repeat this') always gives another pattern a simple machine can recognize. That's what 'closed' means here.",
  ],
  sp1b: [
    "This kind of machine can explore several choices at once, like a choose-your-own-adventure reader keeping a finger on every possible page. It says yes if any one of the paths ends happily.",
    "A regular expression is a compact search pattern, like a wildcard search for 'one or more a's, then a b.' It's built from just a few pieces: single letters, 'or,' 'followed by' and 'repeat any number of times.'",
    "Patterns, choose-many machines and simple machines all describe exactly the same set of patterns; they're three languages for the same idea. There are step-by-step recipes for translating any one into the others.",
  ],
  sp1c: [
    "A simple machine has only a few states, so a long enough input must pass through some state twice, which makes a loop that could be repeated. If repeating that loop breaks the pattern, no simple machine could have recognized the pattern in the first place.",
    "Using the pumping lemma is a game against an opponent: they pick a length, you pick a clever string, they choose where to cut it, and you show some repeat breaks the rule. You only win if you can beat every cut they could choose.",
  ],
  sp2: [
    "A context-free grammar is a set of rewrite rules, like a Mad Libs template where each blank is filled with a smaller template. It can describe nested patterns, like matching parentheses, that simple machines can't handle.",
    "This is a tidy standard format where every rule either splits into exactly two parts or becomes a single letter. It's like putting every recipe on the same card layout so tools can process them easily.",
    "This is a simple machine plus a stack of plates it can add to and take from. The stack lets it remember things like 'how many open parentheses are still waiting to be closed.'",
    "Some patterns are too demanding even for a machine with a stack, like needing three counts to match exactly. A pumping argument, like the earlier one but repeating two spots at once, proves it.",
  ],
  sp3: [
    "A Turing machine is a simple machine with an endless paper tape it can read, write on and move along. As basic as it is, it can compute anything any computer can, and that belief is the Church–Turing thesis.",
    "A problem is 'decidable' if some procedure always finishes with a correct yes or no. Some problems, like 'will this program ever stop?', have no such procedure, no matter how clever you are.",
    "There are only as many programs as there are counting numbers, but there are more possible problems than that. Diagonalization builds something that differs from every item on a list in at least one spot, so it can't be anywhere on the list.",
    "A reduction says: 'if I could solve problem B, I could use it to solve problem A.' So if A is impossible, B must be too. Rice's theorem says almost any interesting question about what a program does is impossible to answer in general.",
  ],
  sp7: [
    "P is the set of problems a computer can solve reasonably fast. NP is the set where, if someone hands you an answer, you can check it reasonably fast, like checking a finished sudoku. Whether those two sets are the same is the biggest open question in computer science.",
    "NP-complete problems are the hardest puzzles in NP: every other NP puzzle can be translated into them. Cook and Levin found the first one, a logic puzzle about making a formula come out true, and others are shown hard by translating from it.",
  ],
};
