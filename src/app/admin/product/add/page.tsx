"use client";

import Form from "@/components/admin/AdminForm";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const AddProduct = () => {
  const { data: authUser, status } = useSession();
  
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(10);
  const [cat, setCat] = useState<string>("");
  const [imgFile, setImgFile] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    if (!authUser?.user.isAdmin || status !== "authenticated") {
      router.push("/login");
    }
  }, [router, authUser, status]);

  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const { mutate } = useMutation({
    mutationFn: async (data: AddProductDataType) => {
      await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
      });
    },
    onSuccess: () => {
      setTitle("");
      setDescription("");
      setPrice(10);
      setCat("");
      setSelectedSizes([]);
      alert("product added");
    },
    onSettled: () => {
      router.push("/admin");
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedSizes((prevSelectedItems) => [...prevSelectedItems, value]);
    } else {
      setSelectedSizes((prevSelectedItems) =>
        prevSelectedItems.filter((item) => item !== value)
      );
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !title ||
      !description ||
      !price ||
      !cat ||
      !imgFile ||
      !selectedSizes.length
    )
      return;

    mutate({ title, description, price, cat, imgFile, selectedSizes });
  };

  return (
    <Form
      title={title}
      price={price}
      description={description}
      selectedSizes={selectedSizes}
      setTitle={setTitle}
      setDescription={setDescription}
      setPrice={setPrice}
      setCat={setCat}
      cat={cat}
      setImgFile={setImgFile}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default AddProduct;
