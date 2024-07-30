import FilesSearch from "../components/FilesSearch";

const FilesPage = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}/files/collection/`, {
    cache: "no-store",
  });
  const files = await res.json();

  return <FilesSearch files={files} />;
};

export default FilesPage;
