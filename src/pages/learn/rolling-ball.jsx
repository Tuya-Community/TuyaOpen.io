import CommunityProjectPage from '@site/src/components/CommunityProjectPage';
import bodyEn from '@site/docs/tutorials/rolling-ball.md';
import bodyZh from '@site/docs/tutorials/zh/rolling-ball.md';
import bodyKo from '@site/i18n/ko/docusaurus-plugin-content-docs/current/tutorials/rolling-ball.md';

export default () => (
  <CommunityProjectPage id="rolling-ball" bodyEn={bodyEn} bodyZh={bodyZh} bodyKo={bodyKo} />
);
