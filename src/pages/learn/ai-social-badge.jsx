import CommunityProjectPage from '@site/src/components/CommunityProjectPage';
import bodyEn from '@site/docs/tutorials/ai-social-badge.md';
import bodyZh from '@site/docs/tutorials/zh/ai-social-badge.md';
import bodyKo from '@site/i18n/ko/docusaurus-plugin-content-docs/current/tutorials/ai-social-badge.md';

export default () => (
  <CommunityProjectPage id="ai-social-badge" bodyEn={bodyEn} bodyZh={bodyZh} bodyKo={bodyKo} />
);
