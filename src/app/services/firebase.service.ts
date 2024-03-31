import { ref, uploadBytesResumable } from "@firebase/storage";
import storage from "../firebase.config";
import {
	FullMetadata,
	StorageError,
	deleteObject,
	getDownloadURL,
	getMetadata,
	listAll,
} from "firebase/storage";

export enum StorageType {
	AVATAR = "avatar",
	THUMBNAIL = "thumbnail",
}
export interface FirebaseUploadServiceParam {
	storageType: StorageType;
	file: File | undefined;
	fileName?: string;
	onSuccess?: (imgUrl: string) => void;
	onTask?: () => void;
	onFail?: (error: StorageError) => void;
}

export class FirebaseService {
	private static instance: FirebaseService;

	private constructor() {
		// Private constructor to prevent instantiation outside the class
	}

	public static getInstance(): FirebaseService {
		if (!FirebaseService.instance) {
			FirebaseService.instance = new FirebaseService();
		}
		return FirebaseService.instance;
	}

	public async upload(param: FirebaseUploadServiceParam) {
		if (!param.file) {
			return;
		}
		const fileName = param.fileName || param.file.name;
		await this.findUserAvatarAndDelete(fileName, param.storageType, );
		const storageRef = ref(storage, `${param.storageType}/${fileName}`);
		
		const uploadTask = uploadBytesResumable(storageRef, param.file);
		uploadTask.on(
			"state_changed",
			() => {
				if (param.onTask) {
					param.onTask();
				}
			},
			(error) => {
				if (param.onFail) {
					param.onFail(error);
				}
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					if (param.onSuccess) {
						param.onSuccess(downloadURL);
					}
				});
			}
		);
	}

	public getMetaData(
		fileName: string,
		storageType: StorageType
	): Promise<FullMetadata | null> {
		const fileRef = ref(storage, `${storageType}/${fileName}`);
		return getMetadata(fileRef)
			.then((metadata) => {
				return metadata;
			})
			.catch((error) => {
				return null;
			});
	}

	public delete(ref:any) {
		// Delete the file
		deleteObject(ref)
			.then(() => {
				// File deleted successfully
			})
			.catch((error) => {
				// Uh-oh, an error occurred!
			});
	}

	public findUserAvatarAndDelete(fileName: string, storageType: StorageType) {
		const imageRef = ref(storage, `${storageType}`);
		const match = fileName.match(/^([^_]+)/);
    const userId = match ? match[1] : fileName;
        
		listAll(imageRef)
			.then((res) => {
				// res.prefixes.forEach((folderRef) => {
				// 	// All the prefixes under listRef.
				// 	// You may call listAll() recursively on them.
				// });
				res.items.forEach((itemRef) => {
					if (itemRef.name.includes(userId)){
						this.delete(itemRef)
					}
				});
			})
			.catch((error) => {
				console.log(error);
				
			});
	}
}
