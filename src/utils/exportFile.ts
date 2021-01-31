import XLSX from 'xlsx';

interface Report {
  [key: string]: any;
}

const downloadFile = (output: string, fileName: string) => {
  const link = document.createElement('a');
  document.body.appendChild(link);
  link.download = fileName;
  link.href = output;
  link.click();
};

const objectToTable = (data: Report[]) => {
  // extract keys from the first object, will be the title for each column
  const colsHead = `<tr>${Object.keys(data[0])
    .map(key => `<td>${key}</td>`)
    .join('')}</tr>`;

  const colsData = data
    .map(obj => [
      `<tr>
                ${Object.keys(obj)
                  .map(col => `<td>${obj[col] ? obj[col] : ''}</td>`)
                  .join('')}
            </tr>`,
    ]) // 'null' values not showed
    .join('');

  return `<table>${colsHead}${colsData}</table>`.trim(); // remove spaces...
};

const objectToSemicolons = (data: Report[]) => {
  const colsHead = Object.keys(data[0])
    .map(key => [key])
    .join(';');
  const colsData = data
    .map(obj => [
      // obj === row
      Object.keys(obj)
        .map(col => [
          obj[col], // row[column]
        ])
        .join(';'), // join the row with ';'
    ])
    .join('\n'); // end of row

  return `${colsHead}\n${colsData}`;
};

const objectToColons = (data: Report[]) => {
  const colsHead = `${Object.keys(data[0])
    .map(position => (position ? `"${position}"` : ''))
    .join(',')}\r`;
  const colsData = data
    .map(obj => [
      // obj === row
      `${Object.keys(obj)
        .map(col => (obj[col] ? `"${obj[col]}"` : ''))
        .join(',')}\r`, // join the row with ';'
    ])
    .join('\n'); // end of row

  return `${colsHead}\n${colsData}`;
};

export const exportToXls = (data: Report[], fileName: string): void => {
  const TEMPLATE_XLS = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
        <meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"/>
        <head><!--[if gte mso 9]><xml>
        <x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{title}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml>
        <![endif]--></head>
        <body>{table}</body></html>`;
  const MIME_XLS = 'application/vnd.ms-excel;base64,';

  const parameters: { [key: string]: string } = {
    table: objectToTable(data),
  };
  const computeOutput = TEMPLATE_XLS.replace(
    /{(\w+)}/g,
    (x, y: string) => parameters[y],
  );

  const computedXLS = new Blob([computeOutput], {
    type: MIME_XLS,
  });
  const xlsLink = window.URL.createObjectURL(computedXLS);
  downloadFile(xlsLink, fileName);
};

export const exportToCSVSemicolon = (
  data: Report[],
  fileName: string,
): void => {
  const computedCSV = new Blob([objectToSemicolons(data)], {
    type: 'text/csv;charset=utf-8',
  });
  const csvLink = window.URL.createObjectURL(computedCSV);
  downloadFile(csvLink, fileName);
};

export const exportToCSVColon = (data: Report[], fileName: string): void => {
  const computedCSV = new Blob([objectToColons(data)], {
    type: 'text/csv;charset=utf-8',
  });
  const csvLink = window.URL.createObjectURL(computedCSV);
  downloadFile(csvLink, fileName);
};

export const exportToXlsx = (data: any[], fileName: string) => {
  const binaryWS = XLSX.utils.json_to_sheet(data);
  const workBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, binaryWS, 'Documentos enviados');
  return XLSX.writeFile(workBook, fileName);
};
