import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from "@contentful/rich-text-types";
import Img from 'gatsby-image'

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const image = node.data.target.fields.file['en-US']
      const width = image.details.image.width
      return <Img width={image.details.image.width} fluid={{
        aspectRatio: width / image.details.image.height,
        src: image.url + '?w=630&q=80',
        srcSet: `
            ${image.url}?w=${width / 4}&&q=80 ${width / 4}w,
            ${image.url}?w=${width / 2}&&q=80 ${width / 2}w,
            ${image.url}?w=${width}&&q=80 ${width}w,
            ${image.url}?w=${width * 1.5}&&q=80 ${width * 1.5}w,
            ${image.url}?w=1000&&q=80 1000w,
        `,
        sizes: '(max-width: 630px) 100vw, 630px'
      }} />
    }
  },
}

export default (json) => documentToReactComponents(json, options)
