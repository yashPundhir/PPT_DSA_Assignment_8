/*

**Question 2**

Given a string s containing only three types of characters: '(', ')' and '*', return true *if* s *is **valid***.

The following rules define a **valid** string:

- Any left parenthesis '(' must have a corresponding right parenthesis ')'.
- Any right parenthesis ')' must have a corresponding left parenthesis '('.
- Left parenthesis '(' must go before the corresponding right parenthesis ')'.
- '*' could be treated as a single right parenthesis ')' or a single left parenthesis '(' or an empty string "".

**Example 1:**

**Input:** s = "()"

**Output:**

true

*/

// Solution

function isValid(s) {
	let leftCount = 0;
	let starCount = 0;

	for (let i = 0; i < s.length; i++) {
		const c = s[i];

		if (c === "(") {
			leftCount++;
		} else if (c === "*") {
			starCount++;
		} else if (c === ")") {
			if (leftCount > 0) {
				leftCount--;
			} else if (starCount > 0) {
				starCount--;
			} else {
				return false;
			}
		}
	}

	while (leftCount > 0) {
		if (starCount > 0) {
			leftCount--;
			starCount--;
		} else {
			return false;
		}
	}

	return starCount >= leftCount;
}

/*

**Question 5**

Given an array of characters chars, compress it using the following algorithm:

Begin with an empty string s. For each group of **consecutive repeating characters** in chars:

- If the group's length is 1, append the character to s.
- Otherwise, append the character followed by the group's length.

The compressed string s **should not be returned separately**, but instead, be stored **in the input character array chars**. Note that group lengths that are 10 or longer will be split into multiple characters in chars.

After you are done **modifying the input array,** return *the new length of the array*.

You must write an algorithm that uses only constant extra space.

**Example 1:**

**Input:** chars = ["a","a","b","b","c","c","c"]

**Output:** Return 6, and the first 6 characters of the input array should be: ["a","2","b","2","c","3"]

**Explanation:**

The groups are "aa", "bb", and "ccc". This compresses to "a2b2c3".

*/

// Solution

var compress = function (chars) {
	let i = 0;
	let count = 1;
	for (let j = 1; j <= chars.length; j++) {
		if (j < chars.length && chars[j] === chars[j - 1]) {
			count++;
		} else {
			chars[i] = chars[j - 1];
			i++;
			if (count > 1) {
				for (let digit of count.toString()) {
					chars[i] = digit;
					i++;
				}
			}
			count = 1;
		}
	}
	return i;
};

/*

**Question 6**

Given two strings s and p, return *an array of all the start indices of* p*'s anagrams in* s. You may return the answer in **any order**.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Example 1:**

**Input:** s = "cbaebabacd", p = "abc"

**Output:** [0,6]

**Explanation:**

The substring with start index = 0 is "cba", which is an anagram of "abc".

The substring with start index = 6 is "bac", which is an anagram of "abc".

*/

// Solution

function findAnagrams(s, p) {
	const pFreq = new Array(26).fill(0); // Frequency array for characters in p
	const windowFreq = new Array(26).fill(0); // Frequency array for characters in sliding window
	const result = []; // Array to store indices of anagram substrings

	// Helper function to convert character to index in frequency array
	const getCharIndex = (char) => char.charCodeAt(0) - "a".charCodeAt(0);

	// Calculate frequencies of characters in p
	for (let i = 0; i < p.length; i++) {
		pFreq[getCharIndex(p[i])]++;
	}

	let start = 0; // Start of the sliding window
	let end = 0; // End of the sliding window

	while (end < s.length) {
		// Increment frequency of character at end index in sliding window
		windowFreq[getCharIndex(s[end])]++;

		if (end - start + 1 === p.length) {
			// Check if frequencies of characters match
			if (windowFreq.join("") === pFreq.join("")) {
				result.push(start);
			}

			// Decrement frequency of character at start index in sliding window
			windowFreq[getCharIndex(s[start])]--;

			start++; // Move the sliding window by incrementing start
		}

		end++; // Expand the sliding window by incrementing end
	}

	return result;
}

/*

**Question 7**

Given an encoded string, return its decoded string.

The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.

You may assume that the input string is always valid; there are no extra white spaces, square brackets are well-formed, etc. Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, k. For example, there will not be input like 3a or 2[4].

The test cases are generated so that the length of the output will never exceed 105.

**Example 1:**

**Input:** s = "3[a]2[bc]"

**Output:** "aaabcbc"

*/

// Solution

function decodeString(s) {
	let stack = [];

	for (let char of s) {
		if (char !== "]") {
			stack.push(char);
		} else {
			let currStr = "";
			while (stack.length > 0 && stack[stack.length - 1] !== "[") {
				currStr = stack.pop() + currStr;
			}

			// Pop the opening bracket '['
			stack.pop();

			let count = "";
			while (stack.length > 0 && !isNaN(stack[stack.length - 1])) {
				count = stack.pop() + count;
			}

			count = parseInt(count);

			let repeatedStr = "";
			for (let i = 0; i < count; i++) {
				repeatedStr += currStr;
			}

			stack.push(repeatedStr);
		}
	}

	return stack.join("");
}

/*

**Question 8**

Given two strings s and goal, return true *if you can swap two letters in* s *so the result is equal to* goal*, otherwise, return* false*.*

Swapping letters is defined as taking two indices i and j (0-indexed) such that i != j and swapping the characters at s[i] and s[j].

- For example, swapping at indices 0 and 2 in "abcd" results in "cbad".

**Example 1:**

**Input:** s = "ab", goal = "ba"

**Output:** true

**Explanation:** You can swap s[0] = 'a' and s[1] = 'b' to get "ba", which is equal to goal.

*/

// Solution

function canBeEqual(s, goal) {
	let diffCount = 0;
	let diffIndices = [];

	for (let i = 0; i < s.length; i++) {
		if (s[i] !== goal[i]) {
			diffCount++;
			diffIndices.push(i);
		}

		if (diffCount > 2) {
			return false;
		}
	}

	return (
		diffCount === 2 &&
		s[diffIndices[0]] === goal[diffIndices[1]] &&
		s[diffIndices[1]] === goal[diffIndices[0]]
	);
}
