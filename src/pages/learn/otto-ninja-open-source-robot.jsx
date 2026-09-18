import CommunityProjectPage from '@site/src/components/CommunityProjectPage';
import bodyEn from '@site/docs/tutorials/otto-ninja-open-source-robot.md';
import bodyZh from '@site/docs/tutorials/zh/otto-ninja-open-source-robot.md';
import bodyKo from '@site/i18n/ko/docusaurus-plugin-content-docs/current/tutorials/otto-ninja-open-source-robot.md';

export default () => (
  <CommunityProjectPage id="otto-ninja-open-source-robot" bodyEn={bodyEn} bodyZh={bodyZh} bodyKo={bodyKo} />
);
