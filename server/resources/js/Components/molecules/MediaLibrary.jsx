import React, { useEffect, useRef, useState } from "react";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import { LuUpload } from "react-icons/lu";
import { toast } from "sonner";

const MediaLibrary = ({ onConfirm }) => {
    const { auth } = usePage().props;
    const inputFileRef = useRef();
    const [activeTab, setActiveTab] = useState(1);
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    const handlerUpload = () => {
        if (inputFileRef) inputFileRef?.current?.click();
    };

    const handleChangeUpload = async (e) => {
        const file = e.target.files[0];

        if(file.size > 1024 * 1024) {
            alert("File size is too large. Please select a file less than 1MB.");
            return;
        }

        const formData = new FormData();
        formData.append("file",file);
        formData.append("role", "admin");
        formData.append("user_id", auth?.user?.id);

        try {
            const response = await axios.post("/api/media", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const newImages = [response?.data?.data, ...images]; 
            setImages(newImages);
            setActiveTab(2);
        } catch (error) {
            toast.error('Failed to upload media')
        }
    };

    const handleSelectedImage = (image) => {
        setSelectedImage(image);
    }

    useEffect(() => {
        const fetchData = () => {
            axios
                .get("/api/media")
                .then((response) => {
                    setImages(response?.data?.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        };

        fetchData();
    }, []);

    return (
        <div>
            <a
                id="media-opener"
                href="#mediaLibraryModal"
                className="fixed left-[-100%] opacity-0"
            >
                open modal
            </a>

            <div className="modal" role="dialog" id="mediaLibraryModal">
                <div className="w-11/12 max-w-5xl modal-box bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col h-[90vh]">
                    <div className="p-4 border-b border-gray-200">
                        <div
                            role="tablist"
                            className="flex space-x-2"
                        >
                            <button
                                onClick={() => setActiveTab(1)}
                                className={`px-4 py-2 ${
                                    activeTab === 1
                                        ? "border-b-2 border-black font-semibold"
                                        : "text-gray-500"
                                }`}
                            >
                                Upload New Media
                            </button>
                            <button
                                onClick={() => setActiveTab(2)}
                                className={`px-4 py-2 ${
                                    activeTab === 2
                                        ? "border-b-2 border-black font-semibold"
                                        : "text-gray-500"
                                }`}
                            >
                                Media Library
                            </button>
                        </div>
                    </div>
                    
                    <div className="flex-grow p-4 overflow-y-auto">
                        {activeTab === 1 ? (
                            <div className="flex flex-col items-center justify-center h-full space-y-4">
                                <LuUpload size={48} className="text-gray-400" />
                                <p className="text-lg text-gray-600">
                                    Drag and drop files here or click to upload
                                </p>
                                <button
                                    onClick={handlerUpload}
                                    className="px-4 py-2 text-white transition-colors bg-black rounded hover:bg-gray-800"
                                >
                                    Upload Media
                                </button>
                                <input
                                    ref={inputFileRef}
                                    type="file"
                                    className="fixed left-[-100%] opacity-0"
                                    onChange={handleChangeUpload}
                                />
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                {images?.map((image, i) => (
                                    <button
                                        onClick={() => handleSelectedImage(image)}
                                        key={`media ${i}`}
                                        className={`relative group overflow-hidden rounded-xl ${
                                            image.filename === selectedImage?.filename 
                                            ? 'ring-4 ring-black ring-offset-2' 
                                            : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-2'
                                        }`}
                                    >
                                        <img
                                            src={image?.url}
                                            alt=""
                                            className="object-cover w-full h-32 transition-all duration-300"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <div className="flex justify-end p-4 space-x-2 border-t border-gray-200">
                        <a href="#" className="px-4 py-2 text-black transition-colors bg-gray-100 rounded hover:bg-gray-200">
                            Close
                        </a>
                        <a
                        href="#"
                            onClick={() => {
                                if (onConfirm && selectedImage) onConfirm(selectedImage)
                            }}
                            disabled={selectedImage === null}
                            className={`px-4 py-2 text-white transition-colors rounded ${
                                selectedImage === null
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-black hover:bg-gray-800'
                            }`}
                        >
                            Select Media
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MediaLibrary;