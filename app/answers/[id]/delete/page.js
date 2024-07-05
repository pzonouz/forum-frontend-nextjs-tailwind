import DeleteAnswer from "@/app/components/DeleteAnswer";

const page = ({ params }) => {
  return <DeleteAnswer id={params["id"]} />;
};

export default page;
