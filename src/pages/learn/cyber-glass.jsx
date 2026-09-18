import CommunityProjectPage from '@site/src/components/CommunityProjectPage';
import bodyEn from '@site/docs/tutorials/cyber-glass.md';
import bodyZh from '@site/docs/tutorials/zh/cyber-glass.md';
import bodyKo from '@site/i18n/ko/docusaurus-plugin-content-docs/current/tutorials/cyber-glass.md';

export default () => (
  <CommunityProjectPage id="cyber-glass" bodyEn={bodyEn} bodyZh={bodyZh} bodyKo={bodyKo} />
);
