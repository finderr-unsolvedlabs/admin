import Head from "next/head";
import { title } from "process";
import React from "react";

type Props = {
  pageTitle: string;
  metaTitle: string;
  description: string;
  ogImage: string;
  fullPageUrl: string;
};

function LandingPageSEO({
  pageTitle,
  metaTitle,
  description,
  ogImage,
  fullPageUrl,
}: Props) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    name: title,
    description: description,
    image: ogImage,
    url: fullPageUrl,
  };

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />

      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={fullPageUrl} />

      <link rel="canonical" href={fullPageUrl} />

      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>
    </Head>
  );
}

export { LandingPageSEO };
