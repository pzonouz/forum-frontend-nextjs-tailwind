"use client";

import { useViewUpQuestionQuery } from "../redux_toolkit/consumeAPI";

const ViewUpQuestion = (props) => {
  const { id } = props;
  useViewUpQuestionQuery(id);
  return null;
};

export default ViewUpQuestion;
