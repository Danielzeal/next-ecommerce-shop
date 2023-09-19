"use client";

import Form from "@/components/admin/AdminForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

type Props = {
  params: {
    id: string;
  };
};

const EditPage = ({ params }: Props) => {
  const { id } = params;
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(10);
  const [cat, setCat] = useState<string>("");
  const [imgFile, setImgFile] = useState<string>("");

  const router = useRouter();

  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const { data } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const res = await fetch(`/api/products/${id}`);

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      return res.json();
    },
  });

  useEffect(() => {
    if (data) {
      setTitle(data.title || "");
      setCat(data.cat || "Select...");
      setDescription(data.description || "");
      setPrice(data.price || 10);
    }
  }, [data]);

  const { mutate } = useMutation({
    mutationFn: async (data: EditProductDataType) => {
      await fetch("/api/products", {
        method: "PATCH",
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
      alert("product has been updated");
    },
    onError: () => {
      alert("Something went wrong");
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

    if (!title || !description || !price || !cat || !selectedSizes.length)
      return;

    mutate({ title, description, price, cat, imgFile, selectedSizes, id });
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

export default EditPage;
