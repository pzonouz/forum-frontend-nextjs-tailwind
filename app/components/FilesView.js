import FileView from "./FileView";

const FilesView = async (props) => {
  const { searchField, searchFieldValue, classes = "" } = props;
  let files = [];
  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}files/?search_field=${searchField}&search_field_value=${searchFieldValue}`,
    );
    files = await res.json();
  } catch (error) {}
  return (
    <div className={classes}>
      <div className="flex gap-2 items-center">
        {files?.map((file, index) => (
          <FileView key={file?.id} file={file} index={index} />
        ))}
      </div>
    </div>
  );
};

export default FilesView;
