interface Work {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: {
    fieldId: string;
    text_ja: string;
    text_en: string;
  };
  slug: string;
  ogpImage: {
    url: string;
    height: number;
    width: number;
  };
  category: string[];
  year: number;
  appendix: any;
  page: Page[];
  credit: {
    fieldId: string;
    content_ja: string;
    content_en: string;
  };
  outline: {
    fieldId: string;
    content_ja?: string;
    content_en?: string;
  };
}
