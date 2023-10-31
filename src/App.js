import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AiOutlineStar } from "react-icons/ai";
import "./App.css";
import image1 from "./images/image-1.webp";
import image2 from "./images/image-2.webp";
import image3 from "./images/image-3.webp";
import image4 from "./images/image-4.webp";
import image5 from "./images/image-5.webp";
import image6 from "./images/image-6.webp";
import image7 from "./images/image-7.webp";
import image8 from "./images/image-8.webp";
import image9 from "./images/image-9.webp";
import image10 from "./images/image-10.jpeg";
import image11 from "./images/image-11.jpeg";

const Image = ({
  id,
  src,
  isFeatured,
  onFeature,
  isSelected,
  onSelect,
  onDrag,
}) => {
  const [, ref] = useDrag({
    type: "IMAGE",
    item: { id },
  });

  const [, drop] = useDrop({
    accept: "IMAGE",
    hover: (draggedItem) => {
      if (draggedItem.id !== id) {
        onDrag(draggedItem.id, id);
        draggedItem.id = id;
      }
    },
  });

  return (
    <div
      ref={(node) => {
        ref(drop(node));
      }}
      className={`image ${isFeatured ? "featured" : ""} ${
        isSelected ? "selected" : ""
      }`}
    >
      <div className="image-actions">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(id)}
        />
      </div>
      <img src={src} alt={`Image ${id}`} />
    </div>
  );
};

function App() {
  const [images, setImages] = useState([
    { id: 1, src: image1, isFeatured: true, selected: false },
    { id: 2, src: image2, isFeatured: false, selected: false },
    { id: 3, src: image3, isFeatured: false, selected: false },
    { id: 4, src: image4, isFeatured: true, selected: false },
    { id: 5, src: image5, isFeatured: false, selected: false },
    { id: 6, src: image6, isFeatured: false, selected: false },
    { id: 7, src: image7, isFeatured: true, selected: false },
    { id: 8, src: image8, isFeatured: false, selected: false },
    { id: 9, src: image9, isFeatured: false, selected: false },
    { id: 10, src: image10, isFeatured: true, selected: false },
    { id: 11, src: image11, isFeatured: false, selected: false },
  ]);

  const [selectedImages, setSelectedImages] = useState([]);

  const handleFeature = (id) => {
    const updatedImages = images.map((img) => ({
      ...img,
      isFeatured: img.id === id,
    }));
    setImages(updatedImages);
  };

  const handleDrag = (fromId, toId) => {
    const updatedImages = [...images];
    const fromIndex = updatedImages.findIndex((img) => img.id === fromId);
    const toIndex = updatedImages.findIndex((img) => img.id === toId);

    const [draggedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, draggedImage);

    setImages(updatedImages);
  };

  const handleSelect = (id) => {
    const updatedImages = images.map((img) => {
      if (img.id === id) {
        return { ...img, selected: !img.selected };
      }
      return img;
    });

    setImages(updatedImages);
    const selectedImageIds = updatedImages
      .filter((img) => img.selected)
      .map((img) => img.id);
    setSelectedImages(selectedImageIds);
  };

  const handleDeleteSelected = () => {
    const updatedImages = images.filter(
      (img) => !selectedImages.includes(img.id)
    );
    setImages(updatedImages);
    setSelectedImages([]);
  };

  return (
    <div className="App">
      <div className="main">
        <div className="header">
          {selectedImages.length > 0 ? (
            <p>
              {" "}
              <input type="checkbox" checked />
              {selectedImages.length} Files Selected
            </p>
          ) : (
            <p>Gallery</p>
          )}
          <button onClick={handleDeleteSelected}>Delete files</button>
        </div>
        <hr />
        <DndProvider backend={HTML5Backend}>
          <div className="image-gallery">
            {images.map((image) => (
              <Image
                key={image.id}
                id={image.id}
                src={image.src}
                isFeatured={image.isFeatured}
                isSelected={image.selected}
                onSelect={handleSelect}
                onFeature={handleFeature}
                onDrag={handleDrag}
              />
            ))}
            <div className="add">
              <div className="upload">
                <img
                  src={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQydVTEC8nQaVwm9HYYu0huwr6Et3P5KyDdw&usqp=CAU"
                  }
                  alt="Your Image"
                  width={30}
                />
                <p>Add Images</p>
              </div>
            </div>
          </div>
        </DndProvider>
      </div>
    </div>
  );
}

export default App;
