import React, { useState, useCallback } from "react"
import ImageViewer from "react-simple-image-viewer";

export default function ImageReader({ images }) {
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    // console.log(images)
    // const images = [
    //     "http://placeimg.com/1200/800/nature",
    //     "http://placeimg.com/800/1200/nature",
    //     "http://placeimg.com/1920/1080/nature",
    //     "http://placeimg.com/1500/500/nature"
    // ];

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    return (
        <div className=" h-full -mt-1 overflow-x-scroll overflow-y-hidden scrollbar-hidden">
            <div className="flex gap-2  h-full m-1 p-1">
                {images.map((src, index) => (
                    <img
                        src={src}
                        onClick={() => openImageViewer(index)}
                        className=" min-w-[50px] w-[50px] h-full object-cover cursor-pointer"
                        key={index}
                        alt=""
                    />
                ))}
            </div>

            {isViewerOpen && (
                <ImageViewer
                    src={images}
                    currentIndex={currentImage}
                    onClose={closeImageViewer}
                    disableScroll={false}
                    backgroundStyle={{
                        backgroundColor: "rgba(0,0,0,0.9)"
                    }}
                    closeOnClickOutside={true}
                />
            )}
        </div>
    );
}
