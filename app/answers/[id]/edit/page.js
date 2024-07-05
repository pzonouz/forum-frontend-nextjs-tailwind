import EditAnswer from "@/app/components/EditAnswer";

const page = ({ params }) => {
  return <EditAnswer id={params["id"]} />;
};

export default page;
