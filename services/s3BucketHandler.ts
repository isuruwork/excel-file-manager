import { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command, type PutObjectCommandOutput } from "@aws-sdk/client-s3";
import { config } from "dotenv";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type S3Object from "~/types/s3Object";
config()

const bucket = "sample-excel-files"

export const uploadFiletoS3 = async (file: any): Promise<PutObjectCommandOutput> => {
    const client = new S3Client({
        region: 'us-east-1',
        credentials: {
            accessKeyId: process.env.accessKeyId || '',
            secretAccessKey: process.env.secretAccessKey || '',
            sessionToken: process.env.sessionToken || ''
        },
    });

    const input = {
        "Body": file.data,
        "Bucket": bucket,
        "Key": file.filename,
    };

    const command = new PutObjectCommand(input);
    const response = await client.send(command);
    return response
}

export const getFiles = async (): Promise<S3Object[] | null> => {
    const client = new S3Client({
        region: 'us-east-1',
        credentials: {
            accessKeyId: process.env.accessKeyId || '',
            secretAccessKey: process.env.secretAccessKey || '',
            sessionToken: process.env.sessionToken || ''
        },
    });


    const listObjectscommand = new ListObjectsV2Command({ Bucket: bucket })
    const response = await client.send(listObjectscommand)
    if (response.Contents == null) {
        return null
    }
    const fileList = response.Contents.map(async (item) => {
        const command = new GetObjectCommand({ Bucket: bucket, Key: item.Key });
        const url = await getSignedUrl(client, command, { expiresIn: 3600 });
        return { fileName: item.Key, url }
    }
    )
    const resolvedFileList = await Promise.all(fileList);
    return resolvedFileList
}


