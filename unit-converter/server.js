const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'));

app.get("/", (req, res) => {
  res.send("Welcome to the Unit Converter!");
});

app.get("/length", (req, res) => {
  res.render("length");
});

app.post("/length", (req, res) => {
  const { numValue, fromUnit, toUnit } = req.body;
  console.log(numValue, fromUnit, toUnit);
    const lengthInNumber = Number(numValue);
    const from = fromUnit;
    const to = toUnit;
  
    // cm to m
    let convertedLength = 0;
    if(lengthInNumber < 0) {
      res.render("length", { convertedValue: "Length cannot be negative" });
      return;
    }

    if(from === "cm" && to === "m") {
      convertedLength = lengthInNumber / 100;
    }

    if(from === "m" && to === "cm") {
      convertedLength = lengthInNumber * 100;
    }

    if(from === "cm" && to === "km") {
      convertedLength = lengthInNumber / 100000;
    }

    if(from === "km" && to === "cm") {
      convertedLength = lengthInNumber * 100000;
    }

    if(from === "m" && to === "km") {
      convertedLength = lengthInNumber / 1000;
    }

    if(from === "km" && to === "m") {
      convertedLength = lengthInNumber * 1000;
    }

    if(from === to) {
      convertedLength = lengthInNumber;
    }
  
    res.render("length", { convertedValue: convertedLength });
});

app.get("/weight", (req, res) => {
  res.render("weight");
})

app.post("/weight", (req, res) => {
    const { numValue, fromUnit, toUnit } = req.body;
    console.log(numValue, fromUnit, toUnit);
    const weightInNumber = Number(numValue);
    const from = fromUnit;
    const to = toUnit;

    let convertedWeight = 0;
    if(weightInNumber < 0) {
      res.render("weight", { convertedValue: "Weight cannot be negative" });
      return;
    }
    // kg to g
    if(from === "kg" && to === "g") {
      convertedWeight = weightInNumber * 1000;
    }

    if(from === "g" && to === "kg") {
      convertedWeight = weightInNumber / 1000;
    }

    if(from === "kg" && to === "mg") {
      convertedWeight = weightInNumber * 1000000;
    }

    if(from === "mg" && to === "kg") {
      convertedWeight = weightInNumber / 1000000;
    }

    if(from === "g" && to === "mg") {
      convertedWeight = weightInNumber * 1000;
    }

    if(from === "mg" && to === "g") {
      convertedWeight = weightInNumber / 1000;
    }

    if(from === to) {
      convertedWeight = weightInNumber;
    }

    res.render("weight", { convertedValue: convertedWeight  }); 
});

app.get("/temperature", (req, res) => {
  res.render("temperature");
});

app.post("/temperature", (req, res) => {
  const { numValue, fromUnit, toUnit } = req.body;
  console.log(numValue, fromUnit, toUnit);
  const tempInNumber = Number(numValue);
  const from = fromUnit;
  const to = toUnit;

  let convertedTemp = 0;

  // Celsius to Fahrenheit
  if(from === "C" && to === "F") {
    convertedTemp = (tempInNumber * 9/5) + 32;
  }
  if(from === "F" && to === "C") {
    convertedTemp = (tempInNumber - 32) * 5/9;
  }
  if(from === "C" && to === "K") {
    convertedTemp = tempInNumber + 273.15;
  }
  if(from === "K" && to === "C") {
    convertedTemp = tempInNumber - 273.15;
  }

  if(from === "F" && to === "K") {
    convertedTemp = (tempInNumber - 32) * 5/9 + 273.15;
  }
  if(from === "K" && to === "F") {
    convertedTemp = (tempInNumber - 273.15) * 9/5 + 32;
  }

  if(from === to) {
    convertedTemp = tempInNumber;
  }

  res.render("temperature", { convertedValue: convertedTemp });
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
