import { useEffect, useState } from "react";
import Modal from "./Model";
import { useForm } from "react-hook-form";

export default function Tasks({ items }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [edit, setEdit] = useState();

  useEffect(() => {
    if (edit) {
      reset(edit);
    }
  }, [edit, reset]);

  const handleEdit = (item) => {
    setEdit(item);
    openModal();
  };

  const formSubmit = (e) => {
    const { title, description, tags, _id } = e;
    const formdata = {
      title,
      description,
      tags,
      _id,
    };
    console.log(formdata);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <>
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
                  {...register("title")}
                />
              </label>
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
                  {...register("tags")}
                />
              </label>
            </div>
            <div className="flex flex-wrap gap-2 text-gray-400"></div>
            <button
              type="submit"
              className="btn bg-[#974FD0] text-white mt-4 w-full"
            >
              {isSubmitting ? "Sharing post..." : "Share"}
            </button>
          </form>
        </Modal>
      </>
      <div className="border-1 rounded-lg border-[#B8B6B6] mb-4 py-6 px-2">
        <div className="flex justify-between items-center  px-2">
          <div className="flex flex-wrap gap-2 items-center">
            {items?.tags?.length === 0 ? (
              <h2 className="font-semibold text-cyan-500">No Tag</h2>
            ) : (
              items?.tags?.map((item, index) => {
                let color = "";

                if (item.toLowerCase() === "important") {
                  color = "#73C3A6";
                } else if (item.toLowerCase() === "urgent") {
                  color = "#FF5B5B";
                } else {
                  color = "#8d8ed0";
                }

                return (
                  <span
                    key={index}
                    className="text-2xl font-semibold"
                    style={{ color }}
                  >
                    {item}
                  </span>
                );
              })
            )}
          </div>
          <div className="flex gap-2">
            <button
              className="btn btn-ghost text-white bg-[#974FD0] rounded-sm px-4"
              onClick={() => handleEdit(items)}
            >
              <i className="ri-edit-box-line"></i>Edit
            </button>
            <button className="btn btn-ghost border-[#974FD0] text-[#974FD0]">
              <i className="ri-delete-bin-line"></i>Delete
            </button>
          </div>
        </div>
        <div className="divider mt-0"></div>
        <h1 className="text-xl text-[#292929] mb-2 font-semibold">
          {items?.title}
        </h1>
        <p>{items?.description}</p>
      </div>
    </>
  );
}
