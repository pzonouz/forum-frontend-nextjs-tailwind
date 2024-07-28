"use client";

import ErrorComponent from "@/app/components/ErrorComponent";

const error = (props) => {
  return <ErrorComponent error={props?.error?.message} />;
};

export default error;
