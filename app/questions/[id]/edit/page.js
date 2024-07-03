import EditQuestion from "@/app/components/EditQuestion";

const page = ({ params }) => {
  return <EditQuestion id={params["id"]} />;
};

export default page;
