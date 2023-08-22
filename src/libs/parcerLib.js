const candidateId = process.env.REACT_APP_CANDIDATE_ID;

let ParceLib = {
  rotateClasses: {
    right: "rotate-[140deg] inline-block right-3 top-1 relative",
    left: "rotate-[330deg] inline-block left-1 bottom-1 relative",
    down: "rotate-[230deg] inline-block right-3 bottom-2 relative",
    up: "rotate-[48deg] inline-block top-2 right-1 relative",
  },
  stylesColors: {
    blue: "filter: grayscale(100%) brightness(30%) sepia(100%) hue-rotate(-180deg) saturate(700%) contrast(0.8);",
    white: "filter: grayscale(100%);",
    purple:
      "filter: grayscale(100%) brightness(70%) sepia(50%) hue-rotate(-100deg) saturate(500%) contrast(1);",
    red: "filter: grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8);",
  },
  isAPolyanet(spanTag) {
    if (spanTag.innerText === "🪐") {
      return true;
    }
    return false;
  },
  isAnEmptyGalaxy(spanTag) {
    if (spanTag.innerText === "🌌") {
      return true;
    }
    return false;
  },
  isASoloons(spanTag) {
    if (spanTag.innerText === "🌕") {
      return true;
    }
    return false;
  },
  isACometh(spanTag) {
    if (spanTag.innerText === "☄️") {
      return true;
    }
    return false;
  },
  getPosition(tagClass) {
    if (!tagClass || tagClass === "") {
      return null;
    }
    return this.getKeyByValue(this.rotateClasses, tagClass);
  },
  getColor(style) {
    if (!style || style === "") {
      return null;
    }
    return this.getKeyByValue(this.stylesColors, style);
  },
  getMatrix(DivRows, matrix2d = false) {
    const matrix = [];
    for (let i = 0; i < DivRows.length; i++) {
      let divRow = DivRows[i];

      let spanCols = divRow.childNodes;
      if (matrix2d) {
        matrix.push(new Array(spanCols.length));
      }
      spanCols.forEach((span, j) => {
        if (matrix2d) {
          matrix[i][j] = span;
        } else {
          span.row = i;
          span.column = j;
          matrix.push(span);
        }
      });
    }
    return matrix;
  },
  getKeyByValue(object, value) {
    let ss = Object.keys(object).find(
      (key) =>
        object[key].replace(/[^A-Za-z0-9]/g, "") ===
        value.replace(/[^A-Za-z0-9]/g, "")
    );

    return ss;
  },
  parceAstralObject(rowCell) {
    let object = {
      row: null,
      cell: null,
      emoji: null,
      styles: [],
      name: null,
      candidateId,
    };

    if (this.isAPolyanet(rowCell)) {
      object.row = rowCell.row;
      object.column = rowCell.column;
      object.emoji = rowCell.innerText;
      object.name = "polyanets";
    } else if (this.isASoloons(rowCell)) {
      object.row = rowCell.row;
      object.column = rowCell.column;
      object.emoji = rowCell.innerText;
      object.name = "soloons";
      object.color = this.getColor(rowCell.firstElementChild.style.cssText);
    } else if (this.isACometh(rowCell)) {
      object.row = rowCell.row;
      object.column = rowCell.column;
      object.emoji = rowCell.innerText;
      object.name = "comeths";
      object.direction = this.getPosition(rowCell.firstElementChild.className);
    } else if (this.isAnEmptyGalaxy(rowCell)) {
      object.row = rowCell.row;
      object.column = rowCell.column;
      object.emoji = rowCell.innerText;
      object.name = "emptyGalaxy";
      object.direction = null;
      return false;
    }


    return object;
  },
  convertDomToMatrix(domdRef) {
    const htmlContainerRef = domdRef.current;

    const divRows = htmlContainerRef.getElementsByTagName("div");

    console.log("<divs> rows length", divRows.length);

    let matrix = this.getMatrix(divRows, false);

    console.log("ARRAY OF ASTRAL OBJECTS FROM WEB DOCUMENT-DOM");
    console.log(matrix);
    let matrixRequestsBody = this.toObjectApiBody(matrix);

    return matrixRequestsBody;
  },
  toObjectApiBody(matrix2d) {
    return matrix2d.map((rowCell) => {
      return this.parceAstralObject(rowCell);
    }).filter(object=> object);
  },
};

export default ParceLib;
