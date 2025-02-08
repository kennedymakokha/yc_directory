'use client'

import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';

type CarouselProps = {
    images: string[];
    autoScrollInterval?: number; // You can pass the auto-scroll interval (in milliseconds)
};

const ImageCarousel: React.FC<CarouselProps> = ({ images, autoScrollInterval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false); // To track hover state
    const intervalRef = useRef<NodeJS.Timeout | null>(null); // To store the interval ID

    // Change image index to the next one
    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Change image index to the previous one
    const prevImage = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length
        );
    };

    // Start the auto-scrolling
    const startAutoScroll = () => {
        if (!intervalRef.current) {
            intervalRef.current = setInterval(nextImage, autoScrollInterval);
        }
    };

    // Stop the auto-scrolling
    const stopAutoScroll = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    // Start auto-scrolling when the component mounts
    useEffect(() => {
        startAutoScroll();
        return () => stopAutoScroll(); // Clean up interval on component unmount
    }, []);

    // Only start auto-scrolling when not hovered
    useEffect(() => {
        if (!isHovered) {
            startAutoScroll();
        } else {
            stopAutoScroll();
        }
    }, [isHovered]);

    return (
        <div
            className="relative w-full h-auto rounded-xl "
            onMouseEnter={() => setIsHovered(true)} // Stop scrolling on hover
            onMouseLeave={() => setIsHovered(false)} // Resume scrolling after hover
        >
            <div className="relative overflow-hidden rounded-lg">
                <Image width={300} height={600}
                    src={images[currentIndex]}
                    alt={`carousel-image-${currentIndex}`}
                    className="w-full h-[600px] object-fit transition-all duration-500"
                />
            </div>

            {/* Prev Button */}
            <button
                onClick={prevImage}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full focus:outline-none"
            >
                &#60;
            </button>

            {/* Next Button */}
            <button
                onClick={nextImage}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full focus:outline-none"
            >
                &#62;
            </button>

            {/* Indicators */}

            {/* <div className=" bottom-20  w-auto h-24 relative z-12"> */}
                {/* <div className="absolute w-full  left-1/2 bottom-4 flex justify-center items-center z-10  transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                        <div className={` size-20 flex items-center justify-center p-1 ${currentIndex === index ? 'bg-blue-500' : 'bg-gray-500'}`} key={index}>
                            <span

                                className={`size-20 border-2 border rounded-md ${currentIndex === index ? 'border-blue-500' : 'border-gray-500'
                                    }`}
                            >
                                <Image width={100} height={100}
                                    src={_}
                                    alt={`carousel-image-${currentIndex}`}
                                    className="w-full h-full object-fit transition-all duration-500"
                                />
                            </span>
                        </div>

                    ))}
                </div> */}
                {/* <div className="absolute inset-0 w-full flex justify-center bg-primary  opacity-20 items-center z-12">

                </div> */}
            {/* </div> */}

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                        <span
                            key={index}
                            className={`h-10 w-10 border-2 border rounded-md ${currentIndex === index ? 'border-blue-500' : 'border-gray-500'
                                }`}
                        >
                            <Image width={100} height={100}
                                src={_}
                                alt={`carousel-image-${currentIndex}`}
                                className="w-full h-full object-fit transition-all duration-500"
                            />
                        </span>
                    ))}
                </div>

            </div>

        // </div>
    );
};

export default ImageCarousel;
