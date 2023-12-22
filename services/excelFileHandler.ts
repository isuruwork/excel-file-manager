import ExcelJS from 'exceljs';

export const readExcelFile = async (data) => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(data)
    const worksheet = workbook.getWorksheet(1)
    const headers = worksheet.getRow(1).values.slice(1)

    const json = [];

    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber == 1) {
            return
        }
        const rowObject = {};
        row.eachCell((cell, colNumber) => {
            rowObject[headers[colNumber - 1]] = cell.value
        })
        json.push(rowObject)
    })
    console.log(json)
    return json
}

export const createExcelFile = async (data) => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Sheet 1');
    sheet.columns = [
        { header: 'Product ID', key: 'id' },
        { header: 'Product Name', key: 'name' }
    ]
    sheet.addRows(data)
    const dataBuffer = await workbook.xlsx.writeBuffer();
    return { dataBuffer }
}


