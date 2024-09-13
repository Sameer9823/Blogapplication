import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index"; // Assuming you have these custom components
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [loading, setLoading] = useState(false); // Loading state for submissions

    // Handle form submission for both create and update post scenarios
    const submit = async (data) => {
        setLoading(true); // Start loading
        try {
            // Handle file upload if an image is provided
            const file = data.image?.[0] ? await appwriteService.uploadFile(data.image[0]) : null;
            let postResponse;

            if (post) {
                // Update existing post
                if (file) {
                    // Delete the old image if a new one is uploaded
                    await appwriteService.deleteFile(post.featuredImage);
                }
                postResponse = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage,
                });
            } else {
                // Create new post
                if (!userData || !userData.$id) {
                    throw new Error("User not logged in. Please log in to create a post.");
                }

                if (file) {
                    postResponse = await appwriteService.createPost({
                        ...data,
                        featuredImage: file.$id,
                        userId: userData.$id,
                    });
                } else {
                    postResponse = await appwriteService.createPost({
                        ...data,
                        userId: userData.$id,
                    });
                }
            }

            if (postResponse && postResponse.$id) {
                navigate(`/post/${postResponse.$id}`);
            }
        } catch (error) {
            console.error("Error submitting post:", error.message);
            alert(error.message); // Notify the user of the error
        } finally {
            setLoading(false); // Stop loading
        }
    };

    // Function to transform title into slug
    const slugTransform = useCallback((value) => {
        return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s+/g, "-");
    }, []);

    // Update slug dynamically when title changes
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-full md:w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: "Title is required" })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>

            <div className="w-full md:w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />

                {post && post.featuredImage && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg w-full h-auto"
                        />
                    </div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />

                <Button type="submit" bgColor={post ? "bg-green-500" : "bg-blue-500"} className="w-full">
                    {loading ? "Submitting..." : post ? "Update Post" : "Create Post"}
                </Button>
            </div>
        </form>
    );
}
