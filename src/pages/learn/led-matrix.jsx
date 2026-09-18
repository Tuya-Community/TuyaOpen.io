import CommunityProjectPage from '@site/src/components/CommunityProjectPage';
import bodyEn from '@site/docs/tutorials/led-matrix.md';
import bodyZh from '@site/docs/tutorials/zh/led-matrix.md';
import bodyKo from '@site/i18n/ko/docusaurus-plugin-content-docs/current/tutorials/led-matrix.md';

export default () => (
  <CommunityProjectPage id="led-matrix" bodyEn={bodyEn} bodyZh={bodyZh} bodyKo={bodyKo} />
);
