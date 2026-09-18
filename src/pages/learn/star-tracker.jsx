import CommunityProjectPage from '@site/src/components/CommunityProjectPage';
import bodyEn from '@site/docs/tutorials/star-tracker.md';
import bodyZh from '@site/docs/tutorials/zh/star-tracker.md';
import bodyKo from '@site/i18n/ko/docusaurus-plugin-content-docs/current/tutorials/star-tracker.md';

export default () => (
  <CommunityProjectPage id="star-tracker" bodyEn={bodyEn} bodyZh={bodyZh} bodyKo={bodyKo} />
);
