"use client";

import { app } from "@/util/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type Prop = {
  setImgFile: Dispatch<SetStateAction<string>>;
};

const storage = getStorage(app);

const ImageFile = ({ setImgFile }: Prop) => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    if (file) {
      const upload = async () => {
        const fileName = new Date().getTime + file.name;
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImgFile(downloadURL);
            });
          }
        );
      };
      upload();
    }
  }, [file, setImgFile]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files as FileList;
    setFile(selectedImage[0]);
  };

  return (
    <label htmlFor='image'>
      Image <br />
      <input
        type='file'
        name='image'
        id='image'
        onChange={handleChange}
        className='border-2 p-3 rounded-md w-full'
      />{" "}
      <br />
      {progress && progress === 100 && <span>Image uploaded successfully</span>}
    </label>
  );
};

export default ImageFile;
