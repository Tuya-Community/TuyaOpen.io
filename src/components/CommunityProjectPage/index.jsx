import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import TutorialShell from '@site/src/components/TutorialShell';
import { tutorials } from '@site/src/data/tutorials';

/* =========================================================================
 * CommunityProjectPage — unified renderer for /learn community project pages
 * -------------------------------------------------------------------------
 * Every community project (kind: 'markdown', category: 'community') renders
 * through this component. The per-project chrome — title, subtitle, meta —
 * lives in the manifest (src/data/tutorials.js), looked up by `id`. Each route
 * file (src/pages/learn/<id>.jsx) is therefore just the two static .md imports
 * (en + zh) plus a single <CommunityProjectPage> element.
 *
 * Why static imports, not a runtime fetch: the markdown partials must be
 * statically imported so the mdx-loader compiles them into the build. A
 * runtime `import(\`@site${path}\`)` produces no context module in production
 * and the page fails with "Cannot find module". See the project memory
 * `markdown-learn-static-import`.
 *
 * Props:
 *   id      manifest id of the project (matches the /learn/<id> route)
 *   bodyEn  statically-imported en MDX module
 *   bodyZh  statically-imported zh MDX module (omit if no zh body → falls back to en)
 * ========================================================================= */

export default function CommunityProjectPage({ id, bodyEn, bodyZh }) {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale === 'zh' ? 'zh' : 'en';

  const list = tutorials[locale] || tutorials.en;
  const entry = list.find((it) => it.id === id) || tutorials.en.find((it) => it.id === id);

  if (!entry) {
    throw new Error(
      `CommunityProjectPage: no manifest entry found for id '${id}'. Add one to both tutorials.en and tutorials.zh in src/data/tutorials.js.`
    );
  }

  const badge = locale === 'zh' ? '项目' : 'Project';
  const Body = locale === 'zh' && bodyZh ? bodyZh : bodyEn;

  return (
    <TutorialShell
      badge={badge}
      title={entry.title}
      subtitle={entry.description}
      meta={entry.meta || []}
      markdown
    >
      <Body />
    </TutorialShell>
  );
}
