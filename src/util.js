import { format } from "date-fns";

export function parseVisit(fileContent) {
  const [headerLine, ...lines] = fileContent.split("\n");
  const headers = headerLine.split(",");

  let arrPatients = lines.map(
    (line) =>
      (line = line.split(",").reduce(
        (object, value, index) => ({
          ...object,
          [headers[index]]: value,
        }),
        {}
      ))
  );

  let cleanArrPatients = [];
  for (let p in arrPatients) {
    if (arrPatients[p].Name !== "") {
      let temp = arrPatients[p];
      if (temp.EOB === "Waiting EOB") {
        arrPatients[p].EOB = false;
      } else {
        arrPatients[p].EOB = true;
      }
      cleanArrPatients.push(arrPatients[p]);
    }
  }

  return cleanArrPatients;
}

export function saveFileToCsv(visits, isReport) {
  let newVisits = [];
  if (isReport) {
    newVisits = sortByDate(visits);
  } else {
    newVisits = visits;
  }

  function writeHeader() {
    let header = [];
    if (!isReport) {
      header = [
        "Name",
        "DOB",
        "From",
        "To",
        "Service",
        "CPT",
        "ICD",
        "Loc",
        "Agency",
        "Provider",
        "Units",
        "Fee",
        "Payor",
        "EOB",
        "Comments",
      ];
    } else {
      header = [
        "Name",
        "DOB",
        "From",
        "To",
        "Service",
        "CPT",
        "ICD",
        "Loc",
        "Agency",
        "Provider",
        "Units",
        "Fee",
        "Payor",
        "Comments",
      ];
    }
    const result = header.join(",") + "\n";
    return result;
  }

  function calculateTotalCompensation() {
    let result = 0;
    newVisits.forEach((value) => {
      if ((isReport && value.EOB) || !isReport) {
        let cleanFee = value.Fee.replace("$", "");
        result += parseFloat(cleanFee);
      }
    });
    return result;
  }

  function writeFooter() {
    let footer = [];
    if (!isReport) {
      footer = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "Total",
        "$" + calculateTotalCompensation() + ",",
        "",
        "",
        "",
      ];
    } else {
      footer = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "Total",
        "$" + calculateTotalCompensation() + ",",
        "",
        "",
      ];
    }
    const result = footer.join(",") + "\n";
    return result;
  }

  function writeRows() {
    let result = "";
    newVisits.forEach((value) => {
      if (isReport && value.EOB) {
        result += value.Name + ",";
        result += value.DOB + ",";
        result += value.From + ",";
        result += value.To + ",";
        result += value.Service + ",";
        result += value.CPT + ",";
        result += value.ICD + ",";
        result += value.Loc + ",";
        result += value.Agency + ",";
        result += value.Provider + ",";
        if (value.Service === "NESF") {
          result += "1.00" + ",";
        } else if (value.Units === "3") {
          result += value.Units + " units/45minutes" + ",";
        } else {
          result += value.Units + " units/1hour" + ",";
        }

        result += !value.Fee.includes("$")
          ? "$" + value.Fee + ","
          : value.Fee + ",";
        result += value.Payor + ",";
        result += value.Comments ? value.Comments : "";
        result += "\n";
      } else if (!isReport) {
        result += value.Name + ",";
        result += value.DOB + ",";
        result += value.From + ",";
        result += value.To + ",";
        result += value.Service + ",";
        result += value.CPT + ",";
        result += value.ICD + ",";
        result += value.Loc + ",";
        result += value.Agency + ",";
        result += value.Provider + ",";
        result += value.Units + ",";
        result += value.Fee + ",";
        result += value.Payor + ",";
        if (value.Service !== "NESF" || value.Service !== "ST Consult")
          result += value.EOB ? "Received EOB" + "," : "Waiting EOB" + ",";
        result += value.Comments ? value.Comments : "";
        result += "\n";
      }
    });
    return result;
  }

  let output = "";
  output += writeHeader();
  output += writeRows();
  output += writeFooter();
  return output;
}

export function formatDate(today) {
  return format(today, "MM/dd/yyyy");
}

export function sortByDate(data) {
  let dataCopy = [...data];
  let sortedVisits = dataCopy.sort(function compare(a, b) {
    var dateA = new Date(a.From);
    var dateB = new Date(b.From);
    return dateA - dateB;
  });
  return sortedVisits;
}

export function sortByName(data) {
  data.sort(function(a, b) {
    if (a.firstname < b.firstname) {
      return -1;
    }
    if (a.firstname > b.firstname) {
      return 1;
    }
    return 0;
  });
  let dataCopy = [...data];
  let sortedVisits = dataCopy.sort((a, b) => a.Name.localeCompare(b.Name));
  return sortedVisits;
}
