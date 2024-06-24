import { UploadFileProps, DownloadFileProps } from "@/types/files";
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";

// Create a root reference
const storage = getStorage();
const storageRef = (folder: string, fileName: string) =>
    ref(storage, `coupons/${folder}/${fileName}`);

const storageRefProfile = (
    reference: string,
    folder: string,
    fileName: string,
) => ref(storage, `${reference}Photos/${folder}/${fileName}`);

export const uploadFiles = async ({
    folder,
    fileName,
    file,
}: UploadFileProps) => {
    // 'file' comes from the Blob or File API
    return uploadBytes(storageRef(folder, fileName), file);
};

export const uploadFile = async ({
    folder,
    fileName,
    file,
    reference,
}: UploadFileProps) => {
    // 'file' comes from the Blob or File API
    await uploadBytes(storageRefProfile(reference, folder, fileName), file);
    
    return await getDownloadURL(storageRefProfile(reference, folder, fileName));
};

export const urlFile = async ({
    folder,
    fileName,
    reference,
}: DownloadFileProps) => {
    return getDownloadURL(storageRefProfile(reference, folder, fileName));
};

export const deleteUrlFile = async ({
    folder,
    fileName,
    reference,
}: DownloadFileProps) => {
    return deleteObject(storageRefProfile(reference, folder, fileName));
};
