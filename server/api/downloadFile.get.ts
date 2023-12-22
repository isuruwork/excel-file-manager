import { getProducts } from "~/services/dbHandler";
import { createExcelFile } from "~/services/excelFileHandler";

export default defineEventHandler(async (e) => {
    const products= await getProducts();
    const excelFile=createExcelFile(products);
    return excelFile
})

