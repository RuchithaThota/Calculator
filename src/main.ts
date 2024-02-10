const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const wrapper = document.querySelector<HTMLDivElement>(".calc__screen-cont");

const reset = document.getElementById("reset") as HTMLButtonElement;
const equal = document.getElementById("equal") as HTMLButtonElement;
const deleteBtn = document.getElementById("delete") as HTMLButtonElement;
const input = document.getElementById("input") as HTMLInputElement;
const display = document.querySelector(".display") as HTMLDivElement;

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
});

deleteBtn?.addEventListener("click", () => {
  input.value = input.value.slice(0, -1);
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
  try {
    const result = eval(input.value);
    const formattedResult = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(result);
    input.value = formattedResult.endsWith(".00")
      ? formattedResult.slice(1, -3)
      : formattedResult.slice(1);
  } catch (error) {
    alert(error);
  }
});
