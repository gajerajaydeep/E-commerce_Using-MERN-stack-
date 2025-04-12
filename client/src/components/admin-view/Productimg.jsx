import React, { useEffect, useRef } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';
import { Skeleton } from '../ui/skeleton';

export default function ProductImg({
    imageFile,
    setImageFile,
    imageLoadingState,
    uploadedImageUrl,
    setUploadedImageUrl,
    setImageLoadingState,
    isEditMode,
}) {
    const inputRef = useRef(null);

    function handleImageFileChange(event) {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setImageFile(selectedFile);
        }
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDrop(event) {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files?.[0];
        if (droppedFile) {
            setImageFile(droppedFile);
        }
    }

    function handleRemoveImage() {
        setImageFile(null);
        setUploadedImageUrl(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    useEffect(() => {
        async function uploadImageToCloudinary() {
            if (!imageFile) return;
            setImageLoadingState(true);

            try {
                const data = new FormData();
                data.append('my_file', imageFile);
                
                const response = await axios.post('http://localhost:5000/api/admin/products/upload-image', data);
                
                if (response.data?.success) {
                    setUploadedImageUrl(response.data.result.url);
                } else {
                    console.error("Image upload failed:", response.data);
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            } finally {
                setImageLoadingState(false);
            }
        }

        if (imageFile) {
            uploadImageToCloudinary();
        }
    }, [imageFile, setUploadedImageUrl, setImageLoadingState]);

    return (
        <div className="w-full max-w-md mx-auto mt-4">
            <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
            <div onDragOver={handleDragOver} onDrop={handleDrop} className={`border-2 border-dashed rounded-lg p-4 ${isEditMode ? 'opacity-50' : ''}`}>
                <Input
                 id='image-upload'
                  type="file"
                   className="hidden"
                    ref={inputRef}
                     onChange={handleImageFileChange}
                     disabled={isEditMode}
                     />

                {
                    !imageFile ? (
                        <Label
                         htmlFor="image-upload" className={`${isEditMode ? 'cursor-not-allowed' : ''} flex flex-col items-center justify-center h-32 cursor-pointer`}>
                            <UploadCloudIcon className='w-10 h-10 text-muted-foreground mb-2' />
                            <span>Drag & Drop or Click to upload Image</span>
                        </Label>
                    ) : (
                        imageLoadingState ? (
                            <Skeleton className='h-10 bg-gray-100' />
                        ) : (
                            <div className='flex items-center justify-center'>
                                <div className='flex items-center'>
                                    <FileIcon className='w-7 h-7 text-primary mr-2 ' />
                                </div>
                                <p className='text-sm font-medium'>{imageFile.name}</p>
                                <Button variant="ghost" size='icon' className="text-muted-foreground hover:text-foreground" onClick={handleRemoveImage}>
                                    <XIcon className='w-4 h-4 ' />
                                    <span className='sr-only'>Remove File</span>
                                </Button>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    );
}
