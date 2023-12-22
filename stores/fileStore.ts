import { defineStore } from "pinia";
import Papa from 'papaparse'
import type Response from "~/types/Response";

export const useFileStore = defineStore('files', () => {
    async function uploadFile(file: File): Promise<void> {
        let response:Response
        //Parse the CSV file to an array and send to the server
        Papa.parse(file, {
            complete: async (result) => {
                response = await useFetch('/api/uploadFile', {
                    method: "POST",
                    body: { dataArray: result.data }
                })
                alert(response.status.value)
            }
        })

        //For Excel File uploading.....

        // const formData = new FormData();
        // formData.append('excelFile', file);
        // const response:Response = await useFetch('/api/uploadFile', {
        //   method: "POST",
        //   body: formData
        // })
        // alert(response.status.value)

    }

    async function downloadFile(): Promise<void> {
        //fetch file from the server as an buffer array and converting it to a blob and generate a download url
        const response:Response = await useFetch('/api/downloadFile')
        if (!response.data.value){
            alert("Couldn't fetch data from server!")
            return
        }
        const bufferArray = response.data.value.dataBuffer.data
        const uint8Array = new Uint8Array(bufferArray)
        const blob = new Blob([uint8Array], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        const url = URL.createObjectURL(blob)

        // creating a html anchor tag and clicking it to download the file to the client 
        const link = document.createElement('a')
        link.href = url
        link.download = "download.xlsx"
        link.click()
        URL.revokeObjectURL(link.href)
    }

    return { uploadFile, downloadFile }
})