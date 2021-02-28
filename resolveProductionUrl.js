// ./resolveProductionUrl.js
const projectUrl = process.env.SANITY_STUDIO_PROJECT;
const previewSecret = process.env.SANITY_STUDIO_PROJECT_SECRET;

export default function resolveProductionUrl(document) {
  console.log('====================================');
  console.log(document);
  console.log('====================================');
    return `${projectUrl}/api/preview?secret=${previewSecret}&slug=${document.slug.current}`
  }