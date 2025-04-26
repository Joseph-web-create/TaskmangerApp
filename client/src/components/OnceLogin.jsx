import { useState } from "react";
import Modal from "./Model";
import { useForm } from "react-hook-form";
import useTags from "../hooks/useTags";
import { Link } from "react-router";
import { useAuth } from "../store/store";
import { taskInput } from "../api/task";
import handleError from "../utils/handleError";
import { toast } from "sonner";

export default function OnceLogin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const { tags, setTags, handleTags, removeTag } = useTags();
  const { user, accessToken } = useAuth();

  const formSubmit = async (data) => {
    const formdata = {
      ...data,
      tags,
    };
    try {
      const res = await taskInput(formdata, accessToken);
      if (res.status === 201) {
        setIsModalOpen(false);
        toast.success(res.data.message);
        setTags([]);
        reset();
      }
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <div className="flex justify-evenly items-center gap-5">
      <>
        <div
          className=" flex gap-3 items-center p-2 cursor-pointer hover:font-bold hover:text-zinc-800 hover:transition duration-150 ease-out rounded-lg z-50 hover:bg-zinc-100"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="text-lg text-[#292929] font-bold">New task</span>
        </div>
        <Modal isOpen={isModalOpen} id="createPostModal" classname="max-w-xl">
          <p
            className="mb-6 text-2xl font-bold cursor-pointer"
            type="button"
            onClick={() => setIsModalOpen(false)}
          >
            {"< "}New Task
          </p>
          <form className="mt-4" onSubmit={handleSubmit(formSubmit)}>
            <div>
              <label className="floating-label">
                <span>Title</span>
                <input
                  type="text"
                  placeholder="Title"
                  id="title"
                  className="input input-md w-full"
                  {...register("title", { required: true })}
                />
              </label>
              {errors?.caption && (
                <span className="text-xs text-red-600">
                  Give your post a title
                </span>
              )}
            </div>
            <div className="my-6">
              <label className="floating-label">
                <span>Description</span>
                <textarea
                  placeholder="Description"
                  className="textarea textarea-md w-full"
                  id="description"
                  {...register("description")}
                ></textarea>
              </label>
            </div>
            <div className="my-6">
              <label className="floating-label">
                <span>Tags</span>
                <input
                  type="text"
                  className="input input-md w-full"
                  id="tags"
                  placeholder="Add Tags, press enter key to add a tag"
                  onKeyDown={handleTags}
                />
              </label>
            </div>
            <div className="flex flex-wrap gap-2 text-gray-400">
              {tags.map((tag, index) => (
                <div
                  className="badge badge-neutral gap-2 cursor-pointer "
                  key={index}
                  onClick={() => removeTag(index)}
                >
                  {tag}
                  <span className="text-[#974FD0]">
                    <i className="ri-close-line text-xl "></i>
                  </span>
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="btn bg-[#974FD0] text-white mt-4 w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sharing post..." : "Share"}
            </button>
          </form>
        </Modal>
      </>
      <>
        <div
          className=" flex gap-3 items-center p-2 cursor-pointer hover:font-bold hover:text-zinc-800 hover:transition duration-150 ease-out rounded-lg z-50 hover:bg-zinc-100"
          onClick={() => setIsModalOpen(true)}
        >
          <Link to="task" className="text-lg text-[#292929] font-bold">
            All Tasks
          </Link>
        </div>
      </>
      <>
        <div className="avatar avatar-placeholder">
          <div className="bg-neutral text-neutral-content w-12 rounded-full">
            <span>{user?.username?.charAt(0)}</span>
          </div>
        </div>
      </>
    </div>
  );
}
