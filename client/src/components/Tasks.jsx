export default function Tasks({ tags, title, description }) {
  
  return (
    <div className="border-1 rounded-lg border-[#B8B6B6] mb-4 py-6 px-2">
      <div className="flex justify-between items-center  px-2">
        <div className="flex flex-wrap gap-2 items-center">
          {tags?.length === 0 ? (
            <h2>No Tag</h2>
          ) : (
            tags?.map((item, index) => {
              let color = "";

              if (item.toLowerCase() === "important") {
                color = "#73C3A6";
              } else if (item.toLowerCase() === "urgent") {
                color = "#FF5B5B";
              } else {
                color = "";
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
        <div>
          <button className="btn btn-ghost">Edit</button>
          <button className="btn btn-ghost">Delete</button>
        </div>
      </div>
      <div className="divider mt-0"></div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
