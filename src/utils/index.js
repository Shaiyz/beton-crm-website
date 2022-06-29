export const printDiv = (divName) => {
  var printContents = document.getElementById(divName).innerHTML;
  var originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;

  window.print();

  document.body.innerHTML = originalContents;
};

export const getNames = (name) => {
  if (name == "WA") {
    return "Whatsapp";
  }
  if (name == "partialDownpayment") {
    return "Partial downpayment";
  }
  if (name == "closedLost") {
    return "Closed lost";
  }
  if (name == "attempt") {
    return "Attempt";
  }
  if (name == "phone") {
    return "Phone";
  }
  if (name == "arrange") {
    return "Arrange";
  }
  if (name == "done") {
    return "Done";
  }
  if (name == "closedWon") {
    return "Closed Won";
  }
  if (name === "text") {
    return "Text";
  }
  if (name === "token") {
    return "Token";
  }
  if (name === "meeting") {
    return "Meeting";
  }
  if (name === "sales") {
    return "Sales";
  }
  if (name === "call") {
    return "Call";
  }
  if (name === "message") {
    return "Message";
  }
  return name;
};
