import { uploadFiletoS3 } from "~/services/s3BucketHandler"
import { readExcelFile } from "../../services/excelFileHandler"
import { addProducts } from "../../services/dbHandler"
    
export default defineEventHandler(async (e) => {

    //Following code is for excel file adding...............

    // const [file] = await readMultipartFormData(e)
    // const res=await uploadFiletoS3(file)
    // const products=await readExcelFile(file.data)
    // addProducts(products)

    //Following code is for CSV file adding..................
    
    const body=await readBody(e)
    const products=body.dataArray
    addProducts(products)
})


