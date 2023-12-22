import { prisma } from '../prisma/client'
import type Product from '~/types/Product'

export const addProducts = async (productArr:string[]):Promise<void> => {
    // Following code is for csv file..........................
    const product=productArr.slice(1)
    const json:Product[] = []
    product.forEach(async product => {
        json.push({
            id: product[0],
            name: product[1]
        })
    });
    await prisma.product.createMany({data:json})

    // Following code is for excel file........................

    // const json = []
    // product.forEach(async product => {
    //     json.push({
    //         id: product['Product ID'],
    //         name: product['Product Name']
    //     })
    // });
    // await prisma.product.createMany({data:json})
}

export const getProducts = async ():Promise<Product[]> => {
    const products = await prisma.product.findMany()
    return products
}
