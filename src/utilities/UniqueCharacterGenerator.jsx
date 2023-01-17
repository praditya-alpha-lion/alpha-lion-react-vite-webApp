import React from "react";

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+";

export default function UniqueCharacterGenerator() {
  let randomCharacter = "";
  const length = 24;
  for (let i = 0; i < length; i++) {
    const x = generateX();
    randomCharacter += x;
  }
  return randomCharacter;
}

function generateX() {
  const xs = [];
  xs.push(getUppercase());
  xs.push(getLowercase());
  xs.push(getNumber());
  xs.push(getSymbol());

  if (xs.length === 0) {
    return "";
  }
  return xs[Math.floor(Math.random() * xs.length)];
}

function getLowercase() {
  return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

function getUppercase() {
  return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

function getNumber() {
  return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}
