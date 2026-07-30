import React from 'react'

/**
 * Embeds a Discourse topic list into the page.
 *
 * @param {Object} props
 * @param {string} [props.discourseUrl='https://forum-tuyaopen.discourse.group'] - Discourse forum URL.
 * @param {string} [props.category] - Discourse category ID to filter topics.
 * @param {string} [props.tags] - Comma-separated tag names to filter topics.
 * @param {number} [props.perPage=5] - Number of topics to show per page.
 * @param {string} [props.class] - Optional CSS class for the wrapper element.
 */
export default function DiscourseTopicsList({
  discourseUrl = 'https://forum-tuyaopen.discourse.group',
  category,
  tags,
  perPage = 5,
  className,
  ...rest
}) {
  return (
    <d-topics-list
      discourse-url={discourseUrl}
      per-page={String(perPage)}
      {...(category ? { category } : {})}
      {...(tags ? { tags } : {})}
      {...(className ? { class: className } : {})}
      {...rest}
    />
  )
}
