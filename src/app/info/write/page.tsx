import React from 'react';

import {amIAdmin} from "@/api";
import {WriteArticlePage} from "@/app/info/write/content";

export default async function PageWrapper() {
  if (!(await amIAdmin())) {
    return <p>Недостаточно прав для просмотра этой страницы</p>
  }

  return <WriteArticlePage></WriteArticlePage>
}
