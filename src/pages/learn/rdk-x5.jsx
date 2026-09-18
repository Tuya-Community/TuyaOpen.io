import CommunityProjectPage from '@site/src/components/CommunityProjectPage';
import bodyEn from '@site/docs/tutorials/rdk-x5.md';
import bodyZh from '@site/docs/tutorials/zh/rdk-x5.md';
import bodyKo from '@site/i18n/ko/docusaurus-plugin-content-docs/current/tutorials/rdk-x5.md';

export default () => (
  <CommunityProjectPage id="rdk-x5" bodyEn={bodyEn} bodyZh={bodyZh} bodyKo={bodyKo} />
);
