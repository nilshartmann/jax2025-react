"use client";

import ky from "ky";
import { useState } from "react";
import { CardDto } from "@/types";
import ImageChooser from "@/components/ImageChooser";
import Card from "@/components/Card";

export default function CardEditor() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageSelected = (name: string) => {
    const newSelected = name === selectedImage ? null : name;
    setSelectedImage(newSelected);
  };

  const handleSaveClick = async () => {
    console.log("SAVING", title, message, selectedImage);
    const r = await ky
      .post("http://localhost:7100/cards", {
        json: { title, message, image: selectedImage },
      })
      .json();

    const x = CardDto.safeParse(r);
    console.log(x);
  };

  return (
    <div className={"CardEditor"}>
      <form>
        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        {title.length < 4 && (
          <p>Please enter a longer title. Current length: {title.length}</p>
        )}
        <label>
          Message
          <input value={message} onChange={(e) => setMessage(e.target.value)} />
        </label>

        <label>Image</label>
        <ImageChooser
          selectedImage={selectedImage}
          onSelectedImageChange={handleImageSelected}
        />

        <button
          disabled={
            title.length === 0 || message.length === 0 || selectedImage === null
          }
          onClick={handleSaveClick}
          type={"button"}
        >
          Save
        </button>
      </form>

      {/*<Card*/}
      {/*  title={title}*/}
      {/*  message={message}*/}
      {/*  image={selectedImage || "placeholder.png"}*/}
      {/*/>*/}
    </div>
  );
}
