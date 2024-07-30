import FilesSearch from "../components/FilesSearch";

const FilesPage = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}/files/collection/`);
  const files = await res.json();

  return <FilesSearch files={files} />;
};

export default FilesPage;
