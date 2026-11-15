/* Bytewise — jargon tooltips + mobile dock behavior.
   GLOSS: [pattern, plain definition, course ids (optional, comma list)]. glossify(root, courseId) wraps the FIRST
   occurrence of each term in a lesson section in a tap/focus-to-define button (max CAP per section). Code blocks,
   equations, visualizers, practice boxes, headings, links and buttons are never touched. */
'use strict';
const GLOSS = [
  // ---- data structures
  ['binary search trees?|BSTs?', 'A tree that keeps smaller values on the left and bigger values on the right, so a search works like the higher/lower guessing game.'],
  ['binary trees?', 'A tree where every spot has at most two children: a left one and a right one.'],
  ['subtrees?', 'One spot in a tree plus everything hanging below it, like a single branch of a family tree.'],
  ['nodes?', 'One item in a linked structure (a tree, list or graph). It holds a value plus links to its neighbors.'],
  ['root', 'The top spot of a tree: the one with no parent. Every search starts here.', '2336,3345,4349,4347,3377', 'square\\s*$'],
  ['leaf|leaves', 'A spot in a tree with no children: a dead end at the bottom.'],
  ['height', 'In a tree: the number of steps on the longest path from a spot down to a leaf.', '3345,2336,4349,4347'],
  ['depth', 'In a tree: how many steps a spot is below the root.', '3345,2336,4349'],
  ['linked lists?', 'A chain of items where each one holds a value and the location of the next one, like a scavenger hunt of clues.'],
  ['arrays?', 'A row of same-type slots, numbered from 0, stored side by side in memory.'],
  ['index(?:es)?|indices', 'A position number (slot 0, 1, 2 …). In databases, a lookup structure that finds rows fast, like the index of a book.'],
  ['pointers?', 'A variable that stores a memory address: where some other value lives.'],
  ['references?', 'Another way to reach an existing variable or object. Using it touches the original, not a copy.'],
  ['null|nullptr', 'A special "nothing here" value: a pointer or reference to no object. In SQL it means a missing or unknown value.'],
  ['heaps?', 'Two meanings: (1) a tree that always keeps the smallest (or largest) item on top; (2) the pool of memory a program borrows from while it runs, with new.'],
  ['stack frames?|activation records?', 'The space one function call gets on the call stack: its parameters, local variables and the address to return to.'],
  ['stacks?', 'A last-in, first-out pile, like plates: you add and remove only at the top. The call stack is the pile of notes for the functions currently running.'],
  ['priority queues?', 'A line where the most important (smallest) item always leaves first, whatever order things arrived in.'],
  ['queues?', 'A first-in, first-out line: items join at the back and leave from the front.'],
  ['hash tables?', 'An array where a formula (the hash function) picks each item\'s slot, so lookups are nearly instant.'],
  ['hash functions?|hash codes?|hashing|hash', 'A formula that turns a key (like a name) into a slot number, like a coat-check ticket.'],
  ['collisions?', 'When two different keys get the same slot number from the hash function.'],
  ['load factor', 'How full a hash table is: number of items ÷ number of slots.'],
  ['rehash(?:ing|es|ed)?', 'Building a bigger table and re-inserting every item once the old table gets too full.'],
  ['recursion|recursive(?:ly)?', 'When a function solves a problem by calling itself on a smaller version of the same problem.'],
  ['base cases?', 'The smallest version of the problem, answered directly without another recursive call. It is what makes the recursion stop.'],
  ['iterators?', 'A bookmark object that walks through a collection one item at a time.'],
  ['traversals?|travers(?:e|es|ing)', 'Visiting every item in a structure once, in a planned order.'],
  ['inorder|in-order', 'Tree visiting order: left side, then the spot itself, then the right side. On a binary search tree this gives sorted order.'],
  ['preorder|pre-order', 'Tree visiting order: the spot itself first, then its left side, then its right side.'],
  ['postorder|post-order', 'Tree visiting order: left side, right side, and the spot itself last.'],
  ['rotations?', 'A small rearrangement of a parent and child in a tree that fixes its balance while keeping the smaller-left / bigger-right order.', '3345,4349'],
  ['complete binary tree', 'A binary tree filled level by level, left to right, with no gaps.'],
  // ---- growth / analysis
  ['O\\(1\\)', 'Constant time: the work stays the same no matter how big the input is.'],
  ['O\\(log ?[nN]\\)', 'Logarithmic time: the work grows by only one step each time the input doubles, like the guessing game.'],
  ['O\\([nN] ?log ?[nN]\\)', '"n log n" time: a little more than linear. Typical of fast sorts like mergesort.'],
  ['O\\([nN](?:²|\\^2)\\)', 'Quadratic time: double the input and the work grows about four times, like everyone shaking hands with everyone.'],
  ['O\\([nN]\\)', 'Linear time: double the input and the work roughly doubles.'],
  ['Big-O|big O', 'A way to describe how the work grows as the input grows, ignoring constant factors. It is an upper bound.'],
  ['Θ|Big-Theta', 'Big-Theta: a tight bound. The running time grows exactly like this, up to constant factors.'],
  ['Ω|Big-Omega', 'Big-Omega: a lower bound. The running time grows at least this fast.'],
  ['logarithms?|log₂', 'The "how many times can you halve it" number: log₂ 1024 = 10, because halving 1024 ten times reaches 1.'],
  ['amortized', 'Averaged over a long run of operations, so a rare expensive step is shared by many cheap ones.'],
  ['worst case', 'The input that makes an algorithm do the most work possible.'],
  ['invariants?', 'Something that stays true every time around a loop (or for a structure\'s whole life). Used to prove code correct.'],
  ['algorithms?', 'A precise step-by-step procedure for solving a problem, like a recipe.'],
  ['pivot', 'The value a sort like quicksort splits around: smaller values go to one side, bigger to the other.'],
  ['partition(?:s|ing|ed)?', 'Splitting a group into non-overlapping parts. In quicksort: rearranging items around the pivot.'],
  ['stable', 'A sort is stable if items with equal keys keep their original order.', '3345,4349'],
  ['inversions?', 'A pair of items that are in the wrong order relative to each other.'],
  ['greedy', 'An approach that always takes the choice that looks best right now, without going back to reconsider.'],
  ['dynamic programming', 'Solving a big problem by saving the answers to smaller overlapping pieces, so no piece is solved twice.'],
  ['memoiz(?:e|ation|ed)', 'Remembering the results of earlier calls so repeat questions are answered instantly.'],
  ['divide[- ]and[- ]conquer', 'Split the problem into smaller pieces, solve each one, then combine the answers.'],
  ['recurrences?', 'An equation that defines a value (like a running time) in terms of smaller versions of itself, e.g. T(n) = 2T(n/2) + n.'],
  // ---- graphs
  ['graphs?', 'A set of points (vertices) joined by lines (edges), like cities and roads.', '2305,2336,3345,4349,4384'],
  ['vert(?:ex|ices)', 'A point in a graph, like a city on a map.'],
  ['edges?', 'A connection between two points in a graph, like a road between two cities.', '2305,3345,4349,4384,3354'],
  ['DAGs?', 'Directed acyclic graph: one-way arrows and no loops, like a list of prerequisites.'],
  ['adjacency (?:lists?|matri(?:x|ces))', 'A way to store a graph: for each point, a list of its neighbors, or a grid marking which pairs are connected.'],
  ['BFS|breadth[- ]first(?: search)?', 'Breadth-first search: explore in rings. All neighbors first, then their neighbors, and so on.'],
  ['DFS|depth[- ]first(?: search)?', 'Depth-first search: follow one path as far as it goes, then back up and try the next branch.'],
  ['shortest paths?', 'The route between two points with the lowest total cost (or the fewest edges).'],
  ['spanning trees?|MSTs?', 'Edges that connect every point of a graph with no loops. The minimum one has the lowest total weight.'],
  ['relax(?:ation|ing|es|ed)?', 'Checking whether going through one more road gives a shorter route, and updating the distance if it does.', '3345,4349'],
  // ---- programming & OOP
  ['class(?:es)?', 'A blueprint that bundles data with the functions that work on it. Objects are built from it.', '1337,2336,3345,4337'],
  ['objects?', 'One thing built from a class blueprint, with its own copy of the data.', '1337,2336,3345,4337,3354'],
  ['methods?', 'A function that belongs to a class or object.', '2336,3345,3354'],
  ['constructors?', 'Setup code that runs automatically when a new object is created.'],
  ['destructors?', 'Cleanup code that runs automatically when an object is destroyed.'],
  ['inherit(?:ance|s|ed|ing)?', 'Building a new class from an existing one, so it automatically gets the parent\'s data and methods.'],
  ['subclass(?:es)?|derived class(?:es)?', 'A class built from another class (its parent), adding or changing behavior.'],
  ['superclass(?:es)?|base class(?:es)?', 'The parent class another class is built from.'],
  ['polymorphism|polymorphic', 'One call, many behaviors: the object\'s real type decides which version of a method runs.'],
  ['overrid(?:e|es|ing|den)', 'A child class replacing a parent\'s method with its own version that has the same name and parameters.'],
  ['overload(?:s|ed|ing)?', 'Several functions sharing one name but taking different parameter lists.'],
  ['interfaces?', 'A list of methods a class promises to provide, like a badge of abilities.', '2336,3354,4337'],
  ['abstract', 'Incomplete on purpose: it says what must exist but leaves the details to subclasses, so you can\'t create one directly.', '1337,2336,3354'],
  ['encapsulation', 'Hiding an object\'s data behind methods so outside code can\'t break its rules.'],
  ['static', 'Belongs to the class itself (one shared copy), not to each object. For a local variable: keeps its value between calls.', '1337,2336,1436'],
  ['generics?', 'Code written with a placeholder type (like <E>) that gets filled in when used, so one class safely works for many types.'],
  ['templates?', 'C++\'s generic code: a pattern with a placeholder type that the compiler fills in.', '1337'],
  ['exceptions?', 'An error signal that stops the normal flow and jumps to the nearest matching catch block.', '1337,2336'],
  ['scope', 'The part of the program where a name can be used.'],
  ['global(?: variables?)?', 'Declared outside every function, so it is visible everywhere in the file.', '1436,1337,2336,4337'],
  ['local variables?', 'A variable that exists only inside the function or block where it is declared.'],
  ['parameters?', 'A variable in a function\'s definition that receives a value when the function is called.', '1436,1337,2336,2340,4337'],
  ['arguments?', 'The actual value you hand to a function when you call it.', '1436,1337,2336,3377,4337'],
  ['pass(?:ed|ing)? by value', 'The function gets a copy, so changes inside don\'t affect the caller\'s variable.'],
  ['pass(?:ed|ing)? by reference', 'The function gets the caller\'s actual variable, so changes inside do affect it.'],
  ['variables?', 'A named storage spot holding a value that can change.', '1436,1337,2336'],
  ['compil(?:er|ers|es|ed|ing|ation)', 'Translating source code into machine code before the program runs. The compiler is the tool that does it.'],
  ['linker', 'The tool that joins compiled pieces and libraries into one runnable program.'],
  ['preprocessor', 'The step before compiling that handles #include and #define lines by pasting text in.'],
  ['syntax', 'The grammar rules of a programming language: what is allowed to be written where.'],
  ['short[- ]circuit(?:ing|s)?(?: evaluation)?', 'Stopping a true/false test early once the answer is already known.'],
  ['literals?', 'A value written directly in the code, like 5 or \'A\'.'],
  ['cast(?:s|ing)?', 'Converting a value to another type on purpose, like a double to an int.', '1436,1337,2336'],
  ['promot(?:ed|ion)', 'Automatically converting a smaller type to a bigger one (int → double) in a mixed expression.'],
  ['dereferenc(?:e|es|ing|ed)', 'Following a pointer to the value it points at (*p).'],
  ['memory leaks?', 'Memory borrowed with new that is never given back with delete.'],
  ['shallow cop(?:y|ies)', 'A copy that duplicates the pointers but not the things they point to, so both copies share the same data.'],
  ['deep cop(?:y|ies)', 'A copy that also duplicates the data the pointers point to, so the two copies are fully independent.'],
  ['side effects?', 'Any change a function makes besides returning a value, like modifying a variable or printing.'],
  ['aliasing|aliases', 'Two different names referring to the same memory.'],
  ['precedence', 'Which operators are done first when there are no parentheses.'],
  ['associativity', 'Which way operators of equal precedence group: from the left, (a − b) − c, or from the right.'],
  // ---- bits & machines
  ['bits?', 'A single binary digit: 0 or 1.'],
  ['bytes?', 'A group of 8 bits. Memory is counted in bytes.'],
  ['binary', 'Base 2: numbers written with only 0s and 1s.'],
  ['hexadecimal|hex', 'Base 16: digits 0–9, then A–F. Each hex digit stands for exactly 4 bits.'],
  ['two[\'’]s complement', 'The standard way computers store negative integers: flip every bit, then add 1.'],
  ['overflows?', 'When a result is too big for its type, so it wraps around to a wrong value.'],
  ['integer division', 'Dividing whole numbers and throwing away the fraction: 7 / 2 is 3.'],
  ['modul(?:us|o)', 'The remainder after dividing: 7 % 3 is 1.'],
  ['ASCII', 'The standard numbering of characters: \'A\' is 65, \'a\' is 97, \'0\' is 48.'],
  ['strings?', 'A piece of text: a sequence of characters. In theory courses, any finite sequence of symbols.'],
  ['registers?', 'A tiny, super-fast storage slot inside the processor.', '2340,4341,4348'],
  ['caches?', 'A small, fast memory that keeps copies of recently used data so most lookups skip slow main memory.'],
  ['pipelin(?:e|es|ing|ed)', 'Overlapping instructions like an assembly line, so a new one starts before the last one finishes.', '2340'],
  ['CPI', 'Cycles per instruction: the average number of clock ticks one instruction takes.'],
  ['hazards?', 'A situation where the next instruction in a pipeline can\'t safely run on time.'],
  ['forwarding', 'Passing a result straight from one pipeline stage to another before it is officially saved.'],
  ['opcode', 'The part of a machine instruction that says which operation to do.'],
  ['sign[- ]extend(?:ed|ing|s)?|sign extension', 'Widening a number by copying its sign bit into the new bits, so its value stays the same.'],
  ['virtual memory', 'Giving every program its own pretend address space, translated to real memory (and disk) behind the scenes.'],
  ['TLB', 'Translation lookaside buffer: a small, fast cache of recent page-table translations.'],
  ['page tables?', 'The lookup table that maps a program\'s page numbers to real memory frame numbers.'],
  ['page faults?', 'When a program touches a page that isn\'t in memory yet, so the system has to load it from disk.'],
  ['pages?', 'A fixed-size chunk of a program\'s memory (often 4 KB): the unit virtual memory moves around.', '2340,4348'],
  ['frames?', 'A fixed-size slot of real memory that holds one page.', '4348'],
  // ---- operating systems & unix
  ['process(?:es)?', 'A running program, with its own memory and state.', '3377,4348'],
  ['threads?', 'One path of execution inside a process. Threads in the same process share its memory.', '3377,4348'],
  ['kernel', 'The core of the operating system: it controls the hardware and runs with full privileges.'],
  ['system calls?', 'A request from a program to the operating system, like open, read or fork.'],
  ['context switch(?:es|ing)?', 'Saving one process\'s state and loading another\'s so the CPU can switch between them.'],
  ['deadlock(?:s|ed)?', 'A standstill where each process waits for something another one holds, so none can move.'],
  ['semaphores?', 'A counter that controls access to shared things: wait() takes one (or waits), signal() gives one back.'],
  ['mutex(?:es)?|mutual exclusion', 'Only one at a time: a lock that lets just one thread into a section of code.'],
  ['critical sections?', 'Code that touches shared data and must be run by only one thread at a time.'],
  ['race conditions?', 'A bug where the result depends on the unlucky timing of two threads touching the same data.'],
  ['atomic(?:ally)?', 'Happens as one step that can\'t be interrupted halfway.'],
  ['preempt(?:ive|ion|ed|s)?', 'Interrupting a running process to hand the CPU to another one.'],
  ['starvation', 'When a process waits forever because others keep getting chosen first.'],
  ['file descriptors?', 'A small number a program uses to refer to an open file (0 = input, 1 = output, 2 = errors).'],
  ['zombies?', 'A finished child process whose exit status its parent hasn\'t collected yet.'],
  ['signals?', 'A software interrupt sent to a process, like the one Ctrl-C sends.', '3377,4348'],
  ['pipes?', 'A one-way channel: one process writes into it and another reads out of it.', '3377,4348'],
  ['fragmentation', 'Wasted memory: free space broken into pieces too small or scattered to use.'],
  ['thrashing', 'When a system spends more time swapping pages in and out than doing real work.'],
  ['inodes?|i-nodes?', 'The record a Unix file system keeps for each file: size, owner, permissions and where its data blocks are.'],
  ['exit status', 'The number a command returns when it finishes. 0 means success.'],
  // ---- databases
  ['tuples?', 'An ordered list of values. In databases: one row of a table.'],
  ['relations?', 'A table: a set of rows that all have the same columns.', '4347'],
  ['relations?', 'A set of ordered pairs saying which elements are related: (a, b) means "a is connected to b".', '2305'],
  ['attributes?', 'A column of a table: one fact stored about each row.', '4347'],
  ['primary keys?', 'The column (or columns) chosen to identify each row uniquely.'],
  ['foreign keys?', 'A column that refers to the primary key of another table, linking the two.'],
  ['candidate keys?', 'A smallest set of columns that uniquely identifies every row.'],
  ['superkeys?', 'Any set of columns that uniquely identifies rows (extra columns allowed).'],
  ['functional dependenc(?:y|ies)', 'X → Y: rows that agree on X must agree on Y, like a ZIP code determining the city.'],
  ['normaliz(?:e|ation|ed)', 'Reorganizing tables so each fact is stored once, which prevents update mistakes.'],
  ['quer(?:y|ies)', 'A question you ask a database, usually written in SQL.'],
  ['SQL', 'Structured Query Language: the standard language for asking databases questions.'],
  ['transactions?', 'A group of database steps that must all happen or none at all.'],
  ['serializab(?:le|ility)', 'A schedule is serializable if its result matches some one-at-a-time order of the transactions.'],
  // ---- discrete math & probability
  ['propositions?', 'A statement that is either true or false.'],
  ['predicates?', 'A statement with a blank, like "x is even", that becomes true or false once the blank is filled.'],
  ['quantifiers?', '"For all" (∀) or "there exists" (∃): words that say how many things a statement is about.'],
  ['tautolog(?:y|ies)', 'A statement that is true in every possible case.'],
  ['contrapositive', '"If not q, then not p": always means the same as "if p, then q".'],
  ['subsets?', 'A set whose elements are all also in another set.'],
  ['bijections?|bijective', 'A perfect pairing between two sets: every element is matched exactly once.'],
  ['induction', 'Proving something for every n: show the first case, then show each case implies the next (like dominoes).'],
  ['permutations?', 'An arrangement where order matters.'],
  ['combinations?', 'A selection where order doesn\'t matter.'],
  ['congruen(?:t|ce|ces)', 'Having the same remainder when divided by m (clock math).'],
  ['gcd', 'Greatest common divisor: the largest number that divides both numbers evenly.'],
  ['random variables?', 'A number whose value comes from a random outcome.'],
  ['expected value|expectation', 'The long-run average if the experiment were repeated many times.'],
  ['variance', 'How spread out values are around the average: the average squared distance from the mean.'],
  ['standard deviation', 'The square root of the variance: a typical distance from the average.'],
  ['p-values?', 'If nothing special were going on, the chance of seeing data at least this extreme.'],
  // ---- digital logic & theory
  ['flip-flops?', 'A one-bit memory circuit that updates only on a clock tick.'],
  ['multiplexers?|mux', 'A circuit that picks one of several inputs to pass to its output, chosen by select lines.'],
  ['minterms?', 'An AND of every variable (plain or complemented) that equals 1 for exactly one row of the truth table.'],
  ['truth tables?', 'A table listing the output for every possible combination of inputs.'],
  ['DFAs?', 'Deterministic finite automaton: a machine with a fixed set of states and exactly one move per input symbol.'],
  ['NFAs?', 'Nondeterministic finite automaton: like a DFA, but it may have several (or zero) moves on a symbol, and it accepts if any path works.'],
  ['automat(?:on|a)', 'A simple abstract machine that reads input one symbol at a time and changes state.'],
  ['alphabet', 'The set of symbols a machine or language uses, like {0, 1}.'],
  ['languages?', 'In theory: a set of strings, like all binary strings with an even number of 1s.', '4384'],
  ['regular expressions?|regex', 'A compact pattern for a set of strings, built from symbols, "or", "followed by" and "repeat".'],
  ['grammars?', 'A set of rewrite rules that generates the strings of a language.'],
  ['Turing machines?', 'A simple model of a computer: a state machine with an endless tape it can read, write and move along.'],
  ['undecidable|decidable', 'Decidable: some machine always halts with the correct yes/no answer. Undecidable: no machine can do that for every input.'],
  ['polynomial time', 'Running time bounded by n to some fixed power, like n² or n³. Counted as "efficient".'],
  ['NP-complete(?:ness)?', 'The hardest problems in NP: every NP problem can be translated into them quickly.'],
  ['reductions?', 'Translating one problem into another, so a solver for the second also solves the first.'],
  ['BNF', 'Backus–Naur Form: a notation for grammar rules, like <expr> → <id> + <expr>.'],
  ['parse trees?', 'A tree showing how a line of code is built from a grammar\'s rules.'],
  // ---- software engineering
  ['UML', 'Unified Modeling Language: a standard set of diagrams for designing software.'],
  ['design patterns?', 'A named, reusable solution to a common design problem.'],
  ['cyclomatic complexity', 'The number of independent paths through a piece of code: decisions + 1.'],
];
const GLOSS_CAP = 10;
const GLOSS_SKIP = 'pre,code,.code,.eq,.widget,#wbox,.secq,h1,h2,h3,h4,a,button,input,textarea,select,label,svg,.plain,.gl,.toc,.pnav,.pg,.vis,.opts,kbd,th';
const GLOSS_RX = GLOSS.map(([p, , cs, avoid]) => ({ rx: new RegExp('^(?:' + p + ')$', 'i'), cs: cs ? cs.split(',') : null, avoid: avoid ? new RegExp(avoid, 'i') : null }));
const GLOSS_ALL = new RegExp('(^|[^A-Za-z0-9_])(' + GLOSS.map(g => g[0]).join('|') + ')(?![A-Za-z0-9_]|-[A-Za-z])', 'gi');
// alternation order matters: longer / more specific patterns are listed first in GLOSS.
function glossify(root, courseId) {
  if (!root) return 0;
  const used = new Set(); let n = 0;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: t => !t.nodeValue.trim() || (t.parentElement && t.parentElement.closest(GLOSS_SKIP)) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
  const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const t of nodes) {
    if (n >= GLOSS_CAP) break;
    const s = t.nodeValue; let m, last = 0, frag = null; GLOSS_ALL.lastIndex = 0;
    while ((m = GLOSS_ALL.exec(s)) && n < GLOSS_CAP) {
      const word = m[2], start = m.index + m[1].length;
      const k = GLOSS_RX.findIndex(g => g.rx.test(word) && (!g.cs || g.cs.includes(courseId)) && !(g.avoid && g.avoid.test(s.slice(Math.max(0, start - 12), start))));
      if (k < 0 || used.has(GLOSS[k][1])) continue;
      used.add(GLOSS[k][1]); n++;
      frag ??= document.createDocumentFragment();
      frag.append(s.slice(last, start));
      const b = document.createElement('button'); b.type = 'button'; b.className = 'gl'; b.dataset.g = k; b.textContent = word;
      b.setAttribute('aria-expanded', 'false'); b.setAttribute('aria-label', word + ': tap for a plain-English definition');
      frag.append(b); last = start + word.length;
    }
    if (frag) { frag.append(s.slice(last)); t.replaceWith(frag); }
  }
  return n;
}
/* ---- one shared tooltip ---- */
(() => {
  const tip = document.createElement('div'); tip.id = 'gltip'; tip.setAttribute('role', 'tooltip'); tip.hidden = true; document.body.appendChild(tip);
  let cur = null, openedAt = 0;
  const close = () => { if (!cur) return; cur.setAttribute('aria-expanded', 'false'); cur.removeAttribute('aria-describedby'); cur = null; tip.hidden = true; tip.classList.remove('on'); };
  const open = b => {
    if (cur === b) return; close(); cur = b; openedAt = Date.now();
    const g = GLOSS[+b.dataset.g]; tip.innerHTML = `<b>${esc(b.textContent)}</b><span>${esc(g[1])}</span>`;
    tip.hidden = false; b.setAttribute('aria-expanded', 'true'); b.setAttribute('aria-describedby', 'gltip');
    const r = b.getBoundingClientRect(), W = innerWidth, H = innerHeight, w = tip.offsetWidth, h = tip.offsetHeight;
    const left = Math.max(8, Math.min(W - w - 8, r.left + r.width / 2 - w / 2)); const below = r.bottom + 10 + h < H - 8;
    tip.style.left = left + 'px'; tip.style.top = (below ? r.bottom + 10 : Math.max(8, r.top - h - 10)) + 'px';
    tip.style.setProperty('--ax', Math.max(14, Math.min(w - 14, r.left + r.width / 2 - left)) + 'px'); tip.dataset.side = below ? 'below' : 'above';
    void tip.offsetWidth; tip.classList.add('on');
  };
  document.addEventListener('click', e => { const b = e.target.closest && e.target.closest('.gl');
    if (b) { e.preventDefault(); if (cur === b && Date.now() - openedAt > 350) close(); else open(b); } else if (!e.target.closest('#gltip')) close(); });
  document.addEventListener('focusin', e => { const b = e.target.closest && e.target.closest('.gl'); if (b) open(b); else if (cur) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && cur) { const b = cur; close(); b.focus(); } });
  addEventListener('scroll', close, { passive: true }); addEventListener('resize', close); addEventListener('hashchange', close);
})();
/* ---- floating buttons (Study Board / Request a course): they only appear where they can't cover anything:
   in the empty strip reserved at the very bottom of every page. While you read, scroll or use a visualizer, they stay
   tucked away. */
(() => {
  const set = on => document.body.classList.toggle('fabs-off', !on);
  const update = () => {
    set(innerHeight + scrollY >= document.documentElement.scrollHeight - 8);
  };
  addEventListener('scroll', update, { passive: true }); addEventListener('resize', update); addEventListener('hashchange', () => { update(); setTimeout(update, 60); });
  new MutationObserver(() => { clearTimeout(update.t); update.t = setTimeout(update, 120); }).observe(document.getElementById('main') || document.body, { childList: true });
  setTimeout(update, 300);
})();
