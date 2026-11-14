/* Bytewise — CS 1436 Programming Fundamentals, section by section (Gaddis, Starting Out with C++: From Control Structures through Objects, ch 1–8,
   plus the problem-solving, algorithm, flowchart and number-system material intro courses add on top). */
'use strict';
(() => {
replaceCourse('1436');
const tdiv = (a, b) => Math.trunc(a / b), tmod = (a, b) => a - b * tdiv(a, b);
const flow = steps => `<div class="flowc">${steps.map(([k, t]) => `<div class="fc ${k}">${t}</div>`).join('<div class="fca">↓</div>')}</div>`;

CH.push({ id: 'k1', course: '1436', ext: '.cpp', title: 'Ch 1 · Computers, programs & problem solving', blurb: 'Hardware, the compile–link–run pipeline, syntax vs logic errors, pseudocode, flowcharts and the IPO model.',
  learn: [
    Sec('1.2', 'Hardware & software', `<p>A computer is a <b>CPU</b> (control unit + ALU: fetch → decode → execute), <b>main memory</b> (RAM: fast, volatile, organized as numbered bytes), <b>secondary storage</b> (SSD/HDD: slow, permanent), and <b>input/output</b> devices. Software is either <b>system</b> software (OS, compilers, utilities) or <b>application</b> software.</p>
      <table class="t"><tr><th>unit</th><th>size</th></tr><tr><td>bit</td><td>0 or 1</td></tr><tr><td>byte</td><td>8 bits (256 values)</td></tr><tr><td>KB / MB / GB</td><td>≈ 10³ / 10⁶ / 10⁹ bytes (2¹⁰ = 1024 in the binary convention)</td></tr></table>
      ${TRICK('RAM is volatile: unplug the computer and it is gone. Your source file lives in secondary storage; your running program lives in RAM. "Where is a variable stored while the program runs?" → main memory.')}`,
      () => R.pick([
        () => mcFrom('Which part of the CPU performs arithmetic and comparisons?', 'ALU', ['control unit', 'RAM', 'cache controller', 'bus'], ['the CPU = control unit + arithmetic logic unit', 'math and comparisons happen in the <b>ALU</b>']),
        () => mcFrom('Which storage loses its contents when power is turned off?', 'main memory (RAM)', ['SSD', 'hard disk', 'USB flash drive'], ['RAM is <b>volatile</b>', 'the others are secondary storage, which is non-volatile']),
        () => { const b = R.pick([1, 2, 3, 4, 5, 6, 7, 8, 10, 16]); return numQ(`How many different values can ${b} bit${b > 1 ? 's' : ''} represent?`, 2 ** b, '', ['each bit doubles the number of patterns', `2^${b} = <b>${2 ** b}</b>`], { abs: 0 }); },
        () => { const kb = R.pick([1, 2, 4, 8, 16]); return numQ(`How many bits are in ${kb} byte${kb > 1 ? 's' : ''}?`, kb * 8, 'bits', ['1 byte = 8 bits', `${kb} × 8 = <b>${kb * 8}</b>`], { abs: 0 }); },
      ])()),
    Sec('1.3–1.4', 'From source code to running program', `${flow([['io', 'source file  main.cpp'], ['proc', 'preprocessor: handles #include, #define'], ['proc', 'compiler: checks syntax, makes object code (main.o)'], ['proc', 'linker: joins object code + libraries'], ['io', 'executable  a.out / main.exe'], ['term', 'run: loaded into RAM, CPU executes it']])}
      <p>A <b>syntax error</b> breaks the language rules (missing semicolon, misspelled keyword) and is caught by the <b>compiler</b>. A <b>logic error</b> compiles and runs but gives the wrong answer (using + instead of *); only testing finds it. A <b>runtime error</b> crashes during execution (dividing an int by zero).</p>
      ${TRICK('Key words (reserved words) like <code>int</code>, <code>return</code>, <code>double</code> are lowercase and can never be variable names. Programmer-defined identifiers are everything you name yourself.')}`,
      () => { const items = [['cout << "Total: " << total', 'syntax error (missing semicolon)'], ['area = length + width;', 'logic error'], ['int x = 5 / 0;  // at runtime with variables', 'runtime error'], ['retrun 0;', 'syntax error (misspelled keyword)'], ['average = a + b / 2;', 'logic error']]; const [c, a] = R.pick(items); const kind = a.split(' (')[0]; return mcFrom(`What kind of error is this?<pre class="code"><code>${c}</code></pre>`, kind, ['syntax error', 'logic error', 'runtime error', 'linker error'], [a.includes('syntax') ? 'it breaks the rules of the language, so the compiler rejects it' : a.includes('logic') ? 'it compiles fine but computes the wrong thing (precedence or the wrong formula)' : 'it compiles but fails while running', `→ <b>${kind}</b>`]); }),
    Sec('1.6', 'Problem solving: IPO, pseudocode & flowcharts', `<p>Before writing code, design the algorithm: <b>Input</b> → <b>Processing</b> → <b>Output</b>. Write it in <b>pseudocode</b> (structured English) or draw a <b>flowchart</b>.</p>
      ${flow([['term', 'Start'], ['io', 'Input hours, rate'], ['proc', 'pay = hours × rate'], ['dec', 'hours > 40 ?'], ['proc', 'yes: pay += (hours − 40) × rate × 0.5'], ['io', 'Display pay'], ['term', 'End']])}
      <p>Flowchart shapes: oval = start/end, parallelogram = input/output, rectangle = process, diamond = decision.</p>
      ${TRICK('Every algorithm is built from just three structures: <b>sequence</b>, <b>selection</b> (if) and <b>repetition</b> (loops). If a question asks which structure a diamond with a back-arrow represents, it is repetition.')}`,
      () => { const q = R.pick([['decision', 'diamond'], ['input or output', 'parallelogram'], ['start or end', 'oval (terminal)'], ['processing step (calculation)', 'rectangle']]); return mcFrom(`Which flowchart symbol is used for a <b>${q[0]}</b>?`, q[1], ['diamond', 'parallelogram', 'oval (terminal)', 'rectangle', 'circle (connector)'], ['oval = start/end · parallelogram = I/O · rectangle = process · diamond = decision', `→ <b>${q[1]}</b>`]); }),
  ] });

CH.push({ id: 'k2', course: '1436', ext: '.cpp', title: 'Number systems & data representation', blurb: 'Binary, octal, hex, converting between bases, two\'s complement, ASCII and why 0.1 + 0.2 ≠ 0.3.',
  learn: [
    Sec('N.1', 'Binary and hexadecimal', `<p>Each binary place is a power of 2: 1011₂ = 8 + 0 + 2 + 1 = 11. Hexadecimal digits 0–9, A–F (A = 10 … F = 15) each stand for exactly 4 bits, so binary ↔ hex is a lookup: 1011 0110₂ = B6₁₆.</p>
      ${EX('Convert 45 to binary by repeated division.', ['45 ÷ 2 = 22 r 1', '22 ÷ 2 = 11 r 0', '11 ÷ 2 = 5 r 1', '5 ÷ 2 = 2 r 1', '2 ÷ 2 = 1 r 0', '1 ÷ 2 = 0 r 1', 'read remainders bottom-up'], '101101')}
      ${TRICK('Memorize powers of 2 up to 2¹⁰ = 1024. To convert decimal → binary fast, subtract the largest power of 2 that fits, repeatedly (45 = 32 + 8 + 4 + 1 → 101101).')}`,
      () => { const n = R.int(5, 255); return R.pick([
        () => textQ(`Convert ${n} to binary.`, n.toString(2), ['subtract powers of 2 (or divide by 2 and read remainders upward)', `→ <b>${n.toString(2)}</b>`], { check: v => v.replace(/\s|0b/g, '').replace(/^0+/, '') === n.toString(2) }),
        () => numQ(`Convert ${n.toString(2)}₂ to decimal.`, n, '', ['add the place values that have a 1', `→ <b>${n}</b>`], { abs: 0 }),
        () => textQ(`Convert ${n} to hexadecimal.`, n.toString(16).toUpperCase(), [`${n} = ${Math.floor(n / 16)} × 16 + ${n % 16}`, `→ <b>${n.toString(16).toUpperCase()}</b>`], { check: v => v.replace(/\s|0x/gi, '').toUpperCase().replace(/^0+/, '') === n.toString(16).toUpperCase() }),
        () => numQ(`Convert 0x${n.toString(16).toUpperCase()} to decimal.`, n, '', ['each hex digit is a power of 16', `→ <b>${n}</b>`], { abs: 0 }),
      ])(); }, 'bits'),
    Sec('N.2', 'Negative numbers: two\'s complement', `<p>With 8 bits, signed values run from −128 to +127. To negate: <b>flip every bit and add 1</b>. The leftmost bit is the sign bit (1 = negative).</p>
      ${EX('Write −20 in 8-bit two\'s complement.', ['+20 = 0001 0100', 'flip → 1110 1011', 'add 1 → 1110 1100'], '11101100')}
      ${TRICK('Shortcut: copy bits from the right up to and including the first 1, then flip everything to its left. 0001 0100 → 1110 1100.')}
      ${TRICK('Overflow: in 8-bit signed, 127 + 1 = −128. Adding two positives that gives a negative (or two negatives giving a positive) means overflow.')}`,
      () => { const n = -R.int(1, 128); const b = ((n + 256) & 255).toString(2).padStart(8, '0'); return R.pick([
        () => textQ(`Write ${n} in 8-bit two's complement.`, b, [`+${-n} = ${(-n & 255).toString(2).padStart(8, '0')}`, 'flip all bits and add 1', `→ <b>${b}</b>`], { check: v => v.replace(/\s/g, '') === b }),
        () => numQ(`The 8-bit two's complement pattern ${b} is what decimal value?`, n, '', ['leading 1 → negative', 'flip and add 1 to get the magnitude', `→ <b>${n}</b>`], { abs: 0 }),
      ])(); }, 'bits'),
    Sec('N.3', 'Characters and floating point', `<p>Characters are stored as numbers (ASCII): 'A' = 65, 'a' = 97, '0' = 48, space = 32. So <code>'7' - '0'</code> = 7, the standard digit-to-int trick.</p><p>Floating-point numbers are stored in binary scientific notation, so most decimal fractions (0.1, 0.2) are approximations. That is why <code>0.1 + 0.2 == 0.3</code> is <b>false</b> in C++.</p>
      ${TRICK('Never compare doubles with ==. Use <code>fabs(a - b) &lt; 1e-9</code>.')}`,
      () => { const c = R.pick('ABCDEFGHJKMNPQRSTWXYZ'.split('')), off = R.int(1, 5); return R.pick([
        () => numQ(`ASCII: what is <code>'${c}' + ${off}</code> as an int?`, c.charCodeAt(0) + off, '', [`'${c}' = ${c.charCodeAt(0)}`, `+ ${off} = <b>${c.charCodeAt(0) + off}</b>`], { abs: 0 }),
        () => textQ(`What does <code>cout &lt;&lt; char('${c}' + 32);</code> print?`, c.toLowerCase(), ['lowercase letters are 32 above uppercase', `→ <b>${c.toLowerCase()}</b>`]),
        () => numQ(`What is <code>'${off + 3}' - '0'</code>?`, off + 3, '', [`'${off + 3}' = ${48 + off + 3}, '0' = 48`, `difference = <b>${off + 3}</b>`], { abs: 0 }),
      ])(); }),
  ] });

CH.push({ id: 'k3', course: '1436', ext: '.cpp', title: 'Ch 2–3 · Variables, expressions & I/O', blurb: 'Types, assignment, integer division and %, precedence, casting, cin/getline and formatted output with iomanip.',
  learn: [
    Sec('2.5–2.14', 'Variables and arithmetic', `${code('int a = 17, b = 5;\ndouble c = a / b;          // 3.0 : integer division happens first!\ndouble d = static_cast<double>(a) / b;  // 3.4\nint r = a % b;             // 2')}
      <p>Integer division throws away the fraction (toward zero). <code>%</code> gives the remainder and only works on integers. Precedence: <code>( )</code> → unary − → <code>* / %</code> → <code>+ −</code> → assignment; ties go left to right.</p>
      ${TRICK('Count a statement\'s answer by hand left to right inside each precedence level. 10 - 4 - 3 is (10 - 4) - 3 = 3, not 9.')}`,
      () => { const a = R.int(7, 60), b = R.int(2, 9), c = R.int(1, 9); const forms = [[`${a} / ${b} * ${c}`, tdiv(a, b) * c], [`${a} % ${b} + ${c}`, tmod(a, b) + c], [`${a} - ${c} * ${b}`, a - c * b], [`(${a} + ${c}) / ${b}`, tdiv(a + c, b)], [`${a} / ${b} % ${c}`, tmod(tdiv(a, b), c)], [`${a} % (${b} + ${c})`, tmod(a, b + c)]]; const [e, v] = R.pick(forms); return numQ(`All values are <code>int</code>. Evaluate <code>${e}</code>.`, v, '', ['* / % before + −, left to right', 'integer division truncates', `→ <b>${v}</b>`], { abs: 0 }); }, 'tracer'),
    Sec('3.1–3.9', 'Input, getline and formatting', `${code('int age; string name;\ncin >> age;\ncin.ignore();            // throw away the leftover newline!\ngetline(cin, name);     // reads a whole line, spaces included\ncout << fixed << setprecision(2) << 3.14159;  // 3.14\ncout << setw(6) << 42;  // "    42" (right-aligned in 6)')}
      ${TRICK('cin >> leaves the Enter key in the buffer. A getline right after it reads that empty line. Fix: cin.ignore() between them. This is the #1 bug in intro labs.')}
      ${TRICK('setw affects only the NEXT item printed; fixed and setprecision stay in effect until changed.')}`,
      () => { const v = R.pick([3.14159, 2.5, 12.345, 0.006, 99.999]), p = R.int(0, 3); const s = v.toFixed(p); return textQ(`What does <code>cout &lt;&lt; fixed &lt;&lt; setprecision(${p}) &lt;&lt; ${v};</code> print?`, s, ['fixed + setprecision(p) → exactly p digits after the decimal point, rounded', `→ <b>${s}</b>`]); }),
  ] });

CH.push({ id: 'k4', course: '1436', ext: '.cpp', title: 'Ch 4 · Making decisions', blurb: 'Relational and logical operators, if/else-if chains, nested ifs, switch fall-through, short-circuiting and the = vs == bug.',
  learn: [
    Sec('4.1–4.8', 'if, else if, nesting', `${code('if (score >= 90)      grade = \'A\';\nelse if (score >= 80) grade = \'B\';\nelse if (score >= 70) grade = \'C\';\nelse                  grade = \'F\';')}
      <p>An else-if chain stops at the <b>first</b> true condition. Order matters: test the most restrictive condition first.</p>
      ${TRICK('<code>if (x = 5)</code> assigns 5 and is always true. Write <code>if (5 == x)</code> if you want the compiler to catch the typo.')}
      ${TRICK('A semicolon right after <code>if (cond);</code> makes an empty body; the block underneath always runs.')}`,
      () => { const s = R.int(55, 100); const g = s >= 90 ? 'A' : s >= 80 ? 'B' : s >= 70 ? 'C' : 'F'; const wrong = R.pick([true, false]); if (wrong) { const g2 = s >= 70 ? 'C' : s >= 80 ? 'B' : s >= 90 ? 'A' : 'F'; return textQ(`score = ${s}. What is grade?<pre class="code"><code>if (score >= 70) grade = 'C';\nelse if (score >= 80) grade = 'B';\nelse if (score >= 90) grade = 'A';\nelse grade = 'F';</code></pre>`, g2, ['the chain stops at the first true test', s >= 70 ? `${s} >= 70 is already true → C (the A/B branches can never run)` : 'nothing true → F', `→ <b>${g2}</b>`]); } return textQ(`score = ${s}. What is grade (90/80/70 chain, A/B/C/F)?`, g, [`first true test from the top`, `→ <b>${g}</b>`]); }),
    Sec('4.9–4.10', 'Logical operators and short-circuiting', `<p><code>&amp;&amp;</code> is true only if both sides are; <code>||</code> if either is; <code>!</code> flips. Precedence: <code>!</code> → relational → <code>&amp;&amp;</code> → <code>||</code>.</p><p><b>Short-circuit</b>: <code>a &amp;&amp; b</code> skips b if a is false; <code>a || b</code> skips b if a is true. So <code>if (n != 0 &amp;&amp; total / n &gt; 5)</code> never divides by zero.</p>
      ${TRICK('De Morgan: !(a && b) == !a || !b, and !(a || b) == !a && !b. "Not between 1 and 10": !(x >= 1 && x <= 10) = x < 1 || x > 10.')}
      ${TRICK('<code>1 &lt; x &lt; 10</code> compiles but is (1 < x) < 10, which is always true (0 or 1 is less than 10).')}`,
      () => { const a = R.int(0, 12), b = R.int(0, 12); const e = R.pick([[`a > 5 && b < 4`, a > 5 && b < 4], [`a > 5 || b < 4`, a > 5 || b < 4], [`!(a == b) && a % 2 == 0`, a !== b && a % 2 === 0], [`a < b || a > 10 && b > 10`, a < b || (a > 10 && b > 10)], [`!(a > 3 || b > 3)`, !(a > 3 || b > 3)]]); return mc(`a = ${a}, b = ${b}. Is <code>${e[0]}</code> true or false?`, ['true', 'false'], e[1] ? 0 : 1, ['&& binds tighter than ||', `→ <b>${e[1]}</b>`]); }),
    Sec('4.14', 'switch and fall-through', `${code('switch (n) {\n  case 1: cout << "one ";\n  case 2: cout << "two ";  break;\n  case 3: cout << "three ";\n  default: cout << "other";\n}')}<p>Without <code>break</code>, execution <b>falls through</b> into the next case. With n = 1 this prints <code>one two</code>; n = 3 prints <code>three other</code>.</p>
      ${TRICK('switch works only on integers/chars (and enums), never strings or doubles; case labels must be constants.')}`,
      () => { const n = R.int(1, 4); const out = n === 1 ? 'one two' : n === 2 ? 'two' : n === 3 ? 'three other' : 'other'; return textQ(`With the switch above, what prints for n = ${n}?`, out, ['start at the matching case, keep going until break or the end', `→ <b>${out}</b>`], { check: v => v.trim().replace(/\s+/g, ' ') === out }); }),
  ] });

CH.push({ id: 'k5', course: '1436', ext: '.cpp', title: 'Ch 5 · Loops & files', blurb: 'while, do-while, for, counters and accumulators, sentinels, input validation, nested loops and reading files.',
  learn: [
    Sec('5.1–5.6', 'while, do-while, for', `${code('int sum = 0;\nfor (int i = 1; i <= 5; i++)\n    sum += i;          // 1+2+3+4+5 = 15\n\nint n;\ndo {\n    cin >> n;          // body runs at least once\n} while (n < 0);       // input validation')}
      <p><b>while</b> tests first (may run 0 times). <b>do-while</b> tests last (runs at least once). <b>for</b> packs init; test; update into one line.</p>
      ${TRICK('Count iterations of for (i = a; i < b; i += s) as ceil((b − a) / s). With <=, use floor((b − a) / s) + 1.')}
      ${TRICK('Off-by-one check: always test the first and last iteration by hand.')}`,
      () => { const a = R.int(0, 5), b = R.int(8, 25), s = R.pick([1, 2, 3, 4]), le = R.pick([true, false]); let c = 0, sum = 0; for (let i = a; le ? i <= b : i < b; i += s) { c++; sum += i; } return R.pick([
        () => numQ(`How many times does the body run?<pre class="code"><code>for (int i = ${a}; i ${le ? '<=' : '<'} ${b}; i += ${s})</code></pre>`, c, '', [`i takes ${a}, ${a + s}, … while i ${le ? '≤' : '<'} ${b}`, `→ <b>${c}</b>`], { abs: 0 }),
        () => numQ(`What is sum?<pre class="code"><code>int sum = 0;\nfor (int i = ${a}; i ${le ? '<=' : '<'} ${b}; i += ${s})\n    sum += i;</code></pre>`, sum, '', [`add ${a}, ${a + s}, …`, `→ <b>${sum}</b>`], { abs: 0 }),
      ])(); }, 'tracer'),
    Sec('5.7–5.11', 'Counters, accumulators, sentinels, nested loops', `<p>A <b>counter</b> goes up by 1; an <b>accumulator</b> adds values (start it at 0, or 1 for products). A <b>sentinel</b> is a special value that ends input (e.g., −1).</p>${code('for (int r = 1; r <= 3; r++) {\n    for (int c = 1; c <= r; c++) cout << \'*\';\n    cout << endl;\n}   // *  /  **  /  ***')}
      ${TRICK('Nested loop count = outer × inner when the inner is fixed; when it depends on the outer variable, add them up (1 + 2 + … + n = n(n+1)/2).')}`,
      () => { const n = R.int(3, 8), m = R.int(2, 6), dep = R.pick([true, false]); const v = dep ? n * (n + 1) / 2 : n * m; return numQ(`How many stars print?<pre class="code"><code>for (int i = 1; i <= ${n}; i++)\n    for (int j = 1; j <= ${dep ? 'i' : m}; j++)\n        cout << '*';</code></pre>`, v, '', [dep ? `inner runs 1, 2, …, ${n} times` : `${n} × ${m}`, `→ <b>${v}</b>`], { abs: 0 }); }),
    Sec('5.12', 'Reading and writing files', `${code('#include <fstream>\nifstream in("data.txt");\nif (!in) { cout << "can\'t open"; return 1; }\nint x, total = 0;\nwhile (in >> x)          // stops at end of file or bad data\n    total += x;\nin.close();\nofstream out("out.txt");\nout << total << endl;')}
      ${TRICK('Loop on the read itself: <code>while (in &gt;&gt; x)</code>. Looping on <code>!in.eof()</code> processes the last value twice.')}`,
      () => mcFrom('Which loop reads every integer in a file correctly?', 'while (in >> x) { … }', ['while (!in.eof()) { in >> x; … }', 'for (int i = 0; i < in.size(); i++)', 'do { … } while (in);'], ['the extraction returns false once nothing more can be read', '→ <b>while (in &gt;&gt; x)</b>'])),
  ] });

CH.push({ id: 'k6', course: '1436', ext: '.cpp', title: 'Ch 6 · Functions', blurb: 'Prototypes, parameters, return values, pass by value vs by reference, scope, static locals, defaults and overloading.',
  learn: [
    Sec('6.1–6.8', 'Defining and calling functions', `${code('double area(double r);          // prototype (before main)\n\nint main() {\n    cout << area(2.0);         // call\n}\n\ndouble area(double r) {        // definition\n    return 3.14159 * r * r;\n}')}
      ${TRICK('A function can return only ONE value. To "return" two results, pass references or return a struct.')}`,
      () => { const a = R.int(1, 9), b = R.int(1, 9); return numQ(`What prints?<pre class="code"><code>int f(int x, int y) { return x * 2 - y; }\nint main() { cout << f(${b}, f(${a}, ${b})); }</code></pre>`, b * 2 - (a * 2 - b), '', [`inner first: f(${a}, ${b}) = ${a * 2 - b}`, `outer: f(${b}, ${a * 2 - b}) = <b>${b * 2 - (a * 2 - b)}</b>`], { abs: 0 }); }, 'tracer'),
    Sec('6.13', 'Pass by value vs by reference', `${code('void byVal(int n)  { n = n * 2; }\nvoid byRef(int &n) { n = n * 2; }\nint x = 5;\nbyVal(x);   // x still 5 (a copy was changed)\nbyRef(x);   // x is now 10')}
      ${TRICK('The & goes on the parameter, not the call. If the parameter has no &, the caller\'s variable cannot change, no matter what the function does.')}`,
      () => { const x = R.int(2, 9), refA = R.pick([true, false]), refB = R.pick([true, false]); let v = x; if (refA) v = v + 3; if (refB) v = v * 2; return numQ(`What is x at the end?<pre class="code"><code>void a(int ${refA ? '&' : ''}n) { n = n + 3; }\nvoid b(int ${refB ? '&' : ''}n) { n = n * 2; }\nint x = ${x};\na(x); b(x);</code></pre>`, v, '', [refA ? 'a takes a reference: x += 3' : 'a gets a copy: x unchanged', refB ? 'b takes a reference: x *= 2' : 'b gets a copy: x unchanged', `→ <b>${v}</b>`], { abs: 0 }); }),
    Sec('6.10–6.12', 'Scope, static locals, globals', `<p>A local variable exists only inside its block and is destroyed when the function returns. A <b>static</b> local keeps its value between calls. Globals are visible everywhere (avoid them except for constants).</p>${code('int counter() {\n    static int c = 0;   // initialized only once\n    return ++c;\n}\n// counter(), counter(), counter() → 1, 2, 3')}
      ${TRICK('A local with the same name as a global hides (shadows) it inside that function.')}`,
      () => { const k = R.int(2, 6); return numQ(`counter() is called ${k} times (static int c = 0; return ++c;). What does the last call return?`, k, '', ['the static local remembers its value', `→ <b>${k}</b>`], { abs: 0 }); }),
  ] });

CH.push({ id: 'k7', course: '1436', ext: '.cpp', title: 'Ch 7–8 · Arrays, searching & sorting', blurb: 'Declaring and indexing arrays, bounds, passing to functions, parallel and 2D arrays, linear/binary search, bubble and selection sort.',
  learn: [
    Sec('7.1–7.7', 'Arrays basics', `${code('int a[5] = {3, 8, 1};   // a = {3, 8, 1, 0, 0}\nfor (int i = 0; i < 5; i++) cout << a[i];\n// valid indexes: 0 … 4.  a[5] is OUT OF BOUNDS (no error, just garbage or a crash)')}
      ${TRICK('Arrays are always passed by reference-ish (the function gets the address), so a function can change the caller\'s array. Pass the size separately: <code>void show(const int a[], int n)</code>.')}
      ${TRICK('You cannot copy or compare arrays with = or ==. Use a loop.')}`,
      () => { const arr = Array.from({ length: R.int(5, 7) }, () => R.int(1, 9)); const op = R.pick(['sum', 'max', 'last', 'count']); const v = op === 'sum' ? arr.reduce((a, b) => a + b) : op === 'max' ? Math.max(...arr) : op === 'last' ? arr[arr.length - 1] : arr.filter(x => x > 4).length;
        const codeS = op === 'sum' ? 's += a[i];' : op === 'max' ? 'if (a[i] > s) s = a[i];' : op === 'last' ? 's = a[i];' : 'if (a[i] > 4) s++;'; return numQ(`int a[] = {${arr.join(', ')}};<pre class="code"><code>int s = 0;\nfor (int i = 0; i < ${arr.length}; i++)\n    ${codeS}</code></pre>What is s?`, v, '', ['trace each element', `→ <b>${v}</b>`], { abs: 0 }); }, 'tracer'),
    Sec('8.1–8.2', 'Linear and binary search', `<p>Linear search checks every element: up to n comparisons, works on any array. Binary search needs a <b>sorted</b> array and halves the range each time: at most ⌊log₂ n⌋ + 1 comparisons (1000 items → 10).</p>
      ${TRICK('Binary search on unsorted data gives wrong answers silently. Exams ask "what must be true before binary search?" → sorted.')}`,
      () => { const n = R.pick([7, 15, 31, 63, 100, 1000, 1024, 5000]); const v = Math.floor(Math.log2(n)) + 1; return numQ(`Maximum comparisons for a binary search of ${n} sorted items?`, v, '', ['each comparison halves the range', `⌊log₂ ${n}⌋ + 1 = <b>${v}</b>`], { abs: 0 }); }),
    Sec('8.3', 'Bubble and selection sort', `<p><b>Bubble sort</b>: repeatedly swap adjacent out-of-order pairs; after pass k the k largest items are in place. <b>Selection sort</b>: find the smallest remaining element and swap it into the next position; exactly n − 1 swaps at most.</p>
      ${TRICK('After one pass of bubble sort, only the LARGEST element is guaranteed in its final spot. After one pass of selection sort, only the SMALLEST is.')}`,
      () => { const arr = R.sample([2, 3, 5, 7, 8, 9, 11, 13], 5); const b = [...arr]; for (let i = 0; i < b.length - 1; i++) if (b[i] > b[i + 1]) [b[i], b[i + 1]] = [b[i + 1], b[i]]; const s = [...arr]; const mi = s.indexOf(Math.min(...s)); [s[0], s[mi]] = [s[mi], s[0]]; const bub = R.pick([true, false]); const ans = (bub ? b : s).join(' '); return textQ(`{${arr.join(', ')}} after ONE pass of <b>${bub ? 'bubble' : 'selection'} sort</b> (ascending)? Type the numbers separated by spaces.`, ans, [bub ? 'compare neighbors left to right, swap if out of order' : 'swap the minimum into position 0', `→ <b>${ans}</b>`], { check: v => v.trim().split(/[\s,]+/).join(' ') === ans }); }, 'sorting'),
  ] });

Object.entries({ k1: '01-computers-problem-solving', k2: '02-number-systems', k3: '03-variables-io', k4: '04-decisions', k5: '05-loops-files', k6: '06-functions', k7: '07-arrays-search-sort' }).forEach(([id, f]) => { const c = chById(id); if (c) c.file = f + '.cpp'; });
})();
