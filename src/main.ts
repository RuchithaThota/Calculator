const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const wrapper = document.querySelector<HTMLDivElement>(".calc__screen-cont");

const reset = document.getElementById("reset") as HTMLButtonElement;
const equal = document.getElementById("equal") as HTMLButtonElement;
const deleteBtn = document.getElementById("delete") as HTMLButtonElement;
const input = document.getElementById("input") as HTMLInputElement;
const display = document.querySelector(".display") as HTMLDivElement;

input.focus();

const handleOverflow = () => {
  if (wrapper) {
    const isOverflowing = wrapper.offsetWidth < input.scrollWidth;
    if (isOverflowing) {
      input.scrollLeft = input.scrollWidth - input.offsetWidth;
    }
  }
};

numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    const target = e.target as HTMLButtonElement;
    input.value += target.textContent;
    handleOverflow();
  });
});

reset?.addEventListener("click", () => {
  input.value = "";
  display.textContent = "";
  input.focus();
});

deleteBtn?.addEventListener("click", () => {
  input.value = input.value.slice(0, -1);
  input.focus();
  if (input.value.length === 0) {
    display.textContent = "";
  }
});

operators.forEach((operator) => {
  operator.addEventListener("click", (e: Event) => {
    const target = e.target as HTMLButtonElement;
    const operatorList: string[] = ["+", "-", "*", "/"];
    const operatorTextContent = target.textContent;
    if (!operatorTextContent) return;
    if (operatorList.includes(operatorTextContent)) {
      const previousChar = input.value.slice(-1);
      if (!operatorList.includes(previousChar)) {
        input.value += operatorTextContent;
      }
    } else if (operatorTextContent === ".") {
      const lastSubstring = getLastSubstringAfterLastOperator(input.value);
      if (!input.value.includes(".") || !lastSubstring.includes(".")) {
        input.value += operatorTextContent;
      }
    }
    handleOverflow();
  });
});

function getLastSubstringAfterLastOperator(input: string): string {
  const operatorRegex = /[+\-*\/]/;
  const substrings = input.split(operatorRegex);
  const lastSubstring = substrings[substrings.length - 1];
  return lastSubstring;
}

equal.addEventListener("click", () => {
  if (input.value.length === 0) return;
  display.textContent = input.value + "=";
  const result: string = eval(input.value);
  input.value = result;
});
