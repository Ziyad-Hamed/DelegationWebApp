function convertToArabic() {
  const inputElement = document.getElementById("numberInput");
  const outputElement = document.getElementById("output");

  const inputNumber = inputElement.value.trim();

  // Check if the input is a valid number
  if (!isNaN(inputNumber) && inputNumber !== "") {
    // Convert input to a float with two decimal places
    const formattedInput = parseFloat(inputNumber).toFixed(2);

    const arabicWords = convertToArabicWords(formattedInput);
    outputElement.textContent = arabicWords + " جنيهاً مصرياً فقط لا غير";
  } else {
    outputElement.textContent = "Invalid input. Please enter a valid number.";
  }
}

function convertToArabicWords(number) {
  const units = [
    "",
    "ألف",
    "مليون",
    "مليار",
    "تريليون",
    "كوادريليون",
    "كوينتليون",
  ];
  const tens = [
    "",
    "عشرة",
    "عشرون",
    "ثلاثون",
    "أربعون",
    "خمسون",
    "ستون",
    "سبعون",
    "ثمانون",
    "تسعون",
  ];
  const ones = [
    "",
    "واحد",
    "اثنان",
    "ثلاثة",
    "أربعة",
    "خمسة",
    "ستة",
    "سبعة",
    "ثمانية",
    "تسعة",
  ];

  if (number === 0) {
    return "صفر";
  }

  let result = "";
  let groupCount = 0;

  while (number > 0) {
    const threeDigits = number % 1000;
    if (threeDigits > 0) {
      if (groupCount > 0) {
        result = " و" + result;
      }
      result =
        convertThreeDigitsToWords(threeDigits) +
        " " +
        units[groupCount] +
        result;
    }
    number = Math.floor(number / 1000);
    groupCount++;
  }

  return result;
}

function convertThreeDigitsToWords(number) {
  const ones = [
    "",
    "واحد",
    "اثنان",
    "ثلاثة",
    "أربعة",
    "خمسة",
    "ستة",
    "سبعة",
    "ثمانية",
    "تسعة",
  ];
  const tens = [
    "",
    "عشرة",
    "عشرون",
    "ثلاثون",
    "أربعون",
    "خمسون",
    "ستون",
    "سبعون",
    "ثمانون",
    "تسعون",
  ];

  let result = "";

  const hundreds = Math.floor(number / 100);
  const remainingDigits = number % 100;

  if (hundreds > 0) {
    result += ones[hundreds] + " مائة";
    if (remainingDigits > 0) {
      result += " و";
    }
  }

  if (remainingDigits >= 10 && remainingDigits <= 19) {
    if (remainingDigits === 10) {
      result += "عشرة";
    } else if (remainingDigits === 11) {
      result += "أحد عشر";
    } else if (remainingDigits === 12) {
      result += "اثنتا عشر";
    } else {
      result += ones[remainingDigits - 10] + " عشرة";
    }
  } else {
    const tensDigit = Math.floor(remainingDigits / 10);
    const onesDigit = remainingDigits % 10;
    if (onesDigit > 0) {
      result += ones[onesDigit];
      if (tensDigit > 0) {
        result += " و";
      }
    }
    if (tensDigit > 0) {
      result += tens[tensDigit];
    }
  }

  return result;
}