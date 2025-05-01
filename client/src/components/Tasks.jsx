import useEdit from "../hooks/edit";

export default function Tasks({ items }) {
  const { handleEdit, edit } = useEdit();
  console.log(edit);

  return (
    <div className="border-1 rounded-lg border-[#B8B6B6] mb-4 py-6 px-2">
      <div className="flex justify-between items-center  px-2">
        <div className="flex flex-wrap gap-2 items-center">
          {items?.tags?.length === 0 ? (
            <h2>No Tag</h2>
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
            <i class="ri-edit-box-line"></i>Edit
          </button>
          <button className="btn btn-ghost border-[#974FD0] text-[#974FD0]">
            <i class="ri-delete-bin-line"></i>Delete
          </button>
        </div>
      </div>
      <div className="divider mt-0"></div>
      <h1 className="text-xl text-[#292929] mb-2 font-semibold">
        {items?.title}
      </h1>
      <p>{items?.description}</p>
    </div>
  );
}
