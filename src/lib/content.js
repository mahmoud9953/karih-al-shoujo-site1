
import fg from 'fast-glob';

export async function getAllNovels() {
  const dirs = await fg('src/content/novels/*', { onlyDirectories: true });
  return dirs.map(d => d.split('/').pop());
}

export async function getChapters(slug) {
  const files = await fg(`src/content/novels/${slug}/*.md`, { dot: false });
  const chapters = [];
  for (const file of files) {
    const mod = await import('../../' + file.replace('src/', 'src/'));
    // Note: importing markdown in Astro returns { frontmatter, compiledContent() }
    chapters.push({ file, ...mod.frontmatter });
  }
  chapters.sort((a,b)=> (a.chapter||0) - (b.chapter||0));
  return chapters;
}
