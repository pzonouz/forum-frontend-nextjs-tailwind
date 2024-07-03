import DeleteQuestion from "@/app/components/DeleteQuestion";

const page = ({ params }) => {
  return <DeleteQuestion id={params["id"]} />;
};

export default page;
